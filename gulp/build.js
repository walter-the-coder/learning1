'use strict';

var gulp = require('gulp'),
  useref = require('gulp-useref');

var $ = require('gulp-load-plugins')();
var saveLicense = require('uglify-save-license');


gulp.task('styles', function () {
  return gulp.src('app/styles/main.scss')//Henter main.scss
    .pipe($.plumber())//Prevent pipe breaking caused by errors from gulp plugins. (Forhindrer at serveren går ned pga sass-feil)
    .pipe($.rubySass({style: 'expanded'}))//Setter sass komrimerings style. Se SASS-dokumentasjon for mer info
    .pipe($.autoprefixer('last 1 version'))//Parse CSS and add vendor prefixes to CSS rules using values from the Can I Use website. (genialt!)
    .pipe(gulp.dest('.tmp/styles'))//Sender filene til valgt destinasjon
    .pipe($.size());//Henter størrelsen på angitte filer. (for logging)
});


//returnerer: feil i javascriptkoden samt at den returnerer størrelsen
gulp.task('scripts', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint()) //initializerer jshint som sier ifra hvis det er noe galt eller mistenkelig med .js koden
    .pipe($.jshint.reporter('jshint-stylish'))//egen rapport-mal kalt jshint-stylish. Denne er en egen requirement
    .pipe($.size()); //Henter størrelsen på angitte filer. (for logging)
});


gulp.task('partials', function () {
  return gulp.src('app/partials/**/*.html')//Henter alle angitte filer
    .pipe($.minifyHtml({ //html minifyer
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.ngHtml2js({//This way you end up with 1 single, minified Javascript file, which pre-loads all the (minified) HTML templates.
      moduleName: "stylingMaler",
      prefix: "partials/"
    }))
    .pipe(gulp.dest(".tmp/partials"))//Sender filene til valgt destinasjon
    .pipe($.size());//Henter størrelsen på angitte filer. (for logging)
});


gulp.task('html', ['styles', 'scripts', 'partials'], function () { //kjører 'styles', 'scripts', 'partials', og så 'html'
  var jsFilter = $.filter('**/*.js');//filtrerer ut filer som vi vil har
  var cssFilter = $.filter('**/*.css');//filtrerer ut filer som vi vil har
  var assets = useref.assets();

  return gulp.src('app/*.html')//Henter alle angitte filer
    .pipe($.inject(gulp.src('.tmp/partials/**/*.js'), {//gulp-inject takes a stream of source files, transforms each file to a string and injects each transformed string into placeholders in the target stream files
      read: false,
      starttag: '<!-- inject:partials -->',
      addRootSlash: false,
      addPrefix: '../'
    }))
    .pipe(assets)//concatenate files
    .pipe($.rev())// Rename the concatenated files
    .pipe(jsFilter)//legger på .js-filteret som er lagd i begynnelsen av funksjonen
    .pipe($.ngmin())//pre-minifier. Denne bør skiftes ut med ng-annotate etterhvert. Mulig det vil bli gjort i senere versjoner av gulp
    .pipe($.uglify({preserveComments: saveLicense}))//Minify JavaScript
    .pipe(jsFilter.restore())// bring back the previously filtered out files (optional)
    .pipe(cssFilter)//legger på .css-filteret som er lagd i begynnelsen av funksjonen
    .pipe($.replace('bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap','fonts'))//The replacement string or function. If replacement is a function, it will be called once for each match and will be passed the string that is to be replaced.
    .pipe($.csso())//Minimizing av CSS filer
    .pipe(cssFilter.restore())// bring back the previously filtered out files (optional)
    .pipe(assets.restore())//Putter filene tilbake i strømmen
    .pipe($.useref())//Parse build blocks in HTML files to replace references
    .pipe($.revReplace())// Substitute in new filenames (Rewrite occurences of filenames which have been renamed by gulp-rev)
    .pipe(gulp.dest('dist'))//Sender filene til valgt destinasjon
    .pipe($.size());//Henter størrelsen på angitte filer. (for logging)
});

gulp.task('images', function () {//optimalisering av bilder.
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

gulp.task('fonts', function () {////optimalisering av fonter
  return $.bowerFiles()
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size());
});

gulp.task('clean', function () {
  return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['html', 'partials', 'images', 'fonts']);
