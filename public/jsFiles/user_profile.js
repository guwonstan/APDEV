// copied from MCO Phase 1 (to be modified)


function editProfile() {
  sessionStorage.setItem('bioContent', document.getElementsByClassName('profile_bio').textContent);
  window.location.href = "../UnregisteredViews/Edit_Profile_Guwonie.html";
}

function editReview() {
  const title = document.querySelector('.review_title');
  const body = document.querySelector('.review_body');

  document.getElementById('star1').remove();
  document.getElementById('star2').remove();
  document.getElementById('star3').remove();
  document.getElementById('star4').remove();
  document.getElementById('star5').remove();

  

  const titleInput = document.createElement('input');
  titleInput.value = title.textContent;
  const bodyInput = document.createElement('textarea');
  bodyInput.innerText = body.textContent;

  const newStar1 = document.createElement('div');
  newStar1.classList.add('star_lit');
  newStar1.id = 'star1';
  newStar1.innerHTML = '&#9733;';
  newStar1.onclick = function() { toggleStar(newStar1); };
  const newStar2 = document.createElement('div');
  newStar2.classList.add('star_lit');
  newStar2.id = 'star2';
  newStar2.innerHTML = '&#9733;';
  newStar2.onclick = function() { toggleStar(newStar2); };
  const newStar3 = document.createElement('div');
  newStar3.classList.add('star_lit');
  newStar3.id = 'star3';
  newStar3.innerHTML = '&#9733;';
  newStar3.onclick = function() { toggleStar(newStar3); };
  const newStar4 = document.createElement('div');
  newStar4.classList.add('star_lit');
  newStar4.id = 'star4';
  newStar4.innerHTML = '&#9733;';
  newStar4.onclick = function() { toggleStar(newStar4); };
  const newStar5 = document.createElement('div');
  newStar5.classList.add('star_lit');
  newStar5.id = 'star5';
  newStar5.innerHTML = '&#9733;';
  newStar5.onclick = function() { toggleStar(newStar5); };
  const ratingDiv = document.querySelector('.rating');
  ratingDiv.appendChild(newStar1);
  ratingDiv.appendChild(newStar2);
  ratingDiv.appendChild(newStar3);
  ratingDiv.appendChild(newStar4);
  ratingDiv.appendChild(newStar5);

  title.innerHTML = '';
  title.appendChild(titleInput);
  body.innerHTML = '';
  body.appendChild(bodyInput);
  

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.addEventListener('click', function() {
      title.textContent = titleInput.value;
      body.textContent = bodyInput.value;
      document.getElementById('star1').remove();
      document.getElementById('star2').remove();
      document.getElementById('star3').remove();
      document.getElementById('star4').remove();
      document.getElementById('star5').remove();
      newStar1.onclick = null;
      newStar2.onclick = null;
      newStar3.onclick = null;
      newStar4.onclick = null;
      newStar5.onclick = null;
      ratingDiv.appendChild(newStar1);
      ratingDiv.appendChild(newStar2);
      ratingDiv.appendChild(newStar3);
      ratingDiv.appendChild(newStar4);
      ratingDiv.appendChild(newStar5);

  });
  body.appendChild(saveButton);
  
}

function toggleStar(star) {
  const stars = star.parentElement.children; // Get all siblings of the clicked star
  let clicked = false; // Flag to check if the clicked star is encountered

  // Loop through all siblings (preceding stars)
  for (const sibling of stars) {
      if (sibling === star) {
          clicked = true; // Set flag to true when the clicked star is encountered
      }

      // Set classes accordingly
      if (!clicked) {
          sibling.classList.remove('star_dim');
          sibling.classList.add('star_lit');
      } else if (sibling === star) {
          sibling.classList.remove('star_dim');
          sibling.classList.add('star_lit');
      } else {
          sibling.classList.remove('star_lit');
          sibling.classList.add('star_dim');
      }
  }
}

function deleteReview(button) {
  const reviewContainer = button.closest('.profile_review');
  if (reviewContainer) {
      const confirmDelete = confirm("Are you sure you want to delete this review?");
      if (confirmDelete) {
          //delete request
          alert("Review deleted successfully.");
      } else {
          alert("Review deletion canceled.");
      }
  }
}

