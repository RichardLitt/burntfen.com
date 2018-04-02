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
  imgDest: 'assets/img'
}

// Disabled. Currently, only minified files are used anyway
gulp.task('js', function () {
  gulp.src(paths.js)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('assets/js'))
  gulp.src(paths.jsMin)
    .pipe(gulp.dest('assets/js'))
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

gulp.task('default', ['js', 'img'])
