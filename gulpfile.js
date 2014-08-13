var program = require('commander');
var browserify = require('browserify');
var chalk = require('chalk');
var rimraf = require('rimraf');

var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var buffer = require('gulp-buffer');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var eslint = require('gulp-eslint');
var htmlmin = require('gulp-htmlmin');
var less = require('gulp-less');
var micro = require('gulp-micro');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');
var source = require('vinyl-source-stream');
var serve = require('gulp-serve');
var manifest = require('gulp-manifest');
var replace = require('gulp-replace-task');

program.on('--help', function(){
  console.log('  Tasks:');
  console.log();
  console.log('    build       build the game');
  console.log('    clean       delete generated files');
  console.log('    dist        generate archive');
  console.log('    watch       watch for file changes and rebuild automatically');
  console.log();
});

program
  .usage('<task> [options]')
  .option('-p, --prod', 'generate production assets')
  .parse(process.argv);

var prod = !!program.prod;

gulp.task('default', function() {
  program.help();
});

gulp.task('build', ['build_source', 'build_index', 'build_styles', 'manifest']);

gulp.task('build_source', function() {
  return browserify()
    .add('./src/main.js')
    .bundle()
    .on('error', browserifyError)
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe(gulpif(prod, uglify()))
    .pipe(gulp.dest('build'));
});

gulp.task('build_index', function() {
  console.log('prod', prod);

  return gulp.src('src/index.html')
    .pipe(gulpif(prod, replace({
        patterns: [
          {
            match: 'manifest',
            replacement: 'manifest="app.manifest"'
          }
        ]
      })))
    .pipe(gulpif(prod, htmlmin({
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      })))
    .pipe(gulpif(!prod, replace({
        patterns: [
          {
            match: 'manifest',
            replacement: ''
          }
        ]
      })))
    .pipe(gulp.dest('build'));
});

gulp.task('build_styles', function() {
  return gulp.src('src/styles.less')
    .pipe(less())
    .pipe(concat('build.css'))
    .pipe(gulpif(prod, cssmin()))
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
  rimraf.sync('build');
  rimraf.sync('dist');
});

gulp.task('lint', function() {
  return gulp.src(['*.js', 'src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('dist', ['build'], function() {
  if (!prod) {
    gutil.log(chalk.yellow('WARNING'), chalk.gray('Missing flag --prod'));
    gutil.log(chalk.yellow('WARNING'), chalk.gray('You should generate production assets to lower the archive size'));
  }

  return gulp.src('build/*')
    .pipe(zip('archive.zip'))
    .pipe(size())
    .pipe(micro({limit: 13 * 1024}))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['lint', 'build_source', 'manifest']);
  gulp.watch('src/styles.less', ['build_styles', 'manifest']);
  gulp.watch('src/index.html', ['build_index', 'manifest']);
});

gulp.task('manifest', function(){
  gulp.src(['build/*'])
    .pipe(manifest({
      hash: true,
      preferOnline: true,
      network: ['http://*', 'https://*', '*'],
      filename: 'app.manifest',
      exclude: ['app.manifest','CNAME']
     }))
    .pipe(gulp.dest('build'));
});

gulp.task('serve', serve('build'));

gulp.task('flo', function(){
  var flo = require('fb-flo'),
    fs = require('fs');

  flo(
    'build',
    {
      port: 8888,
      host: 'localhost',
      verbose: false,
      glob: [
        '**/*.js',
        '**/*.html',
        '**/*.css'
      ]
    },
    function resolver(filepath, callback) {
      callback({
        resourceURL: filepath,
        contents: fs.readFileSync('build/' + filepath),
        reload: filepath.match(/\.(js|html)$/),
      });
    }
  );
});

gulp.task('start', ['build', 'serve', 'flo', 'watch']);

function browserifyError(err) {
  gutil.log(chalk.red('ERROR'), chalk.gray(err.message));
  this.emit('end');
}
