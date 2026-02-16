// Only local images from public/gallery and public/merch are used (see src/assetPaths.js).

export const instagramUrl = 'https://www.instagram.com/redwater.pnw/';
export const contactEmail = 'redwater@gmail.com';

export const upcomingShows = [
  { date: 'Mar 8', venue: 'Neumos', location: 'Seattle, WA' },
  { date: 'Mar 22', venue: 'The Crocodile', location: 'Seattle, WA' },
  { date: 'Apr 12', venue: 'El Corazon', location: 'Seattle, WA' },
  { date: 'Apr 26', venue: 'Tractor Tavern', location: 'Seattle, WA' },
  { date: 'May 10', venue: 'Sunset Tavern', location: 'Seattle, WA' },
  { date: 'May 24', venue: 'Barboza', location: 'Seattle, WA' },
];

// Merch items: key = filename in public/merch (e.g. 'tshirt.png'), value = { name, description, price }
export const merchDetails = {
  'tshirt.png': {
    name: 'Red Water T-Shirt',
    description: 'Black tee with REDWATER logo and band-in-van graphic. White & light blue design.',
    price: 25,
  },
};
