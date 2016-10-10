import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import path from 'path';
import { Instrumenter } from 'isparta';
import del from 'del';

const plugins = gulpLoadPlugins();

const paths = {
  appFiles: ['./lib/**/*.js', './package.json', '!dist/**', '!node_modules/**', '!coverage/**'],
  tests: ['./test/**/*.js']
};

gulp.task('clean', () =>
  del(['dist/**', 'coverage/**'])
  // del(['dist/**', 'coverage/**', '!dist', '!coverage']) // Alternativa para manter dist e coverage
);

gulp.task('build', ['clean'], () =>
  gulp.src(paths.appFiles)
  // .pipe(plugins.newer('dist')) // Os diretórios estão sendo excluídos
  .pipe(plugins.babel({
    ignore: ['./package.json']
  }))
  .pipe(gulp.dest('dist'))
);

gulp.task('nodemon', ['build'], () =>
  plugins.nodemon({
    script: path.join('dist', 'lib/index.js'),
    tasks: ['build']
  }) 
);

gulp.task('pre-test', ['clean'], () =>
  gulp.src([...paths.appFiles, '!*.json'])
  .pipe(plugins.istanbul({
    instrumenter: Instrumenter,
    includeUntested: true // Inclui os arquivos sem testes
  }))
  // Force `require` to return covered files
  .pipe(plugins.istanbul.hookRequire())
);

gulp.task('test', ['pre-test'], () => {
  // let exitCode = 0;

  return gulp.src(paths.tests, { read: false })
    // .pipe(plugins.plumber())
    .pipe(plugins.mocha())
    // .once('error', (err) => {
    //   // plugins.util.log(err);
    //   console.log(err);
    //   exitCode = 1;
    // })
    .pipe(plugins.istanbul.writeReports({
      reporters: ['lcov', 'text', 'text-summary']
    }))
    .pipe(plugins.istanbul.enforceThresholds({
      thresholds: {
        global: { statements: 80, branches: 80, functions: 80, lines: 76 }
      }
    }))
    // .once('end', () => {
    //   // plugins.util.log('completed !!');
    //   console.log('completed!!!')
    //   process.exit(exitCode);
    // });
});
