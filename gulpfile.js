const gulp = require('gulp');
const imgmin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const runSequence = require('gulp4-run-sequence');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const lazypipe = require('lazypipe');
const order = require('gulp-order');

// Default task only gets executed when typed only gulp
gulp.task('default', async () =>  {
  console.log('Please add the task name. Default task is not defined.');
});

// Moving all html to dist folder
gulp.task('copyAllHTML', async function()  {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

// Moving images to dist folder
gulp.task('minifyImgs', function(done) {
  gulp.src('src/img/**/*')
  .pipe(imgmin())
  .pipe(gulp.dest('dist/img'))
  done();
});

// Moving page specific minified js to dist folder
gulp.task('moveMinifiedJs', async () => {
  gulp.src('src/scripts/page-specific/*.js')
  .pipe(gulp.dest('src/js/page-specific'))
  .pipe(gulp.dest('dist/js/page-specific'))
});

const sourceJS = [
  'node_modules/@babel/polyfill/dist/polyfill.js',
  'src/scripts/vendor/*.js',
  'src/scripts/custom/*.js'
];
const jsOrder = [
  'node_modules/@babel/polyfill/dist/polyfill.js',
  'src/scripts/vendor/jquery-3.4.1.min.js',
  'src/scripts/vendor/popper.min.js',
  'src/scripts/vendor/bootstrap.min.js',
  'src/scripts/custom/*.js'
];

// JS build for development
gulp.task("devJs", async () => {
  gulp.src(sourceJS)
  .pipe(order(jsOrder))
  .pipe(uglify())
  .pipe(concat('main.min.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('src/js'))
  .pipe(gulp.dest('dist/js'))
});


// Process Sass
gulp.task('sass2Css', () => {
  return gulp.src('src/sass/**/*.scss')
    .pipe(order([
      'src/sass/bootstrap/*.scss',
      'src/sass/custom/*.scss'
    ]))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream())
})

// minify CSS
gulp.task('minifyCss', () => {
  return gulp.src('src/css/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('src/style'))
    .pipe(gulp.dest('dist/style'));
})

// move Css to dist
gulp.task('copyCss', function() {
  return gulp.src('src/style/*.css')
    .pipe(gulp.dest('dist/style'));
})

// css build
gulp.task('css', (callback) => {
  runSequence('sass2Css', 'minifyCss','copyCss', callback)
})

// Production build with processJs
gulp.task('prodJs', function() {
  return gulp.src('src/**/*.html')
    .pipe(useref({}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    .pipe(sourcemaps.write('.'))
    .pipe(gulpIf("*.js", uglify()))
    .pipe(gulp.dest('dist'))
})

gulp.task('build:dev', (callback) => {
  runSequence('css', ['minifyImgs', 'moveMinifiedJs', 'devJs'], callback)
})

gulp.task('build:prod', (callback) => {
  runSequence('css', ['minifyImgs', 'moveMinifiedJs', 'prodJs'], callback)
})

// Watch source file change and reload browser for development
gulp.task('watch', () => {
  browserSync.init({
    server: './src',
    port:8080,
    ui: {port: 8081}
  })

  gulp.watch('src/scripts/**/*.js', gulp.series('devJs'));
  gulp.watch('src/*.html', gulp.series('copyAllHTML'));
  gulp.watch('src/img/**/*', gulp.series('minifyImgs'));
  gulp.watch('src/sass/**/*.scss', gulp.series('css'));

  //reloader
  gulp.watch('src/scripts/**/*.js').on('change', browserSync.reload);
  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch('src/img/**/*').on('change', browserSync.reload);
  gulp.watch('src/sass/**/*.scss').on('change', browserSync.reload);
})

gulp.task('checkDist', function() {
  browserSync.init({
    server: './dist',
    port:8080,
    ui: {port: 8081}
  })
})