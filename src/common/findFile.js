/**
 * Created by jmeo on 2016/11/7.
 */
var path = require("path"),fs = require('fs');

function findFile(p,fileName){
    var searchFiles = [];
    var fn = new RegExp('^'+fileName+'$');
    if(fs.statSync(p).isDirectory()){
        var pathContainer = fs.readdirSync(p);
        for(var k in pathContainer){
            var p2 = path.join(p,pathContainer[k]);
            searchFiles = searchFiles.concat(findFile(p2,fileName));
        }
    }else if(fs.statSync(p).isFile() && fn.test(path.basename(p))){
        searchFiles.push(p);
    }
    return searchFiles;
}

module.exports = findFile;