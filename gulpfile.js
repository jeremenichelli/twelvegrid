var gulp = require('gulp'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat-util'),
    autoprefixer = require('gulp-autoprefixer'),
    package = require('./package.json'),
    header = '/* ' + package.title + ' - ' + package.author + ' */\n' +
            '/* ' + package.repository.url + ' - MIT License */\n\n',
    paths = {
        src: 'src/*.less',
        dist: 'dist/*.css',
        output: 'dist/'
    };

gulp.task('less', function () {
    return gulp.src(paths.src)
        .pipe(less())
        .pipe(autoprefixer(['> 0%']))
        .pipe(concat.header(header))
        .pipe(gulp.dest(paths.output))
});

gulp.task('minify', [ 'less' ], function () {
    return gulp.src(paths.dist)
        .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.output))
});