/**
 * Created by jmeo on 2016/11/7.
 */
'use strict';
var findFile = require("./findFile"),
    path = require("path");
const router = require('koa-router')();


/**
 * 路由配置
 * @returns {*}
 */
function routerScan(app){
    var files = findFile(path.join(__dirname,'../router'),'router.js');
    var stack = [];
    for(var k in files){
        let route = require(files[k]).routes();
        stack.push(route.router.stack)
        app.use(route);
    }
    // app.use('/links',function (ctx) {
    //     ctx.body = stack;
    // });

    router.get('/appServices',(ctx,next)=>{
        var tm_stack = stack[0];
        console.log(tm_stack);
        let list = [];
        for(var i=0;i<tm_stack.length;i++){
            let item_obj = { 'method':tm_stack[i]['methods'][0] == 'HEAD' ? tm_stack[i]['methods'][1] : tm_stack[i]['methods'][0],'path':tm_stack[i]['path']};
            list.push(item_obj);
        }
        ctx.body = list;
    });
    app.use(router.routes());
}

module.exports = routerScan;