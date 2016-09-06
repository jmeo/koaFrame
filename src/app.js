/**
 * Created by jmeo on 16/9/6.
 */
var path = require('path'),app = require('koa')();
var koaStatic = require('koa-static');
//plugins
var bodyParser = require('koa-bodyparser');


//add plugins
app.use(bodyParser());
app.use(koaStatic(path.join(__dirname,'public')));


//add Interceptor 拦截器
//Interceptor 1 异常拦截
app.use(function*(next){
    try{
        yield next;
    }catch(e){
        console.log(e.message);
        //跳转页面或返回异常处理信息
        this.body = e.message;
    }
    console.log('END the interceptor 1');
});

//Interceptor 2 登录相关拦截
app.use(function* (next) {

    yield next;
    console.log('END the interceptor 2');
});


//add routers
app.use(require('./router/router1').routes());


//end function 404
app.use(function *(next) {
    console.log('the path not found : 404');
    this.body = 'the path not found : 404';
    //throw new Error('hdhhdhdhdh');
});

module.exports = app;


