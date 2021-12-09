const axios = require('axios');
const cheerio = require('cheerio');

const scrapShoppingSites = async query => {
  const jumiaUrl = `https://www.jumia.co.ke/catalog/?${query && 'q=' + query}`;
  const pigiameUrl = `https://www.pigiame.co.ke/classifieds?${
    query && 'q=' + query
  }`;
  const products = [];

  // Scraping jumia.co.ke
  await axios(jumiaUrl)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);

      console.log('scrapping ', jumiaUrl, ' >>> ');

      $('.core', html).each(function () {
        const id = $(this).attr('data-id') || Math.random() * 1000;
        const title = $(this).attr('data-name') || 'null';
        const description = $(this).attr('data-name') || 'null';
        const price = $(this).attr('data-price') || 'null';
        const region = $(this).attr('data-description') || 'Kenya';
        const imageURL = $(this).find('img').attr('data-src') || 'null';

        id &&
          products.push({
            id,
            title,
            description,
            price,
            region,
            imageURL,
            site: 'Jumia',
          });
      });

      console.log('done scrapping ', jumiaUrl, ' <<< ');
    })
    .catch(err => console.log(err));

  //Scraping pigiame.co.ke
  await axios(pigiameUrl)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);

      console.log('scrapping ', pigiameUrl, ' >>> ');

      $('.listing-card__inner', html).each(function () {
        const id = $(this).attr('data-t-listing_id') || Math.random() * 1000;
        const title = $(this).attr('data-t-listing_title') || 'null';
        const description = $(this).attr('data-t-listing_title') || 'null';
        const price = $(this).attr('data-t-listing_price') || 'null';
        const region = $(this).attr('data-t-listing_location_title') || 'Kenya';
        const imageURL = $(this).find('img').attr('src') || 'null';

        id &&
          products.push({
            id,
            title,
            description,
            price,
            region,
            imageURL,
            site: 'Pigiame',
          });
      });

      console.log('done scrapping ', pigiameUrl, ' <<< ');
    })
    .catch(err => console.log(err));

  return products;
};

module.exports = scrapShoppingSites;
