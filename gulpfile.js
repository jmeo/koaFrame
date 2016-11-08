/**
 * Created by jmeo on 2016/11/8.
 */
var gulp = require('gulp');
var del = require('del');
var copy = require('copy');
var less = require('gulp-less');
var path = require('path');

gulp.task('default', function (cb) {
    console.log('this is default task for try gulp task!');
});

//清理build 构建文件
gulp.task('clean', function (cb) {
    del([
        './build/*' //需要删除的文件目录
    ],cb);
});

//less 生成 css 任务
gulp.task('less', function (cb) {
    del(['./src/public/css/*']);
    return gulp.src('./src/public/less/**/*.less')
            .pipe(less({
                paths : [path.join(__dirname,'src','public','less')]
                }
            ))
            .pipe(gulp.dest('./src/public/css'));
});

//复制任务
gulp.task('copy', function (cb) {
    //copy src files to build directory
    copy(['./src/**','./gulpfile.js','./LICENSE','./package.json','README.md','./server.js','./start.sh'],'./build/src', function () {
        cb();
    });
});


