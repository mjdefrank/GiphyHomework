$(document).ready(function(){

		var animalButton;

//append new buttons from search bar into header
	//create onclick event for createButton class
	$('.createButton').on('click', function(){
		//set animal button value equal to the value in the userValue ID
		animalButton = $('#userValue').val();
		//create variable called newButton...uses jquery to create a button element with the class searchButton and data-value of animalButton var
		var newButton = $('<button class="searchButton" data-value="'+animalButton+'">'+animalButton+'</button>')
		//append newly created button into header
		$('.header').append(newButton);
		//changes userValue input field back to blank string
		$('#userValue').val('');
		})
	
	//declare a blank variable for the search criteria
		var searchQuery;
	//create var for base url with query operator
	var queryURL;
	//create a future event for dynamically created searchButton fields
	$('body').on('click','.searchButton' ,function(){
			//empty current contents of div
			$('.putGifsHere').empty();
			//set searchQuery variable equal to value of the button clicked
			var searchQuery=$(this).data('value');
			console.log(searchQuery);
			//set the query string to the the button clicked
			queryURL='https://api.giphy.com/v1/gifs/search?q=' + searchQuery + '&api_key=mEtRfxSjHJg6JF51Jj1P78YzhbVfKZ28&limit=10';
			//call AJAX
			$.ajax({
				url: queryURL,
				method: "GET"
			})
			//when AJAX is complete, do the following
			.done(function(response) {
				//log the data for reference
				console.log(response);
				//create a loop to run through each response in the array
				for (var i = 0; i < response.data.length; i++) {
				 	//create a variable to hold the property of the url for the gif
				 	var imageUrl=response.data[i].embed_url;
				 	//create an image dynamically in the document
				 	var resultImage = $('<img>');
				 	//set image source attribute
				 	resultImage.attr('src', imageUrl);
				 	//set image alt attribute
				 	resultImage.attr('alt', response.data[i].slug);
				 	//append image to existing putGifsHere div
				 	console.log(resultImage);
				 	$('.putGifsHere').append(resultImage);	 } 
			});
		});		
});