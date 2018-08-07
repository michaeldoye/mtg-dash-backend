var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var tslint = require("gulp-tslint");
var bump = require('gulp-bump');
var concat = require('gulp-concat');
var browserify = require('browserify');

/**
 * Main compile task
 */
gulp.task('compile', ['bump'], function() {

  // All typescript files
  var tsResult = gulp.src(["src/*.ts"])
    // Init sourcemaps
    .pipe(sourcemaps.init())

    // Start tslint
    .pipe(tslint({
      configuration: "tslint.json"
    }))

    // Report linting errors/warnings
    .pipe(tslint.report({
      allowWarnings: true
    }))
    .on('end', function() {
      console.log('Linting Done!');
    })

    // Typescript compile
    .pipe(ts({
      lib: [
        "es6",
        "dom",
        "esnext"
      ]
    }))
    .on('end', function() {
      console.log('Typescript compilation done!');
    });

  // Return all files
  return tsResult

    // Run uglify
    .pipe(uglify()) 
    .on('end', function() {
      console.log('Uglify done!');
    })

    // Wirte sourcemaps to the files
    .pipe(sourcemaps.write())

    // Output to destination folder
    .pipe(gulp.dest('lib/'))
    .on('end', function() {
      console.log('Build Completed!');
    });
});

gulp.task('bump', function() {
  gulp.src('../package.json')
  .pipe(bump())
  .pipe(gulp.dest('../'));
});

gulp.task('watch', function () {
  // watch for TS changes
  gulp.watch(['src/*.ts', 'gulpfile.js'], ['compile']);
})
