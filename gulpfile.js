const gulp = require("gulp")
const del = require("del")

const imagemin = require("gulp-imagemin")
const useref = require("gulp-useref")

const postcss = require("gulp-postcss")
const postcssPresetEnv = require("postcss-preset-env")

gulp.task("clean", function () {
  return del(["dist/**/*"])
})

gulp.task("css", function () {
  return gulp
    .src("./styles/*.css")
    .pipe(postcss([postcssPresetEnv()]))
    .pipe(gulp.dest("./styles"))
})

gulp.task("js", function () {
  return gulp.src("./scripts/*.js").pipe(gulp.dest("./scripts"))
})

gulp.task("html", function () {
  return gulp.src("./*.html").pipe(gulp.dest("."))
})

gulp.task("images", function () {
  return gulp
    .src("./images/**/*.+(png|jpg|gif|svg)")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/images"))
})

gulp.task("build", gulp.parallel("css", "js", "html", "images"))
