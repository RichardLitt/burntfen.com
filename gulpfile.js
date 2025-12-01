/*
Copyright 2025 Richard Littauer

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const gulp = require('gulp')
const uglify = require('gulp-uglify')
const changed = require('gulp-changed')
const imagemin = require('gulp-imagemin')
const rename = require('gulp-rename')
const pngcrush = require('imagemin-pngcrush')
const imageResize = require('gulp-image-resize')

var paths = {
  js: ['src/js/**/*.js', '!src/js/**/*.min.js'],
  jsMin: ['src/js/**/*.min.js'],
  img: ['src/img/**/*.png', 'src/img/**/*.jpg'],
  imgDest: 'assets/img',
  projectImg: ['src/img/project/*.png', 'src/img/project/*.jpg'],
  pressImg: ['src/img/press/*.png', 'src/img/press/*.jpg'],
  clientImg: ['src/img/clients/*.png', 'src/img/clients/*.jpg']
}

gulp.task('js', function () {
  gulp.src(paths.js)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('assets/js'))
  gulp.src(paths.jsMin)
    .pipe(gulp.dest('assets/js'))
})

gulp.task('project-img', function () {
  return gulp.src(paths.projectImg)
    .pipe(changed('assets/img/project'))
    .pipe(imageResize({
      width: 250,
      crop: false,
      upscale: false
    }))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]},
      {verbose: true}
    ))
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3})
    ],
    {verbose: true}
    ))
    .pipe(rename({ suffix: '-200' }))
    .pipe(gulp.dest('assets/img/project'))
})

gulp.task('press-img', function () {
  return gulp.src(paths.pressImg)
    // .pipe(changed('assets/img/press'))
    .pipe(imageResize({
      width: 150,
      crop: false,
      upscale: false
    }))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3})
    ],
    {verbose: true}
    ))
    // .pipe(rename({ suffix: '' }))
    .pipe(gulp.dest('assets/img/press'))
})

gulp.task('client-img', function () {
  return gulp.src(paths.clientImg)
    // .pipe(changed('assets/img/clients'))
    .pipe(imageResize({
      width: 150,
      crop: false,
      upscale: false
    }))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3})
    ],
    {verbose: true}
    ))
    // .pipe(rename({ suffix: '' }))
    .pipe(gulp.dest('assets/img/clients'))
})

gulp.task('img', function () {
  return gulp.src(paths.img)
    .pipe(changed('assets/img'))
    .pipe(imageResize({
      width: 2000,
      crop: false,
      upscale: false
    }))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3})
    ],
    {verbose: true}
    ))
    .pipe(gulp.dest(paths.imgDest))
})

gulp.task('images', gulp.series('img', 'project-img', 'press-img'))
gulp.task('resize', gulp.series('project-img'))
gulp.task('default', gulp.series('js', 'img', 'project-img', 'press-img'))
