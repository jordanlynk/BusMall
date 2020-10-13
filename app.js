/* eslint-disable no-unused-vars */
'use strict';

var allProducts = [];
var imageOneElement = document.getElementById('image1');
var imageTwoElement = document.getElementById('image2');
var imageThreeElement = document.getElementById('image3');
var imageContainer = document.getElementById('image-container');
var recentRandomNumbers = [];
var totalOfRounds = 25;
var roundsTaken = 0;
var btn = document.createElement('BUTTON');

function ProductImages(filepath, productName) {
  this.filepath = filepath;
  this.name = productName;
  this.votes = 0;
  this.thisRoundOptions = [];
  this.totalOfViews = 0;

  allProducts.push(this);
}
// I'm going to create instances of each image product here
new ProductImages('img/bag.jpg', 'bag');
new ProductImages('img/banana.jpg', 'banana');
new ProductImages('img/bathroom.jpg', 'bathroom');
new ProductImages('img/boots.jpg', 'boots');
new ProductImages('img/breakfast.jpg', 'breakfast');
new ProductImages('img/bubblegum.jpg', 'bubblegum');
new ProductImages('img/chair.jpg', 'chair');
new ProductImages('img/cthulhu.jpg', 'cthulhu');
new ProductImages('img/dog-duck.jpg', 'dog-duck');
new ProductImages('img/dragon.jpg', 'dragon');
new ProductImages('img/pen.jpg', 'pen');
new ProductImages('img/pet-sweep.jpg', 'pet-sweep');
new ProductImages('img/scissors.jpg', 'scissors');
new ProductImages('img/shark.jpg', 'shark');
new ProductImages('img/sweep.jpg', 'sweep');
new ProductImages('img/tauntaun.jpg', 'tauntaun');
new ProductImages('img/unicorn.jpg', 'unicorn');
new ProductImages('img/usb.gif', 'usb');
new ProductImages('img/water-can.jpg', 'water-can');
new ProductImages('img/wine-glass.jpg', 'wine-glass');

// this will be the random number generator function
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function renderProducts(imageElement) {
  var randomIndex = getRandomNumber(0, allProducts.length - 1);

  while (recentRandomNumbers.includes(randomIndex)) {
    randomIndex = getRandomNumber(0, allProducts.length - 1);
  }
  imageElement.src = allProducts[randomIndex].filepath;
  imageElement.alt = allProducts[randomIndex].name;
  imageElement.title = allProducts[randomIndex].name;
  allProducts[randomIndex].numberOfViews++;
  allProducts[randomIndex].thisRoundOptions.push(allProducts[randomIndex]);
  recentRandomNumbers = [];
  recentRandomNumbers.push(randomIndex);
}
// adding in an event listener so that when a user clicks on product image, it will be tracked in the form of votes and then proceed to render 3 new random products.
imageContainer.addEventListener('click', handleClick);
function handleClick(event) {
  event.preventDefault();
  var chosenProduct = event.target.title;
  for (var i = 0; i < allProducts.length; i++) {
    if (chosenProduct === allProducts[i].name) {
      allProducts[i].votes++;
    }
  }
  renderProducts(imageOneElement);
  renderProducts(imageTwoElement);
  renderProducts(imageThreeElement);
  roundsTaken++;
  limitNumberOfTurns();  
}
// need to take away event listener after the 25th time
function limitNumberOfTurns() {
  if (roundsTaken === totalOfRounds) {
    imageContainer.removeEventListener('click', handleClick);
    renderResultsButton();
  }
}
function renderResultsButton() {
  btn.innerHTML = 'View Results';
  document.body.appendChild(btn);
}
btn.addEventListener('click', resultClick);
function resultClick(event) {
  var ulElement = document.getElementById('resultsList');
  for (var i = 0; i < allProducts.length; i++) {
    var liElement = document.createElement('li');
    liElement.textContent = `${allProducts[i].name} had ${allProducts[i].votes} votes, and was seen ${allProducts[i].numberOfViews} times.`;
    ulElement.appendChild(liElement);
  }
}


renderProducts(imageOneElement);
renderProducts(imageTwoElement);
renderProducts(imageThreeElement);