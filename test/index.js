const expect  = require('chai').expect;
const directoryFonts = require('../index.js');

const expected = {
  'Fira Code': {
    variants: {
      '400': {
        normal: {
          local: [ 'FiraCode-Regular', 'FiraCode-Regular' ],
          url: {
            otf: '/fonts/FiraCode-Regular.otf',
            ttf: '/fonts/FiraCode-Regular.ttf',
            woff: '/fonts/FiraCode-Regular.woff',
            woff2: '/fonts/FiraCode-Regular.woff2'
          },
          range: [ "U+d", "U+20-7e", "U+a0-17e", "U+192", "U+1fc-1ff", "U+218-21b", "U+237", "U+2b9-2ba", "U+2bc", "U+2c6-2c7", "U+2c9", "U+2d8-2dd", "U+300-304", "U+306-308", "U+30a-30c", "U+30f", "U+313-314", "U+326-327", "U+335-336", "U+342", "U+345", "U+370-377", "U+37a-37f", "U+384-38a", "U+38c", "U+38e-3a1", "U+3a3-3e1", "U+3f0-479", "U+48a-52f", "U+1e80-1e85", "U+1ef2-1ef3", "U+1f00-1f15", "U+1f18-1f1d", "U+1f20-1f45", "U+1f48-1f4d", "U+1f50-1f57", "U+1f59", "U+1f5b", "U+1f5d", "U+1f5f-1f7d", "U+1f80-1fb4", "U+1fb6-1fc4", "U+1fc6-1fd3", "U+1fd6-1fdb", "U+1fdd-1fef", "U+1ff2-1ff4", "U+1ff6-1ffe", "U+2007-2008", "U+200b", "U+2012-2015", "U+2017-201a", "U+201c-201e", "U+2020-2022", "U+2026", "U+2030", "U+2039-203a", "U+2044", "U+204a", "U+2070", "U+2074-208e", "U+20ac", "U+20af", "U+20b9-20ba", "U+20bd", "U+2113", "U+2116", "U+2122", "U+212e", "U+2153-215f", "U+218a-218b", "U+2190-2199", "U+21e6-21ea", "U+2202", "U+220f", "U+2211-2212", "U+2215", "U+2219-221a", "U+221e", "U+2229", "U+222b", "U+2248", "U+2260-2261", "U+2264-2265", "U+2302", "U+2310", "U+2320-2321", "U+2326-2328", "U+232b", "U+23ce", "U+2500-2503", "U+250c-256c", "U+2571-25a3", "U+25aa-25af", "U+25b2", "U+25ba", "U+25bc", "U+25c4", "U+25c6-25c7", "U+25c9-25cb", "U+25ce-25d3", "U+25d5-25d7", "U+25d9-25e5", "U+25e7-25eb", "U+25ef-25f7", "U+2620", "U+2639-263c", "U+2640", "U+2642", "U+2660", "U+2663", "U+2665-2666", "U+266a-266b", "U+27a1", "U+2b05-2b07", "U+e000-e003", "U+e0a0-e0a2", "U+e0b0-e0b3", "U+feff", "U+1f310" ]
        }
      }
    }
  }
};

const expected_swapped = {
  'Fira Code': {
    variants: {
      'normal': {
        400: {
          local: [ 'FiraCode-Regular', 'FiraCode-Regular' ],
          url: {
            otf: '/fonts/FiraCode-Regular.otf',
            ttf: '/fonts/FiraCode-Regular.ttf',
            woff: '/fonts/FiraCode-Regular.woff',
            woff2: '/fonts/FiraCode-Regular.woff2'
          },
          range: [ "U+d", "U+20-7e", "U+a0-17e", "U+192", "U+1fc-1ff", "U+218-21b", "U+237", "U+2b9-2ba", "U+2bc", "U+2c6-2c7", "U+2c9", "U+2d8-2dd", "U+300-304", "U+306-308", "U+30a-30c", "U+30f", "U+313-314", "U+326-327", "U+335-336", "U+342", "U+345", "U+370-377", "U+37a-37f", "U+384-38a", "U+38c", "U+38e-3a1", "U+3a3-3e1", "U+3f0-479", "U+48a-52f", "U+1e80-1e85", "U+1ef2-1ef3", "U+1f00-1f15", "U+1f18-1f1d", "U+1f20-1f45", "U+1f48-1f4d", "U+1f50-1f57", "U+1f59", "U+1f5b", "U+1f5d", "U+1f5f-1f7d", "U+1f80-1fb4", "U+1fb6-1fc4", "U+1fc6-1fd3", "U+1fd6-1fdb", "U+1fdd-1fef", "U+1ff2-1ff4", "U+1ff6-1ffe", "U+2007-2008", "U+200b", "U+2012-2015", "U+2017-201a", "U+201c-201e", "U+2020-2022", "U+2026", "U+2030", "U+2039-203a", "U+2044", "U+204a", "U+2070", "U+2074-208e", "U+20ac", "U+20af", "U+20b9-20ba", "U+20bd", "U+2113", "U+2116", "U+2122", "U+212e", "U+2153-215f", "U+218a-218b", "U+2190-2199", "U+21e6-21ea", "U+2202", "U+220f", "U+2211-2212", "U+2215", "U+2219-221a", "U+221e", "U+2229", "U+222b", "U+2248", "U+2260-2261", "U+2264-2265", "U+2302", "U+2310", "U+2320-2321", "U+2326-2328", "U+232b", "U+23ce", "U+2500-2503", "U+250c-256c", "U+2571-25a3", "U+25aa-25af", "U+25b2", "U+25ba", "U+25bc", "U+25c4", "U+25c6-25c7", "U+25c9-25cb", "U+25ce-25d3", "U+25d5-25d7", "U+25d9-25e5", "U+25e7-25eb", "U+25ef-25f7", "U+2620", "U+2639-263c", "U+2640", "U+2642", "U+2660", "U+2663", "U+2665-2666", "U+266a-266b", "U+27a1", "U+2b05-2b07", "U+e000-e003", "U+e0a0-e0a2", "U+e0b0-e0b3", "U+feff", "U+1f310" ]
        }
      }
    }
  }
};

describe('directory-fonts-complete', function () {
  it('should meta information of fonts', function () {
    expect(directoryFonts('./test/fonts', '/fonts')).to.eql(expected);
  });
  it('should meta information of fonts with swapKeys option', function () {
    expect(directoryFonts('./test/fonts', '/fonts', true)).to.eql(expected_swapped);
  });
})
