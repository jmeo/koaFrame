/**
  Created by jmeo on 16/9/6.
 **/
var router = require('koa-router')();
var parse = require('co-busboy');
var fs = require('fs');
var os = require('os');
var path = require('path');
var multer = require('koa-multer');
var storage=multer.memoryStorage();
var upload = multer({storage:storage});


router.get('/',function(ctx,next){
    ctx.body = {body :'this is the root path'};
});

router.get('/test', function (ctx,next) {
    ctx.body = {'message':'hello first message'};
});


router.post('/testPost', function (ctx,next) {
    ctx.body = "test post request";
});


router.get('/error1', function (ctx,next) {
    ctx.body = {errorCode:'sys.001',errorMessage:'system error'};
});


router.get('/error2', function (ctx,next) {
    ctx.body = {errorCode:'sys.002',errorMessage:'system error'};
});

router.get('/error3', function (ctx,next) {
    ctx.body = {errorCode:'sys.0011',errorMessage:'error3 sys.0011'};
});

router.get('/pugtest', function (ctx,next) {
   ctx.render('test/test.pug',{title:'pugtest'});
    return;
});

router.get('/uploadpage', function (ctx,next) {
   ctx.render('test/upload');
});
//
// router.post('/uploadFile',upload.any(),function (ctx,next) {
//     console.log(ctx);
//     var files = ctx.files;
//     console.log(files.length);
//     ctx.body = "success";
// });



module.exports = router;