/**
 * Created by jmeo on 2017/3/24.
 */
'use strict';

const mysql = require('mysql');

function jMysql(opt) {
    if (opt) {
        for (var k in opt) {
            this.option[k] = opt[k];
        }
    }
}

jMysql.prototype.option = {
    host: 'localhost',
    port: 3306
};

jMysql.prototype.getConnection = function (opt) {
    if (opt) {
        for (var k in opt) {
            this.option[k] = opt[k];
        }
    }
    if (!this.connection) {
        this.connection = mysql.createConnection(this.option);
    }
    return this.connection;
};

jMysql.prototype.connect = function (opt, callback) {
    this.connection = this.getConnection();
    this.connection.connect(opt, callback);
};

jMysql.prototype.connectQuery = function (str, callback) {
    this.connection.query(str, function (err,results,fields) {
        if(err)
            throw err;
        callback(results,fields);
        this.connection.destroy();
    });
};

jMysql.prototype.end = function (opt, callback) {
    this.connection.end(opt, callback);
};

jMysql.prototype.getPool = function (opt) {
    if (opt) {
        for (var k in opt) {
            this.option[k] = opt[k];
        }
    }
    if (!this.pool) {
        this.pool = mysql.createPool(this.option);
    }
    return this.pool;
};

jMysql.prototype.getPoolConnection=function (callback) {
    this.pool = this.getPool();
    this.pool.getConnection(function (err,connection) {
        if(err)
            throw err;
        callback(connection);
    });
};


jMysql.prototype.poolQuery = function (sql,callback) {
    this.pool = this.getPool();
    this.pool.getConnection(function (err,connection) {
        if(err)
            throw err;
        connection.query(sql,function (err,result,fields) {
           callback(err,result,fields);
           connection.release();
        });
    });
};



jMysql.prototype.destroy = function () {
    if(this.connection){
        this.connection.end();
    }
    if(this.pool){
        this.pool.end();
    }
};


module.exports = jMysql;
