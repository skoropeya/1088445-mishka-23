const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const squoosh = require("gulp-libsquoosh");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// HTML min

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

// scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(terser())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

// images

const optimizeImages = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"));
}

exports.optimizeImages = optimizeImages;

const copyImages = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(gulp.dest("build/img"));
}

exports.copyImages = copyImages;

// webp

const createWebp = () => {
  return gulp.src(["source/img/**/*.{jpg,png}", "!source/img/background/*.{jpg,png}"])
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
}

exports.createWebp = createWebp;

// sprite

const sprite = () => {
  return gulp.src("source/img/icon-sprite/*.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

// copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/img/**/*.svg",
    "!source/img/icon-sprite/*.svg",
    "source/manifest.webmanifest"
  ],
  {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

// clean

const clean = () => {
  return del("build");
}

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;


// reload

const reload = (done) => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/js/*.js", gulp.series(scripts));
  gulp.watch("source/img/icon-sprite/*.svg", gulp.series(sprite));
  gulp.watch("source/*.html", gulp.series(html, reload));
  gulp.watch("source/img/**/*.{jpg,png,svg}", gulp.series(copyImages));
  gulp.watch(["source/img/**/*.{jpg,png}", "!source/img/background/*.{jpg,png}"], gulp.series(createWebp));
}

// build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    createWebp,
    sprite
  )
);

exports.build = build;

// start

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    createWebp,
    sprite
  ),
  gulp.series(
    server,
    watcher
  )
);
