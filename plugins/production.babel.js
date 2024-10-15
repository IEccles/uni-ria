// This babel plugin is used to remove development code from the final build, 
// this is done by checking all if statements and removing the block if the 
// condition is NODE_ENV === 'development' it also checks if there is an
// alternate block (else block) if so it removes the if statment and replaces
// it with the alternate block.
//
// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md

let shownAlert = false;

module.exports = function () {
    return {
        name: "transform-remove-development-code",
        visitor: {
            IfStatement(path) {

                if (!shownAlert) {
                    console.log(`!!!!!!!!! BUILDNG IN ${process.env.NODE_ENV.toUpperCase()} NODE !!!!!!!!!`)
                    shownAlert = true;
                }

                const left = path.node.test.left;
                const right = path.node.test.right;
                const operator = path.node.test.operator;

                if (process.env.NODE_ENV === 'production') {
                    if (left !== undefined && right !== undefined && operator !== undefined) {
                        if (Object.keys(left).includes('property')) {
                            if (left.property.name === 'NODE_ENV' && operator === '===' && right.value === 'development') {
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
    
                        if (Object.keys(right).includes('property')) {
                            if (right.property.name === 'NODE_ENV' && operator === '===' && left.value === 'development') {
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
                }
            },
        },
    };
};