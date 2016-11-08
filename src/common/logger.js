/**
 * Created by jmeo on 2016/11/7.
 */

var log4js,logger;

/**
 * 日志工具 可以来log4j
 * @param opt
 */
function logger(opt){
    var looger;
    //judge opt  :  use log4j or not
    if(typeof opt === 'string'){
        var lopt = {
            appenders : [
                { type : 'file' , filename:opt}
            ]
        };
        logger = getLog4j(lopt);
    }else if(typeof opt === "boolean"){
        if(opt){
            looger = getLog4j();
        }else{
            looger = console;
        }
    }else if(typeof opt === 'object'){
        looger = getLog4j(opt);
    }else{
        looger = console;
    }

    return looger;
}

function getLog4j(opt){
    var log4js = require('log4js')
    if(opt){
        log4js.configure(opt);
    }
    return log4js.getLogger();
}


module.exports = logger;
