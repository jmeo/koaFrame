/**
 * Created by jmeo on 16/9/6.
 */
var path = require('path'),app = require('koa')();
var koaStatic = require('koa-static');
var fs = require('fs');
//plugins
var bodyParser = require('koa-bodyparser');
var log4js = require('log4js'),logger = log4js.getLogger();

var config = require('./config');
var errorCode = require('./errorCode');

//add plugins
app.use(bodyParser());
app.use(koaStatic(path.join(__dirname,'public')));

//add Interceptor 拦截器
//Interceptor 1 异常拦截
app.use(function*(next){
    logger.info(this);
    try{
        yield next;
    }catch(e){
        logger.error(e.message);
        //跳转页面或返回异常处理信息
        this.body = e.message;
    }
    logger.info(this.body);
    //errorMessage replace
    if(this.body.errorCode){
        var code = this.body.errorCode;
        var errorMessage = errorCode[code];
        if(errorMessage){
            if(typeof errorMessage == 'string'){
                this.body.errorMessage = errorMessage;
            }else if(typeof errorMessage == 'object'){
                if(errorMessage.zn){
                    this.body.errorMessage = errorMessage.zn;
                }else if(errorMessage.en){
                    this.body.errorMessage = errorMessage.en;
                }
            }
        }
    }
});

//Interceptor 2 登录相关拦截
app.use(function* (next) {
    //if un login , return to the loginUrl
    var login = false;
    var tpath = !/system\/login/.test(this.path);
    if(login && tpath){
        this.redirect("/system/login.html");
    }else{
        yield next;
    }
});


//add routers
app.use(require('./router/router1').routes());


//end function 404
app.use(function *(next) {
    logger.error('the path not found : 404');
    this.redirect('/system/404.html');
});

module.exports = app;


