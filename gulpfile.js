var gulp          = require("gulp");
var sass          = require("gulp-sass");
var clean         = require('gulp-clean');

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


// Compile SCSS files to CSS
gulp.task("scss", ['clean-css'], function () {

  //compile hashed css files
  gulp.src(buildSrc + "/scss/main.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }).on('error', sass.logError))
    .pipe(gulp.dest(buildDest + "/css"))

});


// Compile SCSS files to CSS
gulp.task("html", function () {
  gulp.src(buildSrc + "/**/*.html")
    .pipe(gulp.dest(buildDest))
});


// Watch asset folder for changes
gulp.task("watch", ["html", "scss"], function () {
  gulp.watch(buildSrc + "/scss/**/*", ["scss"])
  gulp.watch(buildSrc + "/**/*.html", ["html"])
});


// build things
gulp.task("build", ["clean-build", "html", "scss"]);

