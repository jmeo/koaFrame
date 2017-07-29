/**
 * Created by jmeo on 2017/3/24.
 */

var connect_opt = {
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'root',
    database : 'world'
};

var sql_1 = 'select * from city limit 30';

var mysql = require('./jMysql');

var jMysql = new mysql(connect_opt);

// jMysql.getPoolConnection(function (connection) {
//     connection.query(sql_1,function (err,results,fields) {
//         console.log(fields);
//         connection.release();
//
//         jMysql.destroy();
//     });
// });


jMysql.poolQuery(sql_1,function (err,result,fields) {
   // console.info(result);
    for(var i =0;i<result.length;i++){
        console.log(result[i]['ID']);
    }

    jMysql.destroy();
});