// This babel plugin is used to remove disabled code from the final build, the disabled code is 
// in the "disabled" file in the root, if this file doesnt exist nothing is disabled.
//
// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md

const fs = require('fs');

module.exports = function () {


    // test if disabled file exists
    if (!fs.existsSync('./disabled')) {
        return {
            name: "transform-remove-disabled-code",
            visitor: {},
        };
    }

    // Read the disabled file
    const disabledFile = fs.readFileSync('./disabled', 'utf8');
    const disabledCode = disabledFile.split('\n');

    if (disabledCode.length === 0) {
        return {
            name: "transform-remove-disabled-code",
            visitor: {},
        };
    }

    console.log(`\x1b[41m\x1b[1mRemoving the following modules: \n\x1b[41m\x1b[1m\t\t\t\t\t\x1b[41m\x1b[1m${disabledCode.join(', \n\t\t\t\t\t\x1b[41m\x1b[1m')}`);
    console.log('\x1b[0m')

    return {
        name: "transform-remove-disabled-code",
        visitor: {
            IfStatement(path) {
                
                const left = path.node.test.left;
                const right = path.node.test.right;
                const operator = path.node.test.operator;

                if (left !== undefined && right !== undefined && operator !== undefined) {

                    if (left.value != undefined && left.value.includes('MODULE:') && 
                        right.value != undefined && right.value === left.value && 
                        operator === '===') {

                            if (disabledCode.includes(left.value.replace('MODULE:', ''))) {
                                if (path.node.alternate) {
                                    path.replaceWithMultiple(path.node.alternate.body);
                                } else {
                                    path.remove();
                                }
                            } else {
                                if (path.node.alternate) {
                                    path.replaceWithMultiple(path.node.consequent.body);
                                }
                            }
                    } 
                }

            },
        },
    };
};