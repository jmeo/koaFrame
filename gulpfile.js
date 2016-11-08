/**
 * Created by jmeo on 2016/11/8.
 */
var gulp = require('gulp');
var del = require('del');
var copy = require('copy');
var less = require('less');
var path = require('path');
var fs = require('fs');
var runSequence = require('gulp-run-sequence');
var zip = require('gulp-zip');

var install = require('gulp-install');

//清理build 构建文件
gulp.task('clean', function (cb) {
    del([
        './build/*' //需要删除的文件目录
        ,'./src/public/css/style.css'  // less 编译后的css 样式
    ],cb());
});

//less 生成 css 任务
gulp.task('less', function (cb) {
    del(['./src/public/css/style.css']);
    var path = './src/public/less/common.less';
    var s = fs.readFileSync(path,{encoding:'utf-8'});
    less.render(s,{
        paths : ['./src/public/less'],
        filename:'style.css'
    },function (e,output) {
        fs.writeFileSync('./src/public/css/style.css',output.css,{encoding:'utf-8'});
        cb();
    });
});


//复制任务
gulp.task('copy', function (cb) {
    //copy src files to build directory
    copy(['./src/**','./gulpfile.js','./LICENSE','./package.json','README.md','./server.js','./start.sh','!./src/public/less/**/*'],
        './build/src',function (e) {
            cb();
        });
});

//自动安装npm --production
gulp.task('install_production',function (cb) {
   return gulp.src([path.join(__dirname,'package.json')])
        .pipe(gulp.dest(path.join(__dirname,'build')))
        .pipe(install({production:true}));
});

//压缩打包任务
gulp.task('zip',function(cb){
    return gulp.src('./build/**/*')
        .pipe(zip('programName.zip'))
        .pipe(gulp.dest('./build'));
});


//打包任务
gulp.task('package',function (cb) {
    runSequence('clean','less','copy','install_production','zip',cb);
});

