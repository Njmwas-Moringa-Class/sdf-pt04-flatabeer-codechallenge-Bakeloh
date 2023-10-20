// Code here
// Base URL for the API
const apiUrl = "http://localhost:3000";

//Fetch Beer Data
/*function fetchBeerData(){
return fetch('${apiUrl}/beers')
.then(function(response){
if (!response.ok){
throw new error ("Unsuccessful report")
};
return response.json()
})
.catch(function(error){
console.error('error fetching beer data:', error)
return null
})
}*/

// Beer by ID
async function fetchBeerById(drinkId) {
    let response = await fetch(`${apiUrl}/beers/${drinkId}`);
    let data = await response.json();
    return data;
}

//All Beers 
async function fetchAllBeers() {
    let response = await fetch(`${apiUrl}/beers`);
    var data = await response.json();
    return data;
}

// Beer details display
function displayBeerDetails(beer) {
    document.getElementById("beer-name").textContent = beer.name;
    document.getElementById("beer-image").src = beer.image_url;
    document.getElementById("beer-description").textContent = beer.description;
    Reviews(beer.reviews);
}

// Beer menu display
function displayBeerMenu(beers) {
    beers.forEach((beer) => {
        let listItem = document.createElement("li");
        listItem.textContent = beer.name;
        listItem.addEventListener("click", () => handleBeerSelection(beer.id));
        document.getElementById("beer-list").appendChild(listItem);
    });
}

function Reviews(reviews) {
    const reviewList = document.getElementById("review-list");
    reviewList.innerHTML = "";
    reviews.forEach((review) => {
        const listItem = document.createElement("li");
        listItem.textContent = review;
        listItem.addEventListener("click", removeReview);
        reviewList.appendChild(listItem);
    });
}


async function initApp() {
    try {
        let beers = await fetchAllBeers();
        displayBeerMenu(beers);
        let firstBeer = await fetchBeerById(1);
        displayBeerDetails(firstBeer);
        reviewForm.addEventListener("submit", handleReviewSubmission);
    } catch (error) {
        console.error("Error initializing app:", error);
    }
}

document.addEventListener("DOMContentLoaded", initApp);