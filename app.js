'use strict';



// API KEY from Giphy
const API_KEY = '47SoFht1UKvCbTBankcrDzcTocRDu5Xr';
const BASE_URL = 'https://api.giphy.com/v1/gifs/search';


/** Given a giphy gif url, set the src of an img tag and appends to dom */
function updateDOM(giphyData) {
  const imageLink = giphyData.data[0].images.original.url;
  $('.gifs').append(`<img src = ${imageLink}>`);
}

/** When invoked, takes in a search parameter
 *  calls the giphy API and returns the URL for the gif */
async function getGiphyData(searchTerm) {

  const parameters = { params: { api_key: API_KEY, q: searchTerm, limit: 1 } };

  const response = await axios.get(BASE_URL, parameters);

  return response.data;

}
/** handles clicks on both form buttons */
async function formClickHandler(e) {
  e.preventDefault();

  if (e.target.id === "submit") {
    const searchTerm = $('input').val();
    const data = await getGiphyData(searchTerm);
    updateDOM(data);
  }
  if (e.target.id === "delete") {
    $('.gifs').html('');
  }
}

/**form event listener for both buttons */

$('form').on('click', formClickHandler);
