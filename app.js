var allProducts = [];
var imageOneElement = document.getElementById('image-one');
var imageTwoElement = document.getElementById('image-two');
var imageThreeElement = document.getElementById('image-three');
var imageContainer = document.getElementById('image-container');
var recentRandomNumbers = [];
var numberOfRounds = 25;
var roundsTaken = 0;
var votesArray = [];
var productNamesArray = [];
var viewsArray = [];

// this will be my constructor function that will create product object instances
function Product(filepath, productName, votes = 0, numberOfViews = 0) {
  this.filepath = filepath;
  this.name = productName;
  this.votes = votes;
  this.numberOfViews = numberOfViews;

  allProducts.push(this);
  productNamesArray.push(this.name);
}

// Random Number Generator
function getRandomNumber(min, max) {

  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Get a random index between 0 and the length of all Products array, and then render those to the page
function renderProducts(imageElement) {
  var randomIndex = getRandomNumber(0, allProducts.length - 1);

  while (recentRandomNumbers.includes(randomIndex)) {
    randomIndex = getRandomNumber(0, allProducts.length - 1);
  }
  if (recentRandomNumbers.length > 5) {
    recentRandomNumbers.shift();
  }

  imageElement.src = allProducts[randomIndex].filepath;
  console.log('allProducts', allProducts);
  imageElement.alt = allProducts[randomIndex].name;
  console.log('singleProduct', allProducts[randomIndex]);
  imageElement.title = allProducts[randomIndex].name;
  allProducts[randomIndex].numberOfViews++;
  // allProducts.push(allProducts[randomIndex]); did not need this, as it was pushing mulitples.

  recentRandomNumbers.push(randomIndex);

}

imageContainer.addEventListener('click', handleClick);
function handleClick(event) {
  event.preventDefault();
  var itemsMadeJson = JSON.stringify(allProducts);
  localStorage.setItem('itemsFromLocalStorage', itemsMadeJson);
  
  if (roundsTaken !== 25){
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
  }
  else {
    limitNumberOfTurns();
  }
}
if (!localStorage.getItem('itemsFromLocalStorage')){
  new Product('img/bag.jpg', 'bag');
  new Product('img/banana.jpg', 'banana');
  new Product('img/bathroom.jpg', 'bathroom');
  new Product('img/boots.jpg', 'boots');
  new Product('img/breakfast.jpg', 'breakfast');
  new Product('img/bubblegum.jpg', 'bubblegum');
  new Product('img/chair.jpg', 'chair');
  new Product('img/cthulhu.jpg', 'cthulhu');
  new Product('img/dog-duck.jpg', 'dog-duck');
  new Product('img/dragon.jpg', 'dragon');
  new Product('img/pen.jpg', 'pen');
  new Product('img/pet-sweep.jpg', 'pet-sweep');
  new Product('img/scissors.jpg', 'scissors');
  new Product('img/shark.jpg', 'shark');
  new Product('img/sweep.jpg', 'sweep');
  new Product('img/tauntaun.jpg', 'tauntaun');
  new Product('img/unicorn.jpg', 'unicorn');
  new Product('img/usb.gif', 'usb');
  new Product('img/water-can.jpg', 'water-can');
  new Product('img/wine-glass.jpg', 'wine-glass');
} else {
  var itemsFromLocalAsString = localStorage.getItem('itemsFromLocalStorage');
  var itemsFromLocalAsArray = JSON.parse(itemsFromLocalAsString);

  for (var i = 0; i < itemsFromLocalAsArray.length; i++) {
    var reNameFilePath = itemsFromLocalAsArray[i].filepath;
    var reNameProduct = itemsFromLocalAsArray[i].productName;    
    var reNameVotes = itemsFromLocalAsArray[i].votes;
    var reNameViews = itemsFromLocalAsArray[i].numberOfViews;
    new Product(reNameFilePath, reNameProduct, reNameVotes, reNameViews);
  }
}


//removes the event listener after the 25th vote
function limitNumberOfTurns() {
  if (roundsTaken === numberOfRounds) {
    imageContainer.removeEventListener('click', handleClick);
    // renderResultsButton();
    makeVotesArrayForChart();
  }
}

function makeVotesArrayForChart() {
  for (var i = 0; i < allProducts.length; i++) {
    votesArray.push(allProducts[i].votes);
    viewsArray.push(allProducts[i].numberOfViews);
  }
}
var button = document.getElementById('disp-results')
button.addEventListener('click', resultClick);
function resultClick(event) {
  
  makeVotesChart();

}


renderProducts(imageOneElement);
renderProducts(imageTwoElement);
renderProducts(imageThreeElement);


function makeVotesChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNamesArray,
      datasets: [{
        label: 'Product Total Votes',
        data: votesArray,
        backgroundColor: [
         'rgba(1, 249, 195, 1)',
         'rgba(249, 1, 1, 1)',
         'rgba(1, 71, 249, 1)',
         'rgba(129, 249, 1, 1)',
         'rgba(187, 1, 249, 1)',
         'rgba(1, 249, 195, 1)',
         'rgba(249, 1, 1, 1)',
         'rgba(1, 71, 249, 1)',
         'rgba(129, 249, 1, 1)',
         'rgba(187, 1, 249, 1)',
         'rgba(1, 249, 195, 1)',
         'rgba(249, 1, 1, 1)',
         'rgba(1, 71, 249, 1)',
         'rgba(129, 249, 1, 1)',
         'rgba(187, 1, 249, 1)',
         'rgba(1, 249, 195, 1)',
         'rgba(249, 1, 1, 1)',
         'rgba(1, 71, 249, 1)',
         'rgba(129, 249, 1, 1)',
         'rgba(187, 1, 249, 1)'

        ],
        borderColor: [
         'rgba(1, 249, 195, 1)',
         'rgba(249, 1, 1, 1)',
         'rgba(1, 71, 249, 1)',
         'rgba(129, 249, 1, 1)',
         'rgba(187, 1, 249, 1)',
         'rgba(1, 249, 195, 1)',
         'rgba(249, 1, 1, 1)',
         'rgba(1, 71, 249, 1)',
         'rgba(129, 249, 1, 1)',
         'rgba(187, 1, 249, 1)',
         'rgba(1, 249, 195, 1)',
         'rgba(249, 1, 1, 1)',
         'rgba(1, 71, 249, 1)',
         'rgba(129, 249, 1, 1)',
         'rgba(187, 1, 249, 1)',
         'rgba(1, 249, 195, 1)',
         'rgba(249, 1, 1, 1)',
         'rgba(1, 71, 249, 1)',
         'rgba(129, 249, 1, 1)',
         'rgba(187, 1, 249, 1)'
         

        ],
        borderWidth: 1
      },{
        label: 'Product Total Views',
        data: viewsArray,
        backgroundColor: [
          'rgba(68, 243, 173, 1)',
          'rgba(68, 161, 243, 1)',
          'rgba(217, 68, 243, 1)',
          'rgba(243, 243, 68, 1)',
          'rgba(243, 68, 185, 1)',
          'rgba(68, 243, 173, 1)',
          'rgba(68, 161, 243, 1)',
          'rgba(217, 68, 243, 1)',
          'rgba(243, 243, 68, 1)',
          'rgba(243, 68, 185, 1)',
          'rgba(68, 243, 173, 1)',
          'rgba(68, 161, 243, 1)',
          'rgba(217, 68, 243, 1)',
          'rgba(243, 243, 68, 1)',
          'rgba(243, 68, 185, 1)',
          'rgba(68, 243, 173, 1)',
          'rgba(68, 161, 243, 1)',
          'rgba(217, 68, 243, 1)',
          'rgba(243, 243, 68, 1)',
          'rgba(243, 68, 185, 1)',


        ],
        borderColor: [
          'rgba(68, 243, 173, 1)',
          'rgba(68, 161, 243, 1)',
          'rgba(217, 68, 243, 1)',
          'rgba(243, 243, 68, 1)',
          'rgba(243, 68, 185, 1)',
          'rgba(68, 243, 173, 1)',
          'rgba(68, 161, 243, 1)',
          'rgba(217, 68, 243, 1)',
          'rgba(243, 243, 68, 1)',
          'rgba(243, 68, 185, 1)',
          'rgba(68, 243, 173, 1)',
          'rgba(68, 161, 243, 1)',
          'rgba(217, 68, 243, 1)',
          'rgba(243, 243, 68, 1)',
          'rgba(243, 68, 185, 1)',
          'rgba(68, 243, 173, 1)',
          'rgba(68, 161, 243, 1)',
          'rgba(217, 68, 243, 1)',
          'rgba(243, 243, 68, 1)',
          'rgba(243, 68, 185, 1)',

        ],
        borderWidth: 1 
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}