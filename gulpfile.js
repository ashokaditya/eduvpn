// 'use strict'

const gulp = require('gulp')
const browserify = require('browserify')
const transform = require('vinyl-transform');
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
const sw = require('./app/semantic/tasks/watch')
const sb = require('./app/semantic/tasks/build')
const less = require('gulp-less')
const Lap = require('less-plugin-autoprefix')
const gulpIf = require('gulp-if')
const uglify = require('gulp-uglify')
const browserSync = require('browser-sync')

const autoprefix = new Lap({browsers: ['> 1%', 'last 1 version']})

gulp.task('sw', sw)
gulp.task('sb', sb)

gulp.task('pug', () => {
  return gulp.src([
    'app/views/*.pug',
    '!app/views/create-new.pug',
    '!app/views/doc.pug',
    '!app/views/config-card.pug'
  ])
  .pipe(plumber())
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('app'))
  .pipe(browserSync.reload({stream: true}))
})

gulp.task('less', () => {
  return gulp.src('app/less/**/*.less')
  .pipe(plumber())
  .pipe(less({
    plugins: [autoprefix]
  }))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true}))
})

gulp.task('babel', () => {
  return gulp.src('app/src/app.js')
  .pipe(plumber())
  .pipe(babel())
  .pipe(gulp.dest('app/js'))
  .pipe(browserSync.reload({stream: true}))
})

gulp.task('jsmin', () => {
  let browserified = transform( (filename) => {
   var b = browserify(filename)
   return b.bundle()
  })
  return gulp.src('app/js/**/*.js')
    .pipe(plumber())
    .pipe(browserified)
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
})

gulp.task('serve', ['pug', 'less', 'babel'], function () {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
  gulp.watch('app/views/**/*.pug', ['pug'])
  gulp.watch('app/less/**/*.less', ['less'])
  gulp.watch('app/src/**/*.js', ['babel'])
})

// gulp.task('watch', ['serve', 'semwatch', 'less'], function () {
//   gulp.watch('app/less/**/*.less', ['less'])
//   gulp.watch('app/*.html', browserSync.reload)
//   gulp.watch('app/js/**/*.js', browserSync.reload)
// })
