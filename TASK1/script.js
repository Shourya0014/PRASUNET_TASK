function toggleSearch(){
const search = document.querySelector('.search');
search.classList.toggle('active');
}

// TOGGLE 3D EFFECT
function toggleFlip(){
    const imgBox = document.querySelector('.imgBox');
    const btn = document.querySelector('.btn');
    imgBox.classList.toggle('active');
    btn.classList.toggle('active');
    
}

// Swap the main image
function changeImg(img){
    const foodImg = document.querySelector('.food-img');
    foodImg.src = `../Photos/${img}`;
}

// add the JS code to the end of your script.js file
// toggle menu
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const navMobile = document.querySelector('.nav-mobile');
    menu.classList.toggle('active');
    navMobile.classList.toggle('active');
  }