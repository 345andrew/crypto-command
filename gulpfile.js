"use strict";

var
    eventStream = require("event-stream"),
    gulp = require("gulp"),
    sourcemaps = require("gulp-sourcemaps"),
    tscconfigDev = require("./tsconfig.json"),
    tslint = require('gulp-tslint'),
    typescript = require('gulp-typescript');

// Entry point into the gulp build tasks.
gulp.task("build-all", ['tslint', 'tsc']);

// linting
gulp.task('tslint', function() {
    return gulp.src('src/**/*.ts')
        .pipe(tslint({ formatter: "verbose" }))
        .pipe(tslint.report({ emitError: true }));
});

// Compile typescript sources
gulp.task('tsc', function() {
    var result = gulp
        .src(tscconfigDev.include)
        .pipe(typescript(tscconfigDev.compilerOptions));

        return eventStream.merge(
          result.dts.pipe(gulp.dest("lib")),
          result.js.pipe(gulp.dest("lib"))
        );
});
