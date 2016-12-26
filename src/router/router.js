/**
  Created by jmeo on 16/9/6.
 **/
var router = require('koa-router')();
var parse = require('co-busboy');
var fs = require('fs');
var os = require('os');
var path = require('path');
var fs = require('fs');
var multer = require('koa-multer');
var storage=multer.memoryStorage();
var upload = multer({storage:storage});
var uploader = require('file-uploader');


router.get('/',function(ctx,next){
    ctx.body = {body :'this is the root path'};
});

router.get('/test', function (ctx,next) {
    ctx.body = {'message':'hello first message'};
});

router.get('/throwError', function (ctx,next) {
    throw new Error("errorCode:'sys.001',errorMessage:'system error'");
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

//表单提交接口
router.post('/uploadFile',upload.any(),function (ctx,next) {
    var req = ctx.req;
    var files = req.files;
    if( !files || files.length <= 0){
        throw new Error("没有接受到任务文件");
    }
    for(var k in files){
        var file = files[k];
        var pathStr = path.join(__dirname,'../..','uploads',file.originalname);
        fs.writeFileSync(pathStr,file.buffer);
    }

    var options = {
        host : 'localhost',
        port : 3000,
        path : '/fileUpload',
        method : 'POST',
        encoding : 'utf8'
    }

    new Promise(function (resolve,reject) {
        uploader.postFile(options, pathStr, {}, function(err, res) {
            resolve(res);
        })
    }).then(function (val) {
        console.log(val)
        ctx.body = val
    })
});


//文件上传接口
router.post('/fileUpload',upload.any(),function (ctx,next) {
    var req = ctx.req;
    var files = req.files;
    if( !files || files.length <= 0){
        throw new Error("没有接受到任务文件");
    }
    for(var k in files){
        var file = files[k];
        var pathStr = path.join(__dirname,'../..','uc',file.originalname);
        fs.writeFileSync(pathStr,file.buffer);
    }
    ctx.body = "file upload success"
});



module.exports = router;