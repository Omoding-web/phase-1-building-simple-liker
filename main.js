// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Waiting for the DOM to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', async () => {
  // Selecting the error modal and all like buttons
  const errorModal = document.querySelector('#modal');
  const likeButtons = document.querySelectorAll('.like-glyph');

  // Add hidden class to error modal initially
  errorModal.classList.add('hidden');
 // Hide the modal after 3 seconds
 setTimeout(() => {
  errorModal.classList.add('hidden');
}, 3000);
     // Call the async function using 'await'
     await waitForDOMContentLoaded();
});
  // Attach click event listeners to all like buttons
  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', () => {
      // Simulate server request using the mimicServerCall function
      mimicServerCall()
        .then(() => {
          // Server returns success: toggle class and update text content based on class
          likeButton.classList.toggle('activated-heart');
          likeButton.textContent = likeButton.classList.contains('activated-heart') ? FULL_HEART : EMPTY_HEART;
        })
        .catch(async () => {
          // Server returns failure: display error modal and set error message
          errorModal.classList.remove('hidden');
          const errorMessage = document.querySelector('#modal-message');
          errorMessage.textContent = 'Something went wrong with the server!';

         
    });
  });

//   // Check if the modal has the 'hidden' class
 expect(errorModal.classList.contains('hidden')).toBe(true);
});
          // Wrap the test in an async function to use 'await'
          async function waitForDOMContentLoaded() {
            return new Promise((resolve) => {
              if (document.readyState === 'complete') {
                resolve();
              } else {
                document.addEventListener('DOMContentLoaded', resolve);
              }
           
            });
          }

// Simulate a server call with a random chance of failure
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}