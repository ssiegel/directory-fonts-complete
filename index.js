var fs = require('fs');
var isOtf = require('is-otf');
var isTtf = require('is-ttf');
var isWoff = require('is-woff');
var isWoff2 = require('is-woff2');
var woff2rs = require('@woff2/woff2-rs');
var opentype = require('opentype.js');
var ur = require('@japont/unicode-range');
var path = require('path');

function getNormalizedFontFormatByBuffer(buffer) {
  return isWoff2(buffer)
          ? 'woff2'
          : isWoff(buffer)
            ? 'woff'
            : isTtf(buffer)
              ? 'ttf'
                : isOtf(buffer)
                  ? 'otf'
                  : undefined;
}

function addFontToFoundryByPath(foundry, resolvedFilePath, relativeFilePath, swapKeys) {
	var buffer = fs.readFileSync(resolvedFilePath);
  var fontFormat = getNormalizedFontFormatByBuffer(buffer);
	if (fontFormat) {
    if (fontFormat === 'woff2') {
      buffer = woff2rs.decode(buffer);
    }

    var rawData = opentype.parse(buffer.buffer);
		var nameData = rawData && rawData.tables && rawData.tables.name;

		if (nameData) {
			var fontFamily = rawData.getEnglishName('preferredFamily') || rawData.getEnglishName('fontFamily');
      var fontWeight = rawData.tables.os2.usWeightClass;
			var fontStyle = rawData.tables.os2.fsSelection & rawData.fsSelectionValues.ITALIC ? 'italic' : 'normal';
			var fontSrcLocal = 'fullName' in rawData.tables.name && 'postScriptName' in rawData.tables.name ? [ rawData.getEnglishName('fullName'), rawData.getEnglishName('postScriptName') ] : 'fullName' in rawData.tables.name ? [rawData.getEnglishName('fullName')] : [];

			if (fontFamily && fontWeight && fontStyle) {
				var foundryFamily = foundry[fontFamily] = foundry[fontFamily] || {};
        var foundryVariants = foundryFamily.variants = foundryFamily.variants || {};
        
        if (swapKeys) {
          var key1 = fontStyle;
          var key2 = fontWeight;
        } else {
          var key1 = fontWeight;
          var key2 = fontStyle;
        }
        var foundryWeight = foundryVariants[key1] = foundryVariants[key1] || {};
        var foundryStyle  = foundryWeight[key2] = foundryWeight[key2] || { local: [], url: {} };
        
				if (fontSrcLocal.length) {
					foundryStyle.local = fontSrcLocal;
				}

				foundryStyle.url[fontFormat] = relativeFilePath;
				var range = Object.entries(rawData.glyphs.glyphs).reduce((range, [_, glyph]) => range.concat(glyph.unicodes), []);
				if ('range' in foundryStyle) {
					foundryStyle.range = ur.UnicodeRange.stringify(ur.UnicodeRange.parse(foundryStyle.range).filter((i) => range.includes(i)));
				} else {
					foundryStyle.range = ur.UnicodeRange.stringify(range);
				}
			}
		}
	}
}

module.exports = function (relativeDirPath, relativeFontPath, swapKeys) {
	relativeDirPath = relativeDirPath.replace(/\/$/, '');
  relativeFontPath = relativeFontPath || relativeDirPath;
  swapKeys = swapKeys || false;

	var resolvedDirPath = path.resolve(relativeDirPath);
	var foundry = {};

	if (fs.existsSync(resolvedDirPath) && fs.lstatSync(resolvedDirPath).isDirectory()) {
		var filePaths = fs.readdirSync(resolvedDirPath, { recursive: true });

		filePaths.forEach(function (filePath) {
			var resolvedFilePath = resolvedDirPath + '/' + filePath;
			var relativeFilePath = relativeFontPath + '/' + filePath;

			if (fs.lstatSync(resolvedFilePath).isFile()) {
				addFontToFoundryByPath(foundry, resolvedFilePath, relativeFilePath, swapKeys);
			}
		});
	}

	return foundry;
};
