var gulp = require('gulp'),
    del = require('del'),
    merge = require('merge-stream'),

    tsc = require('gulp-typescript'),
    tsProject = tsc.createProject('tsconfig.json'),
    SystemBuilder = require('systemjs-builder'),
    jsMinify = require('gulp-uglify'),

    // mocha = require('gulp-mocha'),
    concat = require('gulp-concat'),
    // imagemin = require('gulp-imagemin'),

    cssPrefixer = require('gulp-autoprefixer'),
    cssMinify = require('gulp-cssnano');


gulp.task('clean', () => {
    return Promise.all([
        del('build')
    ]);
});


/**
 * build shim module
 */
gulp.task('shims', () => {
    return gulp.src([
            'node_modules/core-js/client/shim.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js'
        ])
        .pipe(concat('shims.js'))
        .pipe(gulp.dest('dist/js/'));
});


/**
 * compile ts scripts
 */
gulp.task('tsc', () => {
    del('build');

    return gulp.src('src/**/*.ts')
        .pipe(tsProject())
        .pipe(gulp.dest('build/'));
});

/**
 * build main app module
 browserify:  ./node_modules/browserify/bin/cmd.js ./build/app/main.js -o ./dist/js/main.js -d
 */
gulp.task('mainApp', [ 'tsc' ], () => {
    var builder = new SystemBuilder();

    return builder.loadConfig('system.config.js')
        .then(() => builder.buildStatic('app', 'dist/js/main.js', {
            production: false,
            sourceMaps: false,
            rollup: false
        }))
        .then(() => del('build'));
});



/**
 * move html files
 */
gulp.task('html', () => {
    return gulp.src('src/**/**.html')
        .pipe(gulp.dest('dist/'));
});

/**
 * Optimize images
 */
// gulp.task('images', () => {
//     return gulp.src('src/images/**/*.*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('dist/images/'));
// });

/**
 * Compile/Move css files
 */
gulp.task('css', () => {
    return gulp.src('src/**/*.css')
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist/css/'));
});

/**
 * Run tests
 */
// gulp.task('test-run', [ 'tsc' ], () => {
//     return gulp.src('test/**/*.spec.js')
//         .pipe(mocha());
// });
// gulp.task('test', [ 'test-run' ], () => {
//     return del('build');
// });


/**
 * Minify files
 */
gulp.task('minify', ['css', 'mainApp'], () => {
    var js = gulp.src('dist/js/main.js')
        .pipe(jsMinify())
        .pipe(gulp.dest('dist/js/'));

    var css = gulp.src('dist/css/styles.css')
        .pipe(cssMinify())
        .pipe(gulp.dest('dist/css/'));

    return merge(js, css);
});


/**
 * Compile and watch. this is a common dev environment
 */
gulp.task('watch', ['mainApp', 'css', 'html'], () => {
    var watchTs = gulp.watch('src/app/**/**.ts', [ 'mainApp' ]),
        watchScss = gulp.watch('src/**/*.css',   [ 'css' ]),
        watchHtml = gulp.watch('src/**/*.html',  [ 'html' ]),
        // watchImages = gulp.watch('src/images/**/*.*', [ 'images' ]),

        onChanged = function(event) {
            console.log('File ' + event.path + ' was ' + event.type + '. Running tasks...');
        };

    watchTs.on('change', onChanged);
    watchScss.on('change', onChanged);
    watchHtml.on('change', onChanged);
    // watchImages.on('change', onChanged);
});

/**
 * watch for tests
 */
// gulp.task('watchtests', () => {
//     var watchTs = gulp.watch('src/app/**/**.ts', [ 'test-run' ]),
//         watchTests = gulp.watch('test/**/*.spec.js', [ 'test-run' ]),

//     onChanged = function(event) {
//         console.log('File ' + event.path + ' was ' + event.type + '. Running tasks...');
//     };

//     watchTs.on('change', onChanged);
//     watchTests.on('change', onChanged);
// });


/**
 * Main action: build prod environment
 */
gulp.task('default', [
    'shims',
    'mainApp',
    'html',
    // 'images',
    'css',
    'minify'
]);




