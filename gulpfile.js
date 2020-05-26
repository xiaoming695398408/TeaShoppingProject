const gulp = require("gulp");
const cssmin = require("gulp-cssmin");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const htmlmin = require("gulp-htmlmin");

const clean=require("gulp-clean");
const webserver=require("gulp-webserver");
const sass = require("gulp-sass-china");

// static的批量转存
function copyFileFn(){
	return gulp.src("./myTeaProject/static/**/*")
	       .pipe(gulp.dest("./server/static"))
}
exports.copyFile=copyFileFn;
// data的批量转存
function copyDataFn(){
	return gulp.src("./myTeaProject/data/**/*")
	       .pipe(gulp.dest("./server/data"))
}
exports.copyData=copyDataFn;
// 处理css的指令：压缩，添加兼容前缀
function cssFn(){
	return gulp.src("./myTeaProject/css/**/*")
	       .pipe(autoprefixer("last 2 version","safari 5","ie 8","ie 9","opera 12.1","ios 6","android 4"))
		   .pipe(cssmin())
		   .pipe(gulp.dest("./server/css"))
}
exports.css=cssFn;


// sass文件的处理
function sassFn(){
    return gulp.src("./myTeaProject/sass/**/*")
            .pipe(sass())
            // .pipe(autoprefixer("last 2 version","safari 5","ie 8","ie 9","opera 12.1","ios 6","android 4"))
            // .pipe(cssmin())
            .pipe(gulp.dest("./server/css"))
}
exports.sass = sassFn;

// 处理js的指令：ES6编译ES5，压缩
function jsFn(){
	return gulp.src("./myTeaProject/js/**/*")
	       .pipe(babel({
			   presets:["@babel/env"]
		   }))
		   .pipe(uglify())
		   .pipe(gulp.dest("./server/js"))
}
exports.js=jsFn;

// 处理html的指令：压缩
function htmlFn(){
	return gulp.src("./myTeaProject/pages/**/*")
	       .pipe(htmlmin({
			   removeEmptyAttributes:true,
			   collapseWhitespace:true
		   }))
		   .pipe(gulp.dest("./server/pages"))
}
module.exports.html=htmlFn;


// 删除文件：慎用
function cleanFn(){
	return gulp.src("./server")
	       .pipe(clean())
}
exports.clean=cleanFn;
// 首页的转存
function indexFn(){
	return gulp.src("./myTeaProject/index.html")
	       .pipe(gulp.dest("./server/"))
}
exports.index=indexFn;

//服务器的使用
function serverFn(){
	return gulp.src("./server")
	       .pipe(webserver({
			   host:"localhost",
			   port:"84",
			   livereload:true,
			   open:"./index.html",
			   proxise:[{
				   // source属性用来表示，代理之后的地址
				   // 在前端的ajax内，直接请求：http://localhost:3000/abc
				   source:"/qwe",
				   // target:"https://wanandroid.com/wxarticle/chapters/json"
			   }]
		   }))
}
exports.server=serverFn;
 // sass文件的处理:
 function sassFn(){
     return gulp.src("./myTeaProject/sass/**/*")
             .pipe(sass())
             .pipe(autoprefixer("last 2 version","safari 5","ie 8","ie 9","opera 12.1","ios 6","android 4"))
             .pipe(cssmin())
             .pipe(gulp.dest("./server/css"))
 }
 exports.sass = sassFn;
 
 // 监听sass文件的处理
 // function watchSassFn(){
	//  return gulp.watch("/ganjinmai/sass/**/*",sassFn);
 // }
 // exports.watchSass=watchSassFn;

// 暴露批量执行指令后，单独的还需要暴露么？
// 按需使用，万一将来只需要使用其中一个呢
exports.htmlJsCssStatic=gulp.parallel(htmlFn,jsFn,cssFn,copyFileFn,copyDataFn,indexFn);//异步执行
// 还没实现自动化构建项目
// 手动执行，编译和转存
// 手动打开

// 自动，只需要考虑代码，不需要随时考虑环境

// 监听所有文件，只要有文件发生改变了，执行对应功能
// function watchAllFn(){
// 	gulp.watch("./myTeaProject/index.html",indexFn);
// 	gulp.watch("./myTeaProject/css/**/*",cssFn);
// 	gulp.watch("./myTeaProject/js/**/*",jsFn);
// 	gulp.watch("./myTeaProject/page/**/*",htmlFn);
// 	gulp.watch("./myTeaProject/static/**/*",copyFileFn);
// 	gulp.watch("./myTeaProject/static/**/*",copyDataFn);
// 	gulp.watch("./myTeaProject/sass/**/*",sassFn);
// }
// exports.watchAll=watchAllFn;

// // 开了watch没法开server
// // 开了server没法开watch
// // 解决方案如下：
//  exports.all=gulp.series(
//      gulp.parallel(htmlFn,jsFn,cssFn,copyFileFn,copyDataFn,indexFn,sassFn),
// 	 gulp.parallel(watchAllFn,serverFn)
//  );//同步执行
 
 
