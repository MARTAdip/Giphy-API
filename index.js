'use-strict';

const gifSearch = document.querySelector('.gif-search-container');
const gifSearchTerm = document.querySelector('.gif-search-term');
const gifOutput = document.querySelector('.gifs-output');
const results = document.querySelector('.results');
const apiKey = '1caQBCCly08w0vinpWmp1AK5ep8o6gsj';
const gifTrending = document.querySelector('.trending-gif');
const resultsTrending = document.getElementById('resultsTrending');
const trendingGifsOutput = document.querySelector('.trending-gifs-output');

const element = document.getElementById('template');

let loading = document.querySelector('.loading');
let searchTerm = false;
let output = '';

    
trendingGifsOutput.innerHTML = ''; 
output = '';
resultsTrending.style.display = 'block';


function appIsReadyToLoad(){
    loading.classList.add('hide-loading')
}

document.getElementById('form').addEventListener('submit', (e) => {
    loading.classList.remove('hide-loading') 

    e.preventDefault();
    searchTerm = e.target.elements['search'].value
    fetchTrendingGifs(searchTerm)
})

function fetchTrendingGifs(searchTerm) {
    let url = !searchTerm ? 'trending?' : `search?q=${searchTerm}&`
    
    fetch(`http://api.giphy.com/v1/gifs/${url}api_key=${apiKey}&limit=30`)
        .then(response => response.json())
        .then(resultsData => {

            const gifs = resultsData.data;

            results.style.display = 'none';
            output = '';

            if (gifs.length > 0) {
                let card = document.createElement('div');

                gifs.map(gif => {
                    let clone = element.cloneNode(true);
                    clone.removeAttribute("id");
                    clone.classList.remove("d-none");

                    clone.querySelector('a').href = gif.images.original.url ;
                    clone.querySelector('img').src = gif.images.fixed_width_downsampled.url;
                        
                    card.appendChild(clone);
                    })
                   
                    gifOutput.innerHTML = card.innerHTML;
                    
            } else {
                gifOutput.innerHTML = '<p> No GIFs Found sorry. Try with another word..</p>';
            }
            appIsReadyToLoad() 
        })
        .catch(err => {
            gifOutput.innerHTML = `<p> Error: ${err.message} </p>`;
       });
   
}
fetchTrendingGifs();

   

  
