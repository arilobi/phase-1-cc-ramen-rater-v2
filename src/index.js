// Fetch all ramen data from the server (db.json) and display it in the menu
function displayRamens() {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(data => {
      data.ramens.forEach((ramen, index) => {
        renderRamenMenuItem(ramen);

        // If it's the first ramen, display its details on load
        if (index === 0) {
          displayRamenDetails(ramen);
        }
      });
    })
    .catch(error => console.error('Error fetching ramen data:', error));
}

// Render ramen image in the #ramen-menu
function renderRamenMenuItem(ramen) {
  const ramenMenu = document.getElementById('ramen-menu');
  const ramenImg = document.createElement('img');

  ramenImg.src = ramen.image;
  ramenImg.alt = ramen.name;

  // Add event listener to display ramen details when clicked
  ramenImg.addEventListener('click', () => handleClick(ramen));

  ramenMenu.appendChild(ramenImg);
}

// Handle ramen click to display details in #ramen-detail
function handleClick(ramen) {
  displayRamenDetails(ramen);
}

// Display ramen details in the #ramen-detail div
function displayRamenDetails(ramen) {
  const ramenDetailImage = document.querySelector('.detail-image');
  const ramenName = document.querySelector('.name');
  const ramenRestaurant = document.querySelector('.restaurant');
  const ramenRating = document.getElementById('rating-display');
  const ramenComment = document.getElementById('comment-display');

  ramenDetailImage.src = ramen.image;
  ramenDetailImage.alt = ramen.name;
  ramenName.textContent = ramen.name;
  ramenRestaurant.textContent = ramen.restaurant;
  ramenRating.textContent = ramen.rating;
  ramenComment.textContent = ramen.comment;

  // Pre-fill the edit form with the current ramen details
  document.getElementById('new-rating').value = ramen.rating;
  document.getElementById('new-comment').value = ramen.comment;

  // Attach an update listener for editing ramen details
  const editForm = document.getElementById('edit-ramen');
  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    updateRamenDetails(ramen);
  });

  // Add delete listener for the selected ramen
  const deleteButton = document.getElementById('delete-button');
  deleteButton.addEventListener('click', () => deleteRamen(ramen));
}

// Update the displayed ramen's rating and comment
function updateRamenDetails(ramen) {
  const newRating = document.getElementById('new-rating').value;
  const newComment = document.getElementById('new-comment').value;

  // Update the ramen details on the frontend
  ramen.rating = newRating;
  ramen.comment = newComment;
  document.getElementById('rating-display').textContent = newRating;
  document.getElementById('comment-display').textContent = newComment;
}

// Add a listener for the "Add New Ramen" form submission
function addSubmitListener() {
  const newRamenForm = document.getElementById('new-ramen');

  newRamenForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRamen = {
      name: document.getElementById('new-name').value,
      restaurant: document.getElementById('new-restaurant').value,
      image: document.getElementById('new-image').value,
      rating: document.getElementById('new-rating').value,
      comment: document.getElementById('new-comment').value,
    };

    // Add the new ramen to the #ramen-menu
    renderRamenMenuItem(newRamen);

    // Reset the form after submission
    newRamenForm.reset();
  });
}

// Remove a ramen from the DOM
function deleteRamen(ramen) {
  const ramenMenu = document.getElementById('ramen-menu');
  const ramenImgs = ramenMenu.getElementsByTagName('img');

  // Find the ramen image in the menu and remove it
  for (let img of ramenImgs) {
    if (img.alt === ramen.name) {
      ramenMenu.removeChild(img);
      break;
    }
  }

  // Clear ramen details from the detail section
  const ramenDetailImage = document.querySelector('.detail-image');
  ramenDetailImage.src = './assets/image-placeholder.jpg';
  document.querySelector('.name').textContent = 'Insert Name Here';
  document.querySelector('.restaurant').textContent = 'Insert Restaurant Here';
  document.getElementById('rating-display').textContent = 'Insert rating here';
  document.getElementById('comment-display').textContent = 'Insert comment here';
}

// Initialize the app by calling displayRamens and addSubmitListener after the DOM loads
function main() {
  document.addEventListener('DOMContentLoaded', () => {
    displayRamens(); // Display all ramens on load
    addSubmitListener(); // Add new ramen submit listener
  });
}

// Call main() to start the program
main();

