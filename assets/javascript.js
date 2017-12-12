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
		console.log("ajax response", response);
		console.log("response length", response.data.length);
		for (var i = 0; i<response.data.length; i++){
			var gifDiv = $("<div class ='animalGifDiv'>");
			var staticGifURL = response.data[i].images.fixed_width_still.url;
			var staticGifImage = $("<img>").attr("src", staticGifURL);
			gifDiv.append(staticGifImage);
			$("#gifContainer").append(gifDiv);
			// console.log("staticGif", staticGif);
			// console.log(response.data[i].id);
		}
	});
}

$(document).on("click", ".animalType",displayGIFs);


// $.ajax({
// 	url: queryURL,
// 	method: "GET",
// }).done(function(response){
// 	console.log("response", response);
// })
