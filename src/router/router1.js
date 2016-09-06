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


module.exports = router;