/**
 * Created by jmeo on 2016/11/7.
 */
var findFile = require("./findFile"),
    path = require("path");

/**
 * 路由配置
 * @returns {*}
 */
function routerScan(app){
    var files = findFile(path.join(__dirname,'../router'),'router.js');
    for(var k in files){
        app.use(require(files[k]).routes());
    }
}

module.exports = routerScan;