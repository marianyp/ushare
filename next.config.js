const withPWA = require("next-pwa")
const withPlugins = require("next-compose-plugins")
const withStyles = require("@webdeb/next-styles")

module.exports = withPlugins([
	[
		withPWA,
		{
			pwa: {
        dest: "public",
        disable: process.env.NODE_ENV === 'development'
			},
		},
	],
	[
		withStyles,
		{
			sass: true,
			modules: true,
			sassLoaderOptions: {
				sassOptions: {
					includePaths: ["styles", "components"], // @import 'variables'; # loads (src/styles/varialbes.scss), you got it..
				},
			},
			cssLoaderOptions: {},
			postcssLoaderOptions: {},
		},
	],
])