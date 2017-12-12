var animals = ["cat", "dog", "cow", "pig", "goat", "rabbit"];
var animalButtons = $("#animalButtons");

// this function generates the search buttons
function initializeButtons() {
	$("#animalButtons").empty();

	// for every animal in the array, 
	for (i = 0; i < animals.length; i++) {
		// create a button
		var button = $("<button>");
		// add the class animalType
		button.addClass("animalType");
		// set the attribute "animal-name" to the animal name
		button.attr("animal-name",animals[i]);
		// label the button with the animal
		button.text(animals[i]);
		// and append it to the button div
		$("#animalButtons").append(button);

	}
}

initializeButtons();

// var searchItem = "cat";
var APIKey = "dc6zaTOxFJmzC" // public beta key from https://giphy.api-docs.io/1.0/welcome/access-and-api-keys
// var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchItem + "&api_key=" + APIKey + "&limit=10";

function displayGIFs(){
	$("#gifContainer").empty();
	// grabs the attribute animal-name from the button that is pressed 
	var animalToSearch = $(this).attr("animal-name");
	// sets up the queryURL
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalToSearch + "&api_key=" + APIKey + "&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		// for each item in the response array
		for (var i = 0; i<response.data.length; i++){
			// create a div with class of animalGifDiv
			var gifDiv = $("<div class ='animalGifDiv'>");
			// create the url for the static gif
			var staticGifURL = response.data[i].images.fixed_width_still.url;
			// create an image with the static gif URL
			var staticGifImage = $("<img>").attr("src", staticGifURL);
			// append the image to the individual gif div
			gifDiv.append(staticGifImage);

			var gifRating = response.data[i].rating;
			var displayRating = $("<p>").text("Rating: " + gifRating);
			gifDiv.append(displayRating);


			// append the individual animal GIF div to the gif container
			$("#gifContainer").append(gifDiv);
		}
	});
}

$(document).on("click", ".animalType",displayGIFs);


