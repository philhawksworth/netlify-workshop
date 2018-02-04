var runSequence = require('run-sequence');
var gulp        = require("gulp");
var sass        = require("gulp-sass");
var clean       = require('gulp-clean');
var nunjucks    = require('gulp-nunjucks')
var serve       = require('gulp-serve');
var request     = require("request");
var data        = require("gulp-data");
var fs            = require('fs');

// load environment variables
var config = require('dotenv').config()

// what goes where?
var buildSrc = "src";
var buildDest = "dist";

// local webserver for development
gulp.task('serve', serve({
  root: [buildDest],
  port: 8008,
}));

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
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync(buildSrc + '/entries.json'));
    }))
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(buildDest))
});


// simplest possible noddy js management
gulp.task("js", function () {
  gulp.src(buildSrc + "/js/**/*.js")
    .pipe(gulp.dest(buildDest + '/js'))
});


// get a list of entries submitted to the form
gulp.task("get:entries", function () {

  var oauth_token = process.env.form_api_access_token || config.form_api_access_token;
  var form_id = process.env.form_id_raffle_smashing_london_2018 || config.form_id_raffle_smashing_london_2018;
  var url = "https://api.netlify.com/api/v1/forms/" + form_id + "/submissions?access_token=" + oauth_token;

  request(url, function(err, response, body){

    // format the response to be a bit more concise and stash it for the build
    if(!err && response.statusCode === 200){
      var results = [];
      var formsData = JSON.parse(body);
      for(var item in formsData) {
        results.push({
          "twitterHandle": formsData[item].data.twitter.replace("@","")
        });
      }
      var data = {
        "items" : results
      };
      fs.writeFile(buildSrc + '/entries.json', JSON.stringify(data), function(err) {
        if(err) {
          return console.log(err);
        } else {
          return console.log("Tweets data saved.");
        }
      });
    } else {
      return console.log(err);
    }
  })

});



// Watch working folders for changes
gulp.task("watch", ["build"], function () {
  gulp.watch(buildSrc + "/scss/**/*", ["scss"]);
  gulp.watch(buildSrc + "/js/**/*", ["js"]);
  gulp.watch(buildSrc + "/pages/**/*", ["render"]);
  gulp.watch(buildSrc + "/entries.json", ["render"]);
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

