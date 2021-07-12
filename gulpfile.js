var gulp  = require('gulp');
var sass  = require('gulp-sass')(require('sass'));
var autoprefixer  = require('gulp-autoprefixer');
var rename  = require('gulp-rename');
var uglify  = require('gulp-uglify');
var watch  = require('gulp-watch');

function compilingScss(cb) {
  return gulp.src('src/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
          browsers:['last 2 versions'],
          cascade:false
        }))
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/css'));
  cb();
}

exports.compilingScss = compilingScss;

function compilingJS(cb) {
  return gulp.src('src/js/**/*.js')
  .pipe(uglify())
  .pipe(rename({suffix:'.min'}))
  .pipe(gulp.dest('dist/js'))
  cb();
}

exports.compilingJS = compilingJS;

function watcher(cb){
  gulp.watch(['src/scss/**/*.scss'],compilingScss);
  gulp.watch(['src/js/**/*.js'],compilingJS);
  cb();
}

exports.default = watcher;
