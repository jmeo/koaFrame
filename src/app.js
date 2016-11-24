/**
 * Created by jmeo on 16/9/6.
 */
var path = require('path'),koa = require('koa'),app = new koa();
var router = require('koa-router')();
var koaStatic = require('koa-static2');
var fs = require('fs');
var favicon = require('koa-favicon');
//plugins
var bodyParser = require('koa-bodyparser');
var logger = require('./common/logger')();
var Pug = require('koa-pug');

var routerScan = require('./common/routerScan');
var config = require('./config');
var errorCode = require('./errorCode');

//add plugins
app.use(bodyParser({
    onerror: function (err, ctx) {
        ctx.throw('body parse error', 422);
    }

}));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(koaStatic(path.join(__dirname,'public')));

//session plugin


// pug(jade)模板插件的引入
var pug = new Pug({
    viewPath: path.join(__dirname,'views'),
    debug:false,
    noCache:true
});
pug.use(app);

//add Interceptor 拦截器
//Interceptor 1 异常拦截
app.use((ctx,next)=>{
    logger.info(ctx.url);
    return next()
        .catch((e)=>{
            var errorMsg = e.message;
            logger.error(errorMsg);
            try{
                ctx.body = eval("("+errorMsg+")");
            }catch (e){
                throw errorMsg;
            }
        })
        .catch((e)=>{
            ctx.body = {errorCode:'nsystem.001',errorMessage:"errorCode analysis error",oldMessage:e.message};
        })
        .then(()=>{
            logger.info(ctx.body);
            //errorMessage replace
            if(ctx.body && ctx.body.errorCode){
                var code = ctx.body.errorCode;
                var errorMessage = errorCode[code];
                if(errorMessage){
                    if(typeof errorMessage == 'string'){
                        ctx.body.errorMessage = errorMessage;
                    }else if(typeof errorMessage == 'object'){
                        if(errorMessage.zn){
                            ctx.body.errorMessage = errorMessage.zn;
                        }else if(errorMessage.en){
                            ctx.body.errorMessage = errorMessage.en;
                        }
                    }
                }
            }
    });

});

//Interceptor 2 登录相关拦截
app.use((ctx,next)=>{
    //if un login , return to the loginUrl
    var login = false;
    var tpath = !/system\/login/.test(ctx.path);
    if(login && tpath){
        ctx.redirect("/system/login.html");
    }else{
       return next();
    }
});


//add routers
//app.use(routerScan());
routerScan(app);

//end function 404
app.use(function (ctx,next) {
    logger.info(ctx.url);
    logger.error('the path not found : 404');
    ctx.redirect('/system/404.html');
});

module.exports = app;


