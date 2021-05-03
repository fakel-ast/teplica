// Base
const path              = require('path');
const gulp              = require('gulp');
const notify            = require('gulp-notify');
const plumber           = require('gulp-plumber');

// General
const concat            = require('gulp-concat');
const sourcemaps        = require('gulp-sourcemaps');

// Scripts
const webpack           = require('webpack')
const webpackStream     = require('webpack-stream');

// Styles
const sass              = require('gulp-sass');
const autoprefixer      = require('gulp-autoprefixer');

// Images
const svgSprite 		= require('gulp-svg-sprites');
const replace 			= require('gulp-replace');
const cheerio 			= require('gulp-cheerio');

// webp
const webp = require('gulp-webp');


// Paths
const paths = {
    build:  path.join(__dirname, '.'),
    node:   path.join(__dirname, 'node_modules'),
    src: {
        self:       path.join(__dirname, 'src'),
        js:         'src/js/',
        sass:       'src/scss/',
        images:     'src/images/',
    },
    static: {
        self:       'static/',
        js:         'static/js/',
        css:        'static/css/',
        images:     'static/images/',
    },
}


function jsTask() {
	return gulp
		.src(path.join(paths.src.self, "js", "index.js"))
		.pipe(webpackStream({
			mode: "development",
			entry: {
				index: [path.join(paths.src.self, "js", "index.js")],
			},
			output: {
				path: paths.build,
				publicPath: "/",
				filename: "static/js/[name].bundle.js",
				library: "[name]"
			},
			module: {
				rules: [
					{
						test: /\.(js|jsx)$/,
						exclude: /node_modules/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env'],
								plugins: [
									['@babel/plugin-proposal-class-properties'],
									['@babel/plugin-transform-runtime'],
								]
							}
						}
					},
				]
			},
			resolve: {
				extensions: ["*", ".js", ".jsx"],
				modules: [
					paths.node,
					paths.src.self,
				],
			},
			optimization: {
				splitChunks: {
					cacheGroups: {
						commons: {
							test: /[\\/](node_modules|vendors)[\\/]/,
							name: "vendors",
							chunks: "all"
						}
					}
				}
			},
		}))
		.pipe(gulp.dest(paths.build));
}
gulp.task(jsTask);


function jsBuildTask() {
	return gulp
		.src(path.join(paths.src.self, "js", "*.js"))
		.pipe(webpackStream({
			mode: "production",
			entry: {
				index: [path.join(paths.src.self, "js", "index.js")],
			},
			module: {
				rules: [
					{
						test: /\.(js|jsx)$/,
						exclude: /node_modules/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env'],
								plugins: [
									['@babel/plugin-proposal-class-properties'],
									['@babel/plugin-transform-runtime'],
								]
							}
						}
					},
				]
			},
			resolve: {
				extensions: ["*", ".js", ".jsx"],
				modules: [
					paths.node,
					paths.src.self,
				],
			},
			output: {
				path: paths.build,
				publicPath: "/",
				filename: "static/js/[name].bundle.js",
				library: "[name]"
			},
			optimization: {
				splitChunks: {
					cacheGroups: {
						commons: {
							test: /[\\/](node_modules|vendors)[\\/]/,
							name: "vendors",
							chunks: "all"
						}
					}
				}
			},
		}))
		.pipe(gulp.dest(paths.build));
}
gulp.task(jsBuildTask);


function sassTask() {
	return gulp.src(paths.src.sass + "*.+(scss|sass|css)", {matchBase: true})
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
		.pipe(autoprefixer("last 2 version"))
		.pipe(sourcemaps.write("./", { sourceRoot: "/source/scss" }))
		.pipe(gulp.dest(paths.static.css))
}
gulp.task(sassTask);


function sassBuildTask() {
	return gulp.src(path.join(paths.src.sass, "*.+(scss|sass|css)"))
		.pipe(plumber({ errorHandler: notify.onError("<%= error.message %>") }))
		.pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
		.pipe(gulp.dest(paths.static.css))
}
gulp.task(sassBuildTask);



function svgTask() {
	return gulp
		.src(paths.src.images + '/*.svg')
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[style]').removeAttr('style');
				$('[stroke]').removeAttr('stroke');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(replace('&gt;', '>'))
		.pipe(
			svgSprite({
				mode: "symbols",
				preview: false,
				selector: "%f",
				svg: {
				symbols: 'sprite.svg'
			},
			transformData: function (data, config) {
				for(var i in data.svg) {
					var result = data.svg[i].data.match(/path id="([a-z]+)"/ig );
					if (null !== result) {
						for(var j in result) {
							var regexp = /\"([a-z]+)\"/i;
							var matches = regexp.exec(result[j]);
							matches[0] = matches[0].replace(/\"/g, '');

							var k = 0;

							var regexp = new RegExp('(path id\=\"|xlink\:href\=\"#)('+matches[0]+'){1}', 'g');
							data.svg[i].data = data.svg[i].data.replace(regexp, function(str, p1, p2, offset, s)
								{
									return p1 + "" + i + "" + j + "" + p2;
								});
						}
					}
				}
				return data;
			},
		}
		))
		.pipe(replace('NaN ', '-'))
		.pipe(gulp.dest(paths.static.images))
}
gulp.task(svgTask);


function staticSvgTask() {
	return gulp
		.src(paths.src.images + '/static/*.svg')
		.pipe(replace('&gt;', '>'))
		.pipe(
			svgSprite({
				mode: "symbols",
				preview: false,
				selector: "%f",
				svg: {
				symbols: 'static-sprite.svg'
			},
			transformData: function (data, config) {
				for(var i in data.svg) {
					var result = data.svg[i].data.match(/path id="([a-z]+)"/ig );
					if (null !== result) {
						for(var j in result) {
							var regexp = /\"([a-z]+)\"/i;
							var matches = regexp.exec(result[j]);
							matches[0] = matches[0].replace(/\"/g, '');

							var k = 0;

							var regexp = new RegExp('(path id\=\"|xlink\:href\=\"#)('+matches[0]+'){1}', 'g');
							data.svg[i].data = data.svg[i].data.replace(regexp, function(str, p1, p2, offset, s)
								{
									return p1 + "" + i + "" + j + "" + p2;
								});
						}
					}
				}
				return data;
			},
		}
		))
		.pipe(replace('NaN ', '-'))
		.pipe(gulp.dest(paths.static.images))
}
gulp.task(staticSvgTask);



function watchTask() {

	gulp.watch(paths.src.js + "**/*.+(js|ts)", gulp.parallel(jsTask));
	gulp.watch(paths.src.sass + "**/*.+(scss|sass)", gulp.parallel(sassTask));

	gulp.watch([paths.src.images + '/*.svg'], gulp.parallel(svgTask));
	gulp.watch([paths.src.images + '/static/*.svg'], gulp.parallel(staticSvgTask));
	return gulp
}
gulp.task(watchTask);


gulp.task('default', gulp.parallel(watchTask, jsTask, sassTask, svgTask, staticSvgTask));
gulp.task('build', gulp.parallel(jsBuildTask, sassBuildTask));