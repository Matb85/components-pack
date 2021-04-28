const gulp = require("gulp");
const sass = require("gulp-sass");

gulp.task("default", function () {
  return gulp.src("./css/**/*").pipe(sass()).pipe(gulp.dest("./dist"));
});
