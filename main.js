import reddit from './redditapi';


const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');


// Form event listenr
searchForm.addEventListener('submit', e =>{
  //Get search Term
  const searchTerm = searchInput.value;

  // Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;


  const searchLimit = document.getElementById('limit').value;
  console.log(searchLimit);

  // Check input
  if(searchTerm === ''){
      // Show message
      showMessage("please add a search term",'alert-danger')
  }
    // to clear the input
    searchInput.value = ''

    //search
    reddit.search(searchTerm.searchLimit,sortBy)
    .then(results =>{
        console.log(results);
        
        let output = '<div class="card-columns">';
// Check for image
    
        // Loop through posts
        results.forEach(post =>{

            let image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
         output += `
         <div class="card">
    <img class="card-img-top" src="${image}" alt="Card image cap">
    <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${truncateText(post.selftext,100)}</p>
    <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
     </div>
     </div>
         `
        })

        output +='';
        document.getElementById('results').innerHTML = output;
    })
   

  
    e.preventDefault();
})

function showMessage(message,className){
    // create div
  const div = document.createElement('div');
 // add Claesses
  div.className = `alert ${className}`;
 // add text
  div.appendChild(document.createTextNode(message));
 // get parent
  const searchContainer = document.getElementById('search-container');

  //Get Search
  const search = document.getElementById('search');

  // Insert message
  searchContainer.insertBefore(div,search);
  // Timeout alert
  setTimeout(() =>{
      document.querySelector('.alert').remove()
  },3000);
}

function truncateText(text,limit){
    const shortened = text.indexOf('',limit);

    if(shortened == -1) return text;
    return text.substring(0, shortened);
}

