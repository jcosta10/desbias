

/*scoll*/

const spaceHolder = document.querySelector('.space-holder');
const horizontal = document.querySelector('.horizontal');
spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;

function calcDynamicHeight(ref) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const objectWidth = ref.scrollWidth;
  return objectWidth - vw + vh + 150; // 150 is the padding (in pixels) desired on the right side of the .cards container. This can be set to whatever your styles dictate
}

window.addEventListener('scroll', () => {
  const sticky = document.querySelector('.sticky');
  horizontal.style.transform = `translateX(-${sticky.offsetTop}px)`;
});

window.addEventListener('resize', () => {
  spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;
});





// config parameter, how many milliseconds to wait between each slide
const SLIDE_TIMEOUT = 3000;

// variables to keep the current state 
let current = 0;
let timeout = null;

// transition function, change document to state NEXT and if FOLLOW is true, set the timeout to the next slide
function next_state (next, follow) {
  let container = document.querySelector(".container-1");
  container.children[current].className = "";
  container.children[next].className = "active";

  current = next;
  let nextnext = next + 1;
  if (nextnext >= container.children.length) {
    nextnext = 0;
  }
  
  if (follow) {
    timeout = window.setTimeout (function() {
      next_state(nextnext, follow);
    }, SLIDE_TIMEOUT);
  }
}

// start the slideshow animation
timeout = window.setTimeout (function() {
  next_state (current + 1, true);
}, SLIDE_TIMEOUT);

// if the document is clicked, stop the slideshow and go back to the beginning
document.addEventListener("click", function() {
  window.clearTimeout(timeout);
  next_state (0, false);
});

/*Image*/