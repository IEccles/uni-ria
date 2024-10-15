(async () => {
    const fs = require('fs');
    const packageJs = require('../package.json')
    const path = require('path');
    const minifier = require('html-minifier-terser')

    if (!fs.existsSync('dist')) {
        console.log('No dist file was found, try "npm run build:<win|linux>" first.')
    }

    // Create package.json

    const newPackageJs = {
        dependencies: packageJs.dependencies,
        engines: packageJs.engines,

        scripts: {
            start: "node index.js",
            migrate: "npx sequelize-cli db:migrate",
            seed: "npx sequelize-cli db:seed:all"
        }
    }

    fs.writeFile('dist/package.json', JSON.stringify(newPackageJs), (err) => {
        if (err) throw err;
    });

    // Copy over .sequelizerc

    fs.readFile('.sequelizerc', 'utf8', (err, data) => {
        if (err) throw err;
    
        const result = data.replace("path.resolve('src', 'models')", "path.resolve('models')");
    
        fs.writeFile('dist/.sequelizerc', result, 'utf8', (err) => {
           if (err) throw err;
        });
    });

    // Copy over .env

    fs.copyFile('.env.example', 'dist/.env', (err) => {
        if (err) throw err;
    });

    // Copy over sequelize config

    fs.mkdir('dist/config', { recursive: true }, (err) => {
        if (err) throw err;

        fs.copyFile('config/config.js', 'dist/config/config.js', (err) => {
            if (err) throw err;
        });
    });

    // Copy over sequelize migrations

    fs.mkdir('dist/migrations', { recursive: true }, (err) => {
        if (err) throw err;

        const files = fs.readdirSync('migrations');

        for (const file of files) {
            fs.copyFile('migrations/' + file, 'dist/migrations/' + file, (err) => {
                if (err) throw err;
            });
        }
    });

    // Copy over sequelize seeders

    fs.mkdir('dist/seeders', { recursive: true }, (err) => {
        if (err) throw err;

        const files = fs.readdirSync('seeders');

        for (const file of files) {
            fs.copyFile('seeders/' + file, 'dist/seeders/' + file, (err) => {
                if (err) throw err;
            });
        }
    });

    // Minify handlebars using html-minify and --ignore-custom-fragments "/{{[{]?(.*?)[}]?}}/"
    async function processFiles(dir) {
        const files = fs.readdirSync(dir);
    
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            // remove all development files
            if (process.env.NODE_ENV === 'production') {
                if (file.includes('.development')) {
                    fs.unlink('dist/' + file, (err) => {
                        if (err) throw err;
                    });
                }
            }
        
            if (stat.isDirectory()) {
                await processFiles(filePath); // Recursively process files in subdirectory
            } else if (path.extname(filePath) === '.hbs') {
                /* await fs.readFile(filePath, 'utf8', async (err, data) => {
                    if (err) throw console.log('error');

                    const result = await minifier.minify(data, {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeEmptyAttributes: true,
                        minifyJS: false,
                        minifyCSS: true,
                        minifyURLs: true,
                        useShortDoctype: true,
                        preventAttributesEscaping: true,
                        html5: true,
                        decodeEntities: true,
                        ignoreCustomComments: [
                            /{{!--/, /--}}/
                        ],
                        ignoreCustomFragments: [
                            /{{[{]?(.*?)[}]?}}/
                        ]
                    });
    
                    fs.writeFile(filePath, result, 'utf8', (err) => {
                        if (err) console.log('Error');
                    });
                }); */
            }
        }
    }

    await processFiles('dist/views')

    // Remove typescript specific files 

    fs.unlink('dist/types.js', (err) => {
        if (err) throw err;
    });

    console.log('Build complete, there are a couple manual steps that need to be taken.');
    console.log('\x1b[34m1\x1b[0m. configure the \x1b[34m.env\x1b[0m located in "\x1b[34mdist/.env\x1b[0m"')
    console.log('\x1b[34m2\x1b[0m. run database migration "\x1b[34m.npm run migration\x1b[0m" and seed "\x1b[34m.npm run seed\x1b[0m"')
    console.log('\x1b[34m3\x1b[0m. replace logos within "\x1b[34mdist/public/img\x1b[0m"')
    console.log('\x1b[34m4\x1b[0m. run a test using the development scripts.')

})()