const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    imageMin = require('gulp-imagemin'),
    useref = require('gulp-useref'),
    replace = require('gulp-replace'),
    del = require('del'),
    runSeq = require('run-sequence'),
    browserSync = require('browser-sync').create();
    gConfig = require('./gulpConfig'),
    sources = gConfig.paths.sources,
    destinations = gConfig.paths.destinations;


/**************************************HTML*****************************/


const html = () => {
    return gulp.src(sources.html)
        .pipe(useref())
        .pipe(replace('images', 'content'))
        .pipe(gulp.dest(destinations.html));
};

gulp.task('htmlJS', ['concatJS'], html);

gulp.task('htmlSass', ['compileSass'], html);

gulp.task('html', () => {
    return gulp.src(sources.html)
        .pipe(useref())
        .pipe(replace('images', 'content'))
        .pipe(gulp.dest(destinations.html))
        .pipe(browserSync.reload({ stream: true }))
});

/**************************************IMAGES*****************************/


gulp.task('images',() => {
    gulp.src(sources.images)
        .pipe(imageMin())
        .pipe(gulp.dest(destinations.images));
});



/**************************************ICONS*****************************/


gulp.task('icons', () => {
    gulp.src(sources.icons)
        .pipe(gulp.dest(destinations.icons));
});


/**************************************JAVASCRIPT*****************************/



gulp.task('scripts', ['htmlJS'], () => {
    gulp.src(sources.scripts)
        .pipe(gulp.dest(destinations.scripts))
        .pipe(browserSync.reload({ stream: true }));
});


gulp.task('concatJS', () => {
    gulp.src(sources.js)
        .pipe(maps.init())
        .pipe(concat('global.js'))
        .pipe(uglify())
        .pipe(maps.write('./'))
        .pipe(gulp.dest(destinations.jsFolder));
});


/**************************************SASS & CSS*********************************/



gulp.task('styles', ['htmlSass'], () => {
    gulp.src(sources.styles)
        .pipe(gulp.dest(destinations.styles))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('compileSass', () => {
   return gulp.src(sources.sass)
        .pipe(maps.init())
        .pipe(sass({ outputStyle: 'compressed', outFile: 'global.css' }))
        .pipe(maps.write('./'))
        .pipe(gulp.dest(destinations.cssFolder));
});


/**************************************OTHER*********************************/


//remove the dist folder
gulp.task('clean', () => del(destinations.server));

gulp.task('build', ['clean'], (callback) => {
    runSeq(['images','icons','styles','scripts'], callback);
});

gulp.task('serve', [],() => {
    browserSync.init({ server: { baseDir: destinations.server } });
});

gulp.task('watch', ['serve'],() => {
    gulp.watch(sources.sass, ['styles']);
    gulp.watch(sources.js, ['scripts']);
    gulp.watch(sources.html, ['html']);
});

gulp.task('default', ['build','serve','watch']);
