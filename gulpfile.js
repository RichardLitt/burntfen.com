const gulp = require('gulp')
const uglify = require('gulp-uglify')
const changed = require('gulp-changed')
const imagemin = require('gulp-imagemin')
const rename = require('gulp-rename')
const pngcrush = require('imagemin-pngcrush')
const imageResize = require('gulp-image-resize');

var paths = {
  js: ['src/js/**/*.js', '!src/js/**/*.min.js'],
  jsMin: ['src/js/**/*.min.js'],
  img: ['src/img/**/*.png', 'src/img/**/*.jpg'],
  imgDest: 'assets/img',
  projectImg: ['src/img/project/*.png', 'src/img/project/*.jpg'],
  pressImg: ['src/img/press/*.png', 'src/img/press/*.jpg']
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
    .pipe(changed('src/img/project'))
    .pipe(imageResize({
      width : 250,
      crop : false,
      upscale : false,
    }))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      ],
      {verbose: true}
    ))
    .pipe(rename({ suffix: '-200' }))
    .pipe(gulp.dest('assets/img/project'))
})

gulp.task('press-img', function () {
  return gulp.src(paths.pressImg)
    .pipe(changed('src/img/press'))
    .pipe(imageResize({
      width : 150,
      crop : false,
      upscale : false,
    }))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      ],
      {verbose: true}
    ))
    .pipe(changed(paths.imgDest))
    // .pipe(rename({ suffix: '' }))
    .pipe(gulp.dest('assets/img/press'))
})

gulp.task('img', function () {
  return gulp.src(paths.img)
        .pipe(changed('assets/img'))
        .pipe(imageResize({
          width : 2000,
          crop : false,
          upscale : false,
        }))
        .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngcrush()]
        }))
        .pipe(imagemin([
          imagemin.jpegtran({progressive: true}),
          imagemin.optipng({optimizationLevel: 3}),
          ],
          {verbose: true}
        ))
        .pipe(changed(paths.imgDest))
        .pipe(gulp.dest(paths.imgDest))
})

gulp.task('default', ['js', 'img', 'project-img', 'press-img'])
