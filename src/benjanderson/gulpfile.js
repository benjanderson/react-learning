"use strict";

const gulp = require("gulp");
const rimraf = require("rimraf");
const concat = require("gulp-concat");
const cssmin = require("gulp-cssmin");
const uglify = require("gulp-uglify");
const source = require("vinyl-source-stream");
const browserify = require("browserify");
//const babelify = require("babelify");
const gulpIf = require("gulp-if");
const sourcemaps = require('gulp-sourcemaps');
const less = require("gulp-less");
const tsify = require("tsify");
const tsConfig = require('./tsconfig.json');
const typings = require("typings");

var config = {
	release: process.env.NODE_ENV && process.env.NODE_ENV === 'Release',
	webroot: "./wwwroot/",
	jsDeploy: "./wwwroot/js/",
	cssDeploy: "./wwwroot/css/",
	js: ["./Scripts/**/*.js", "./Scripts/**/*.tsx"],
	jsRoot: "./Scripts/app.tsx",
	lessRoot: "./Styles/site.less",
	less: "./Styles/**/*.less"
};

function swallowError(error) {
	console.log(error.toString());
	this.emit('end');
}

gulp.task("css", function () {
	return gulp.src(config.lessRoot)
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write())
		.on('error', swallowError)
		.pipe(cssmin())
		.pipe(gulp.dest(config.cssDeploy));
});

gulp.task("js", function () {
	browserify(config.jsRoot)
  .add("./typings/main/ambient/react/index.d.ts")
  .add("./typings/main/ambient/react-dom/index.d.ts")
	.plugin(tsify)
	.bundle()
	.on("error", function (err) { console.log("Error : " + err.message); })
	.pipe(source('site.js'))
	.pipe(gulp.dest(config.jsDeploy));
});



gulp.task("default", ["css", "js"], function () {
	if (!config.release) {
		gulp.watch(config.js, ["js"]);
		gulp.watch(config.less, ["css"]);
	}
});
