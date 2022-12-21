const myNavBar = document.querySelector('#navbar__list');
const mySections = document.querySelectorAll('section');
const fragment = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// build the nav
function addSection() {
    

    mySections.forEach((mySection) => {
        let myList = document.createElement('li');
        let aTag = document.createElement('a');
        aTag.innerText = mySection.getAttribute('data-nav');
        aTag.setAttribute('class', 'menu__link');

        // scroll to anchor ID using scroll to event
        aTag.addEventListener("click", () => {
            mySection.scrollIntoView({behavior: "smooth"});
            });
        myList.appendChild(aTag);
        fragment.appendChild(myList);
    });
    myNavBar.appendChild(fragment);
};

// determine if the section in viewport 
function sectionInViewPort() {
    let minor = window.innerHeight;
    visibleSectionIndex = -1;

    mySections.forEach((mySection, index) => {
        let myView = mySection.getBoundingClientRect();
        if(Math.abs(myView.top) < minor){
            minor = Math.abs(myView.top);
            visibleSectionIndex = index;
        }
    });
    return visibleSectionIndex;
}

function setActiveSection(){
    visibleSectionIndex = sectionInViewPort();

    // If visibleSection exists
    if(visibleSectionIndex != -1){
        // create a list of Atags from navigation menu
        let myMenu = document.querySelectorAll('.menu__link');

        // Loop through all section
        for (let i = 0; i < mySections.length; i++) {
            // For section in viewport: Add active state to the section and navigation
            if (i == visibleSectionIndex){
                mySections[i].classList.add('your-active-class');
                myMenu[i].classList.add('your-active-class');
            }
            // For other sections: Remove active state from the section and navigation
            else{
                mySections[i].classList.remove('your-active-class');
                myMenu[i].classList.remove('your-active-class');
            }
        }; 
    };
}

// Build navigation menu
addSection();

// Set sections as active (highlight section and nav if section is in viewport)
document.addEventListener('scroll', setActiveSection);