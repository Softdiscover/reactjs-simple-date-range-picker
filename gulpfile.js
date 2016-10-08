var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var filter = require('gulp-filter');
var newer = require('gulp-newer');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var onError = function (err) {
    notify.onError({
        title: "Error",
        message: "<%= error %>",
    })(err);
    this.emit('end');
};

var plumberOptions = {
    errorHandler: onError,
};

var jsFiles = {
    vendor: [
    ],
    source: [
        'assets/js/src/utility.js',
        'assets/js/src/components/calendar.jsx',
        'assets/js/src/components/datepicker.jsx',
        'assets/js/src/components/global.jsx'
    ]
};

gulp.task('eslint', function () {
    return gulp.src(jsFiles.source)
            .pipe(eslint({
                baseConfig: {
                    "ecmaFeatures": {
                        "jsx": true
                    }
                }
            }))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
});


gulp.task('copy-react', function () {
    return gulp.src('node_modules/react/dist/react.js')
            .pipe(newer('assets/js/src/vendor/react.js'))
            .pipe(gulp.dest('assets/js/src/vendor'));
});
gulp.task('copy-react-dom', function () {
    return gulp.src('node_modules/react-dom/dist/react-dom.js')
            .pipe(newer('assets/js/src/vendor/react-dom.js'))
            .pipe(gulp.dest('assets/js/src/vendor'));
});

gulp.task('copy-js-vendor', function () {
    return gulp
            .src([
                'assets/js/src/vendor/react.js',
                'assets/js/src/vendor/react-dom.js'
            ])
            .pipe(concat('vendor.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('assets/js'));
});

gulp.task('concat', ['copy-react', 'copy-react-dom', 'eslint'], function () {
    return gulp.src(jsFiles.vendor.concat(jsFiles.source))
            .pipe(sourcemaps.init())
            .pipe(babel({
                only: [
                    'assets/js/src/components',
                ],
                compact: false
            }))
            .pipe(concat('app.js'))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('assets/js'));
});

gulp.task('sass', function () {
    var autoprefixerOptions = {
        browsers: ['last 2 versions'],
    };

    var filterOptions = '**/*.css';

    var reloadOptions = {
        stream: true,
    };

    var sassOptions = {
        includePaths: [
        ]
    };

    return gulp.src('assets/sass/*.scss')
            .pipe(plumber(plumberOptions))
            .pipe(sourcemaps.init())
            .pipe(sass(sassOptions))
            .pipe(autoprefixer(autoprefixerOptions))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('assets/css'))
            .pipe(filter(filterOptions))
            .pipe(reload(reloadOptions));
});

gulp.task('watch', function () {
    gulp.watch('assets/js/src/**/*.{js,jsx}', ['concat']);
    gulp.watch('assets/sass/**/*.scss', ['sass']);
});

gulp.task('browsersync', function () {
    browserSync({
        server: {
            baseDir: './'
        },
        open: false,
        online: false,
        notify: false,
    });
});

gulp.task('build', ['sass', 'copy-js-vendor', 'concat']);
gulp.task('default', ['build', 'browsersync', 'watch']);