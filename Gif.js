$(document).ready(function () {
 
 
 // Initial array of emotions
 var emotions = ["Happy", "Sad", "Nervous", "Bored", "Awkward", "Fear","Anger", "Disgust","Surprise", "Negative","Horror", "Astonishment,", "Modesty", "Blushing."];

 // Function for display Emotion
 function displayEmotionInfo() {

   var emotion= $(this).attr("data-name");
   var queryURL =  "https://api.giphy.com/v1/gifs/search?q=" +
   emotion + "&api_key=dc6zaTOxFJmzC&limit=10";
      
   $.ajax({
     url: queryURL,
     method: "GET"
   })

   .then(function(response) {
     $("#emotions-view").empty();

     var results = response.data;

     for (var i = 0; i < results.length; i++) {
       var gifDiv = $("<div>");

       var rating = results[i].rating;
       var p = $("<p>").text("Rating: " + rating);

       var emotionImage = $("<img>");
       emotionImage.attr("src", results[i].images.fixed_height_still.url);
       emotionImage.attr("class", "animate");
       emotionImage.attr("data-state","still");
       emotionImage.attr("data-animate",results[i].images.fixed_height.url);
       emotionImage.attr("data-still",results[i].images.fixed_height_still.url);
       
       gifDiv.prepend(p);
       gifDiv.prepend(emotionImage);
   
       $("#emotions-view").prepend(gifDiv);
     }       
     });
   }
 

 function switchAnimate() {
   var state = $(this).attr("data-state");

   if (state === "still") {
     $(this).attr("src", $(this).attr("data-animate"));
     $(this).attr("data-state", "animate");
   } else {
     $(this).attr("src", $(this).attr("data-still"));
     $(this).attr("data-state", "still");
   }
 }


 // Function for displaying emotion data
 function renderButtons() {

   // Deleting the buttons prior to adding new emotions
   $("#buttons-view").empty();

   // Looping through the array of emotions
   for (var i = 0; i < emotions.length; i++) {

     var a = $("<button>");
     // Adding a class of emotion to our button
     a.addClass("emotion");
     // Adding a data-attribute
     a.attr("data-name", emotions[i]);
     // Providing the initial button text
     a.text(emotions[i]);
     // Adding the button to the buttons-view div
     $("#buttons-view").append(a);
   } 
 }

 // This function handles events where one button is clicked
 $("#add-emotion").on("click", function(event) {
   event.preventDefault();

   // This line grabs the input from the textbox
   var emotion = $("#emotion-input").val().trim();

   // Adding the emotion from the textbox to our array
   emotions.push(emotion);
   console.log(emotions);

   // Calling renderButtons which handles the processing of our emotion array
   renderButtons();
 });

 // Function for displaying the emotion info
 // Using $(document).on instead of $(".emotion").on to add event listeners 
 // Using $(document).on instead of $(".animate").on to add event listeners 
 $(document).on("click", ".emotion", displayEmotionInfo);
 $(document).on("click", ".animate", switchAnimate);

 // // Calling the renderButtons function to display the initial buttons
 renderButtons();


});
