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
	console.log("animalToSearch", animalToSearch); 
	// sets up the queryURL
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalToSearch + "&api_key=" + APIKey + "&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		// for each item in the response array
		// console.log(response);
		for (var i = 0; i<response.data.length; i++){
			// create a div with class of animalGifDiv
			var gifDiv = $("<div class ='animalGifDiv'>");
			// create the url for the static gif
			var staticGifURL = response.data[i].images.fixed_width_still.url;
			// create the url for the animated gif
			var animatedGifURL = response.data[i].images.fixed_width.url;

			// initialGifImage is made with the static URL
			var gifImage = $("<img class='gif'>").attr("src", staticGifURL);


			// set the attributes of the GIF (animated, static, and current state)
			gifImage.attr("data-state", "static");
			gifImage.attr("data-animate", animatedGifURL);
			gifImage.attr("data-static", staticGifURL);
			// gifImage.attr("class", "gif");
			
			// append the image to the individual gif div
			gifDiv.append(gifImage);

			var gifRating = response.data[i].rating;
			var displayRating = $("<p>").text("Rating: " + gifRating);
			gifDiv.append(displayRating);


			// append the individual animal GIF div to the gif container
			$("#gifContainer").append(gifDiv);
		}
	});
}

$(document).on("click", ".animalType",displayGIFs);

// need to add the document listener because no .gifs exist when the page is created
$(document).on("click", ".gif", function(){
	// event.preventDefault();
	var currentState = $(this).attr("data-state"); 
	if (currentState === "static") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state","animated");
	} else {
		$(this).attr("src", $(this).attr("data-static"));
		$(this).attr("data-state", "static");
	}
});

$("#add-animal").on("click", function(event) {
	event.preventDefault();
	var newAnimal = $("#animal-input").val().trim();
	animals.push(newAnimal);
	initializeButtons();
	displayGIFs();
});



