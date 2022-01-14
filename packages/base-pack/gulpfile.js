const settings = require("../../build.settings.json");
const gulp = require("gulp");
const tailwind = require("tailwindcss");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const postcssEnvFunction = require("postcss-env-function");
console.log(settings.VIEWER_TRANSITION_SPEED);
const plugins = [
  tailwind(),
  postcssEnvFunction({
    importFrom: {
      environmentVariables: {
        "--viewer-transtion-speed": settings.VIEWER_TRANSITION_SPEED + "ms",
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
