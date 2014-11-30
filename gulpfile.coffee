gulp = require 'gulp'
rename = require 'gulp-rename'
header = require 'gulp-header'
uglify = require 'gulp-uglify'
typescript = require 'gulp-tsc'
webpack = require 'gulp-webpack'

pkg = require './package.json'

banner = '''
/*!
 * typescript-after-extends
 * (C) 2014 Pine Mizune / MIT License
 */
'''

gulp.task 'build', ->
    gulp.src 'index.js'
        .pipe webpack
            output:
                library: 'TypeScriptAfterExtends'
                libraryTarget: 'umd'
                filename: pkg.name + '.js'
        .pipe header(banner)
        .pipe gulp.dest('dist/')
        
        .pipe uglify()
        .pipe header(banner)
        .pipe rename( suffix: '.min' )
        .pipe gulp.dest('dist/')

gulp.task 'build-tests', ->
    gulp.src 'test/**/*.ts'
        .pipe typescript
            target: 'ES5'
            module: 'commonjs'
            noImplicitAny: true
        .pipe gulp.dest('test/')

gulp.task 'default', ['build']