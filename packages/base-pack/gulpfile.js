require("dotenv").config({ path: __dirname + "/./../../.env" });
const gulp = require("gulp");
const tailwind = require("tailwindcss");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const postcssEnvFunction = require("postcss-env-function");
console.log(process.env.VIEWER_TRANSITION_SPEED);
const plugins = [
  tailwind(),
  postcssEnvFunction({
    importFrom: {
      environmentVariables: {
        "--viewer-transtion-speed": process.env.VIEWER_TRANSITION_SPEED + "ms",
      },
    },
  }),
];

gulp.task("default", function () {
  return gulp
    .src("./css/**/*")
    .pipe(
      sass({
        includePaths: ["./node_modules/modular-slider/dist/"],
      })
    )
    .pipe(postcss(plugins))
    .pipe(gulp.dest("./dist"));
});
