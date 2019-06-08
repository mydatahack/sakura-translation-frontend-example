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
const babel = require('gulp-babel');

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
  .pipe(gulp.dest('dist/scripts/page-specific'))
});

// Process unminified js
gulp.task("processJs", async () => {
  gulp.src([
    'node_modules/@babel/polyfill/dist/polyfill.js',
    'src/scripts/*.js',
    'src/scripts/custom/*.js'
  ])
  .pipe(sourcemaps.init())
  .pipe(babel({presets: ['@babel/env']})) // if no target specified, it will transform to ECMAScript 2015+
  .pipe(uglify())
  .pipe(concat('main.min.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/scripts'))
});

// Process Sass
gulp.task('sass2Css', () => {
  return gulp.src('src/sass/**/*scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream())
})

// minify CSS
gulp.task('minifyCss', () => {
  return gulp.src('src/css/**/*.css')
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(concat('main.min.css'))
  .pipe(gulp.dest('src/style'))
})

// move Css to dist
gulp.task('processCss', function() {
  return gulp.src('src/style/*.css')
    // .pipe(concat('allstyle.css'))
    .pipe(gulp.dest('dist/style'));
})

// css build
gulp.task('css', (callback) => {
  runSequence('sass2Css', 'minifyCss','processCss', callback)
})

// dev build
gulp.task('build', (callback) => {
  runSequence('sass2Css', 'minifyCss',['copyAllHTML','minifyImgs', 'moveMinifiedJs', 'processJs', 'processCss'], callback)
})

// Watch source file change and reload browser for development
gulp.task('watch', () => {
  browserSync.init({
    server: './src',
    port:8080,
    ui: {port: 8081}
  })

  gulp.watch('src/scripts/**/*.js', gulp.series('processJs'));
  gulp.watch('src/*.html', gulp.series('copyAllHTML'));
  gulp.watch('src/img/**/*', gulp.series('minifyImgs'));
  gulp.watch('src/sass/**/*.scss', gulp.series('sass2Css', 'minifyCss', 'processCss'));

  //reloader
  gulp.watch('src/scripts/**/*.js').on('change', browserSync.reload);
  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch('src/img/**/*').on('change', browserSync.reload);
  gulp.watch('src/sass/**/*.scss').on('change', browserSync.reload);
})

