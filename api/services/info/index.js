'use strict';

var path = require('path');

module.exports = {
    package: readPackage
};

function readPackage() {
    var packagePath = path.resolve(__dirname, '../../../', 'package.json');
    console.log(require(packagePath));
    return require(packagePath);
}
