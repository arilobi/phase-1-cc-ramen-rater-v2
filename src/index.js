// Function to fetch all ramens and display them in the #ramen-menu
function displayRamens() {
  fetch('http://localhost:3000/ramens')  // Replace with actual API endpoint
    .then(response => response.json())
    .then(ramens => {
      const ramenMenuDiv = document.getElementById('ramen-menu');

      // For each ramen, an image is created and added and the click listener enables for the user to click and show the ramen details.

      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen)); // Add click listener to each ramen image
        ramenMenuDiv.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching ramen data:', error));
}

// The function enables that the user sees the image, name, restaurant, rating and comment when clicked.
function handleClick(ramen) {

  const detailImage = document.querySelector('.detail-image');
  const nameElement = document.querySelector('.name');
  const restaurantElement = document.querySelector('.restaurant');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');

  detailImage.src = ramen.image;
  nameElement.textContent = ramen.name;
  restaurantElement.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
}

// This function enables a user to add a new ramen to the menu
function addSubmitListener() {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', function (event) {
    // Prevent form submission refresh
    event.preventDefault(); 

    const newName = document.getElementById('new-name').value;
    const newRestaurant = document.getElementById('new-restaurant').value;
    const newImage = document.getElementById('new-image').value;
    const newRating = document.getElementById('new-rating').value;
    const newComment = document.getElementById('new-comment').value;

    // Creating a new ramen object
    const newRamen = {
      name: newName,
      restaurant: newRestaurant,
      image: newImage,
      rating: newRating,
      comment: newComment
    };

    addRamenToMenu(newRamen);

    // To clear the form after submission
    form.reset();
  });
}

// Function to append a new ramen
function addRamenToMenu(ramen) {
  const ramenMenuDiv = document.getElementById('ramen-menu');
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener('click', () => handleClick(ramen)); 
  ramenMenuDiv.appendChild(img);
}

// Main function
function main() {
  displayRamens();
  addSubmitListener();
}

document.addEventListener('DOMContentLoaded', main);
