document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "http://localhost:3000";

    // display the first beer's details
    function fetchFirstBeerDetails() {
        fetch(apiUrl + "/beers/1")
            .then((response) => response.json())
            .then((data) => {
                const beerName = document.getElementById("beer-name");
                const beerImage = document.getElementById("beer-image");
                const beerDescription = document.getElementById("beer-description");
                const reviewList = document.getElementById("review-list");

                beerName.textContent = data.name;
                beerImage.src = data.image_url;
                beerDescription.textContent = data.description;

                //  previous reviews
                reviewList.innerHTML = "";

                //  reviews
                data.reviews.forEach((review) => {
                    const li = document.createElement("li");
                    li.textContent = review;
                    reviewList.appendChild(li);
                });
            })
            .catch((error) => {
                console.error("Error fetching beer details:", error);
            });
    }

    //to fetch and display the beer menu
    function fetchBeerMenu() {
        fetch(apiUrl + "/beers")
            .then((response) => response.json())
            .then((data) => {
                const beerList = document.getElementById("beer-list");

                //  previous menu items
                beerList.innerHTML = "";

                //  menu
                data.forEach((beer) => {
                    const li = document.createElement("li");
                    li.textContent = beer.name;

                    // event to load beer details
                    li.addEventListener("click", () => {
                        fetchBeerDetails(beer.id);
                    });

                    beerList.appendChild(li);
                });
            })
            .catch((error) => {
                console.error("Error fetching beer menu:", error);
            });
    }

    // fetch and display beer details for a specific beer by ID
    function fetchBeerDetails(beerId) {
        fetch(apiUrl + "/beers/" + beerId)
            .then((response) => response.json())
            .then((data) => {
                const beerName = document.getElementById("beer-name");
                const beerImage = document.getElementById("beer-image");
                const beerDescription = document.getElementById("beer-description");
                const reviewList = document.getElementById("review-list");

                beerName.textContent = data.name;
                beerImage.src = data.image_url;
                beerDescription.textContent = data.description;

                // Clear previous reviews
                reviewList.innerHTML = "";

                // Populate reviews
                data.reviews.forEach((review) => {
                    const li = document.createElement("li");
                    li.textContent = review;
                    reviewList.appendChild(li);
                });
            })
            .catch((error) => {
                console.error("Error fetching beer details:", error);
            });
    }

    //  listener to the review form
    const reviewForm = document.getElementById("review-form");
    reviewForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const reviewInput = document.getElementById("review");
        const reviewText = reviewInput.value;
        if (reviewText) {


            // new review to the review list
            const reviewList = document.getElementById("review-list");
            const li = document.createElement("li");
            li.textContent = reviewText;
            reviewList.appendChild(li);
            reviewInput.value = "";
        }
    });

    // vent listener to the description form
    const descriptionForm = document.getElementById("description-form");
    descriptionForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const descriptionInput = document.getElementById("description");
        const newDescription = descriptionInput.value;
        if (newDescription) {

            //  the beer's description on the page
            const beerDescription = document.getElementById("beer-description");
            beerDescription.textContent = newDescription;
            descriptionInput.value = "";
            //imediate above line clears input

        }
    });

    fetchFirstBeerDetails();
    fetchBeerMenu();
});

//subject to review