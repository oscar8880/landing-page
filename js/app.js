/****************** Function calls *********************/

// Build navbar and set navigation links immediately at <script> tag in HTML
buildNavbar();
setNavLinks();

// Reset navigation links when the user resizes the window
window.onresize = function () {
  setNavLinks();
}

// Check if nav should be sticky and show the actively viewed section when
// the user scrolls
window.onscroll = function() {
  stickyNav()
  showActiveSection();
};




/****************** Function Declarations *********************/

/*
*
  FUNCTION: buildNavbar()
  DESC: Builds navigation menu by adding li's to the navbar list
*
*/

function buildNavbar() {
  const navList = document.querySelector('nav').firstElementChild;
  const sections = document.querySelectorAll('section');
  let i = 1;
  
  for(section of sections) {
    let id = section.id;
    let sectionTitle = section.dataset.sectionTitle;

    //Create li and give it a unique id
    const navItem = document.createElement('li');
    navItem.setAttribute('id', `nav${i}`);
    i++;
  
    // Create anchor to link to appropriate section on page
    const anchor = document.createElement('a');

    // Set anchor text
    anchor.textContent = sectionTitle;

    // Remove <a> default functionality in href
    anchor.removeAttribute("href");
  
    //Append the anchor to the li and append the li to the ul
    navItem.appendChild(anchor);
    navList.appendChild(navItem);
  }
}

/*
*
  FUNCTION: setNavLinks()
  DESC: Adds click event listener to navigation anchors. The listener
   scrolls to the relevant section.
*
*/

function setNavLinks() {
  // Get all section elements
  const sections = document.querySelectorAll('section');

  // Get all navigation anchor elements
  const navAnchorList = document.querySelectorAll('nav ul li a');

  // Get yOffset of each section to scroll to
  let yOffsets= [];
  sections.forEach( section => yOffsets.push(section.offsetTop));

  // Adjust yOffsets to take into account navbar height
  const navbarHeight = document.querySelector('nav').clientHeight;
  yOffsets = yOffsets.map((offset)=> offset - navbarHeight);

  for(let i = 0; i < navAnchorList.length; i++) {
    let y = yOffsets[i];
    navAnchorList[i].addEventListener("click", () => {
      scrollTo(0, y);
    })
  }
}

/*
*
  FUNCTION: stickyNav()
  DESC: Makes the Navbar fixed once the user has scrolled beyond
   a set point.
*
*/

// Get Y offset of navbar - this will be the point that the  navbar becomes sticky
const navbar = document.querySelector('nav');
const sticky = navbar.offsetTop;

function stickyNav() {

  // If the user is scrolled beyond the top of the navbar then
  // make it sticky, else remove stickiness
  if(window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}


/*
*
  FUNCTION: showActiveSection()
  DESC: Calculates which section of the page is currently being viewed
   based on Y offset of sections and current scroll height. Adds an 
   'active' class to the navigation link of the section which is 
   currently being viewed.
*
*/

function showActiveSection() {

  // Get all section elements
  const sections = document.querySelectorAll('section');

  // Get yOffset of each section to measure current scroll height against
  let yOffsets= [];
  sections.forEach( section => yOffsets.push(section.offsetTop));

  // Adjust yOffsets to take into account navbar height
  const navbarHeight = document.querySelector('nav').clientHeight;
  yOffsets = yOffsets.map((offset)=> offset - navbarHeight - 100);

  // Get id attribute of each section
  let sectionIds = [];
  sections.forEach( section => sectionIds.push(section.id));

  // Get current scroll height
  let y = window.scrollY;

  // Initialise variable to track the section which is in view
  let activeSectionIndex = 0;

  //Determine which section is in view based on scroll height
  for(let i = 0; i <= yOffsets.length; i++) {
    if(y < yOffsets[i]) {
      activeSectionIndex = i;
      break;
    } else {
      activeSectionIndex = yOffsets.length;
    }
  }
  
  //Make the section active in navbar and inactive all others
  for(let i = 1; i <= sectionIds.length; i++) {
    let navItem = document.getElementById(`nav${i}`);
    navItem.classList.remove('active');
  }
  if(activeSectionIndex > 0) {
    let navToActivate = document.getElementById(`nav${activeSectionIndex}`);
    navToActivate.classList.add('active');
  }
}