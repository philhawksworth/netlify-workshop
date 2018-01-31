var runSequence = require('run-sequence');
var gulp        = require("gulp");
var sass        = require("gulp-sass");
var clean       = require('gulp-clean');
var nunjucks    = require('gulp-nunjucks')

// what goes where?
var buildSrc = "src";
var buildDest = "dist";


// cleanup the build output
gulp.task('clean-build', function () {
  return gulp.src(buildDest, {read: false})
    .pipe(clean());
});
// Delete our old css files
gulp.task('clean-css', function () {
  return gulp.src(buildDest + "/css/**/*", {read: false})
    .pipe(clean());
});
gulp.task('clean-js', function () {
  return gulp.src(buildDest + "/js/**/*", {read: false})
    .pipe(clean());
});


// Compile SCSS files to CSS
gulp.task("scss", ['clean-css'], function () {
  gulp.src(buildSrc + "/scss/main.scss")
    .pipe(sass({
      outputStyle: "compressed"
    })
    .on('error', sass.logError))
    .pipe(gulp.dest(buildDest + "/css"))
});


// Compile the templates into html
gulp.task("render", function () {
  gulp.src([buildSrc + '/pages/**/[!_]*.html'])
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(buildDest))
});


// simplest possible noddy js management
gulp.task("js", function () {
  gulp.src(buildSrc + "/js/**/*.js")
    .pipe(gulp.dest(buildDest + '/js'))
});


// Watch working folders for changes
gulp.task("watch", ["build"], function () {
  gulp.watch(buildSrc + "/scss/**/*", ["scss"]);
  gulp.watch(buildSrc + "/js/**/*", ["js"]);
  gulp.watch(buildSrc + "/pages/**/*", ["render"]);
});


// build the site
gulp.task("build", function(callback) {
  runSequence(
    "clean-build",
    "render",
    "scss",
    "js",
    callback
  );
});

