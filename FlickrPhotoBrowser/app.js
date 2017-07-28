(function() { //IIFE - immediately invoked function expression
  
  var FLICKR_API_KEY = '8284bf026642da8da2022909704338cb';
  var FLICKR_API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api+key='
  
  function getPhotosForSearch(searchTerms) {
    //ES6 template string - to collect our variables together into the url we'll use to ask the API for data
    var url = `${FLICKR_API_URL}${FLICKR_API_KEY}&text=${searchTerms}&safe_search=1`;
    return(fetch(url)
        .then(function(response) { 
            return response.json(); 
        })
        .then(function(data) { 
            return data.photos.photo 
        })
  )}

  function createFlickrThumb(photoData) {
    var thumbnail = `https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}_q.jpg`;
    var large = `https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`;
    var title = `${photoData.title}`
    
    
    var link = document.createElement('a'); //create a new link
    link.setAttribute('href', large); //set the link's href attribute. so we have the large photo; it exists as a link to the larger image. it doesn't appear on our page.
    link.setAttribute('target', '_blank'); // set the links target attribute. this will open link in a new tab
  
    var image = document.createElement('img'); //now we have the link, we are going to create the img 
    image.setAttribute('src', thumbnail); //set the img's source attribute
    image.setAttribute('alt', title); //set the img alt attribute (for screen readers or if the img cant load for some reason)
  
    link.appendChild(image); //add the image to the link
    // the function createFlickrThumb actually returns an anchor with a image inside that would look like this:
    // <a href="URL OF THE LARGE IMAGE" target="_blank">
    //   <img src="URL OF THE THUMBNAIL" alt="TITLE OF THE IMAGE">
    // </a>
  
    return link; //now we can disply the link, which "contains" an image - when I click on the image, I'l go to a new tab with the larger image
  }
  
  //set variables from our HTML for the event listener to understand
  //just like with the weather app
  var app = document.querySelector('#app');
  var searchForm = app.querySelector('.search-form');
  var searchInput = searchForm.querySelector('.search-input');
  var flickrPhotos = app.querySelector('.flickr-photos');
  
  //event listener - this is where everything comes together
  searchForm.addEventListener('submit', function(event) { 
    event.preventDefault(); 
    getPhotosForSearch(searchInput.value) //takes our search terms, using them to call the first function we create
      .then(photos => { //takes the array that we get back
        photos.forEach(photo => //for each photo in the array
          flickrPhotos.appendChild(createFlickrThumb(photo)) //create a new thumbnail and add it to the gallery by calling the create function
        )
      })
  })
  getPhotosForSearch()
  //page loader
  
  var overlay = document.getElementById("overlay");
  
  window.addEventListener('load', function () {
    overlay.style.display = 'none';
  });
} ()) //end of IIFE