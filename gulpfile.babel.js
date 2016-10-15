/* eslint import/no-extraneous-dependencies: 0 */

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import path from 'path';
import { Instrumenter } from 'isparta';
import del from 'del';

const plugins = gulpLoadPlugins();

const paths = {
  appFiles: ['./lib/**/*.js', './package.json', '!dist/**', '!node_modules/**', '!coverage/**'],
  tests: ['./test/**/*.js'],
};

gulp.task('clean', () =>
  del(['dist/**', 'coverage/**'])
);

gulp.task('build', ['clean'], () =>
  gulp.src(paths.appFiles)
  .pipe(plugins.babel({
    ignore: ['./package.json'],
  }))
  .pipe(gulp.dest('dist'))
);

gulp.task('serve', ['build'], () =>
  plugins.nodemon({
    script: path.join('dist', 'lib/index.js'),
    tasks: ['build'],
  })
);

gulp.task('pre-test', ['clean'], () =>
  gulp.src([...paths.appFiles, '!*.json'])
  .pipe(plugins.istanbul({
    instrumenter: Instrumenter,
    includeUntested: true, // Inclui os arquivos sem testes
  }))
  // Force `require` to return covered files
  .pipe(plugins.istanbul.hookRequire())
);

gulp.task('test', ['pre-test'], () =>
  gulp.src(paths.tests, { read: false })
  .pipe(plugins.mocha())
  .pipe(plugins.istanbul.writeReports({
    reporters: ['lcov', 'text', 'text-summary'],
  }))
  .pipe(plugins.istanbul.enforceThresholds({
    thresholds: {
      global: { statements: 80, branches: 80, functions: 80, lines: 76 },
    },
  }))
);
