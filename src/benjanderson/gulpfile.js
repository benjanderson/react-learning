"use strict";

var gulp = require("gulp");
var rimraf = require("rimraf");
var concat = require("gulp-concat");
var cssmin = require("gulp-cssmin");
var uglify = require("gulp-uglify");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var babelify = require("babelify");
var gulpIf = require("gulp-if");
var sourcemaps = require('gulp-sourcemaps');
var less = require("gulp-less");

var config = {
	release: process.env.NODE_ENV && process.env.NODE_ENV === 'Release',
	webroot: "./wwwroot/",
	jsDeploy: "./wwwroot/js/",
	cssDeploy: "./wwwroot/css/",
	js: "./Scripts/**/*.js",
	jsRoot: "./Scripts/app.js",
	lessRoot: "./Styles/site.less"
};

function swallowError(error) {
	console.log(error.toString());
	this.emit('end');
}

gulp.task("css", function () {
	return gulp.src(config.lessRoot)
		.pipe(gulpIf(!config.release, sourcemaps.init()))
		.pipe(less())
		.pipe(gulpIf(!config.release, sourcemaps.write()))
		.on('error', swallowError)
		.pipe(cssmin())
		.pipe(gulp.dest(config.cssDeploy));
});

gulp.task("js", function () {
	browserify(config.jsRoot).transform(babelify.configure({
		presets: ["es2015", "react"]
	}))
	.bundle()
	.on("error", function (err) { console.log("Error : " + err.message); })
	.pipe(source('site.js'))
	.pipe(gulp.dest(config.jsDeploy));	
});



gulp.task("default", ["css", "js"], function() {
	if (!config.release) {
		gulp.watch(config.js, ["js"]);
		gulp.watch(config.lessRoot, ["css"]);
	}
});
