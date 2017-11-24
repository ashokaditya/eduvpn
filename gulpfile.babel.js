'use strict'

import gulp from 'gulp'
import plumber from 'gulp-plumber'
import pug from 'gulp-pug'
import sw from './app/semantic/tasks/watch'
import sb from './app/semantic/tasks/build'
import less from 'gulp-less'
import lap from 'less-plugin-autoprefix'
import useref from 'gulp-useref'
import uglify from 'gulp-uglify'
import gulpIf from 'gulp-if'
import browserSync from 'browser-sync'

const autoprefix = new lap({browsers: ['> 1%', 'last 1 version']})

gulp.task('sw', sw)
gulp.task('sb', sb)

gulp.task('pug', () => {
  return gulp.src('app/views/index.pug')
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

gulp.task('useref', () => {
  return gulp.src('app/js/**/*.js')
    .pipe(plumber())
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('serve', ['pug', 'useref', 'less'], function () {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
  gulp.watch('app/views/**/*.pug', ['pug'])
  gulp.watch('app/less/**/*.less', ['less'])
})

// gulp.task('watch', ['serve', 'semwatch', 'less'], function () {
//   gulp.watch('app/less/**/*.less', ['less'])
//   gulp.watch('app/*.html', browserSync.reload)
//   gulp.watch('app/js/**/*.js', browserSync.reload)
// })
