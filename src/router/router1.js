/**
 * Created by jmeo on 16/9/6.
 */
var router = require('koa-router')();

router.get('/',function*(next){
    this.body = {body :'this is the root path'};
});

router.get('/test', function* (next) {
    this.body = {'message':'hello first message'};
});


router.post('/testPost', function *(next) {
    this.body = "test post request";
});


router.get('/error1', function* () {
    this.body = {errorCode:'sys.001',errorMessage:'system error'};
});


router.get('/error2', function* () {
    this.body = {errorCode:'sys.002',errorMessage:'system error'};
});

router.get('/error3', function *(next) {
    this.body = {errorCode:'sys.0011',errorMessage:'error3 sys.0011'};
});


module.exports = router;