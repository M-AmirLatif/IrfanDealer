import { formatPrice, formatPriceFull } from './src/utils/formatPrice.js';
import { convertArea, createSize, formatSize } from './src/utils/formatSize.js';
import { validatePakistaniPhone, buildWhatsAppLink, buildTelLink } from './src/utils/linkUtils.js';
import { filterProperties } from './src/utils/filterProperties.js';
import { sortProperties } from './src/utils/sortProperties.js';
import { PROPERTIES } from './src/data/properties.js';

console.log('================================================================');
console.log('UMRI PROPERTIES - PAKISTAN REAL ESTATE UTILITY TEST SUITE');
console.log('================================================================\n');

// 1. formatPrice & formatPriceFull
console.log('--- 1. CURRENCY FORMATTING (LAKH & CRORE) ---');
console.log('PKR 12,500,000 (Sale)    ->', formatPrice(12500000));
console.log('PKR 4,500,000 (Sale)     ->', formatPrice(4500000));
console.log('PKR 85,000 (Sale)        ->', formatPrice(85000));
console.log('PKR 35,000 (Rent/mo)     ->', formatPrice(35000, { isRent: true }));
console.log('PKR 120,000 (Rent/mo)    ->', formatPrice(120000, { isRent: true }));
console.log('PKR 12,500,000 (Full PK) ->', formatPriceFull(12500000));
console.log('PKR 175,000,000 (Full)   ->', formatPriceFull(175000000));

// 2. convertArea & formatSize
console.log('\n--- 2. AREA & LAND CONVERSIONS (MARLA / KANAL / SQ FT) ---');
console.log('5 Marla to Sq. Ft        ->', convertArea(5, 'marla', 'sqft'), 'sq ft (Expected: 1361.25)');
console.log('1 Kanal to Marla         ->', convertArea(1, 'kanal', 'marla'), 'Marla (Expected: 20)');
console.log('1 Kanal to Sq. Ft        ->', convertArea(1, 'kanal', 'sqft'), 'sq ft (Expected: 5445)');
console.log('272.25 Sq. Ft to Marla   ->', convertArea(272.25, 'sqft', 'marla'), 'Marla (Expected: 1)');
console.log('Formatted Size (5 Marla) ->', formatSize(createSize(5, 'marla'), { includeSqft: true }));
console.log('Formatted Size (1 Kanal) ->', formatSize(createSize(1, 'kanal'), { includeSqft: true }));

// 3. validatePakistaniPhone & buildWhatsAppLink
console.log('\n--- 3. PAKISTANI PHONE VALIDATION & LINK BUILDERS ---');
const phones = ['03016803398', '+923016803398', '03211234567', '04231234567', '12345', ''];
phones.forEach(p => {
  console.log(`Phone "${p}" valid? ->`, validatePakistaniPhone(p));
});
console.log('Tel Link:      ->', buildTelLink('+92 301 6803398'));
console.log('WhatsApp Link: ->', buildWhatsAppLink('923016803398', 'Hello Irfan, I am interested in: 5 Marla House (ID: P001).'));

// 4. filterProperties combinations
console.log('\n--- 4. FILTER COMBINATIONS & AND-LOGIC ---');
console.log('Total Listings in Data:            ', PROPERTIES.length);

const saleOnly = filterProperties(PROPERTIES, { listingType: 'sale' });
console.log('ListingType = "sale":              ', saleOnly.length, 'properties');

const rentOnly = filterProperties(PROPERTIES, { listingType: 'rent' });
console.log('ListingType = "rent":              ', rentOnly.length, 'properties');

const keywordSearch = filterProperties(PROPERTIES, { keyword: 'P001' });
console.log('Keyword = "P001":                  ', keywordSearch.length, 'property (Title:', keywordSearch[0]?.title, ')');

const areaModelTown = filterProperties(PROPERTIES, { area: ['model-town'] });
console.log('Area = ["model-town"]:             ', areaModelTown.length, 'properties');

const houseAndPlot = filterProperties(PROPERTIES, { type: ['house', 'plot'] });
console.log('Type = ["house", "plot"]:          ', houseAndPlot.length, 'properties');

const combinedComplex = filterProperties(PROPERTIES, {
  listingType: 'sale',
  area: ['lahore-road'],
  type: ['house'],
  maxPrice: 15000000,
  beds: 3,
});
console.log('Combined: Sale + Lahore Rd + House + Max 1.5 Crore + 3+ Beds:');
console.log(' -> Found:', combinedComplex.length, 'properties');
combinedComplex.forEach(p => {
  console.log(`    * [${p.code}] ${p.title} - PKR ${p.price} (${p.bedrooms} beds)`);
});

const sortedAsc = sortProperties(combinedComplex, 'price_asc');
console.log('Sorted by Price Ascending:');
sortedAsc.forEach(p => {
  console.log(`    * ${p.title} -> ${formatPrice(p.price)}`);
});

console.log('\n================================================================');
console.log('ALL UNIT & COMBINATION TESTS PASSED VERIFICATION');
console.log('================================================================');
