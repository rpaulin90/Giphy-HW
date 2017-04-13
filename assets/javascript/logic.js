/**
 * Created by rpaulin on 4/8/17.
 */

//////// AN OBJECT TO STORE VARIABLES AND FUNCTIONS USED THROUGHOUT THE PROGRAM ////////
var initial = {

    //CREATE ARRAY WITH STRINGS FOR THE INITIAL BUTTONS

    initialButtons: ["cat", "dog", "guinea pig", "elephant", "snow leopard", "mini aussie"],

    //SAVE THE URL AND KEY WE WILL USE TO RETRIEVE IMAGES

    apiURL: "https://api.giphy.com/v1/gifs/search?rating=pg&q=",

    apiKey: "&api_key=dc6zaTOxFJmzC&limit=",

    limit: 10,

    //THE PROCESS OF CREATING A NEW BUTTON WITH ITS BOOTSTRAP CLASSES AND A CLASS TO LABEL IT AS A GIF

    button: function (text) {
        var new_button = $("<button>");
        new_button.addClass("GifBtn btn btn-primary");
        new_button.text(text);
        new_button.attr("status", "unpressed");
        $(".buttonContainer").append(new_button);
    },

    //CREATE A BUTTON FOR EACH STRING IN THE ARRAY
    createButton: function(){
        for (var x = 0; x < initial.initialButtons.length; x++) {
            initial.button(initial.initialButtons[x]);
        }
    }
};

initial.createButton();

//WHEN WE CLICKING THE ADD BUTTON...
$("#addButton").on("click", function (event) {

    //PREVENT THE FORM FROM SUBMITTING AND RELOADING THE PAGE
    event.preventDefault();
    //CREATE A NEW BUTTON FOR THE NEW SEARCH TERM
    initial.button($("#searchInput").val());
    $("#searchInput").val("");

});

//WHEN CLICKING A BUTTON TO DISPLAY GIFs
$(document).on("click", ".GifBtn", function () {

    //HAS THE BUTTON BEEN PRESSED?
    //IF NOT, THEN CREATE 10 DIVS WITH ITS RESPECTIVE IMAGE AND TEXT TO DISPLAY A GIF AND ITS RATING
    if ($(this).attr("status") === "unpressed") {

        var buttonText = $(this).attr("class", "GifBtn").text();

        //CHANGE THE STATUS OF THE BUTTON TO PRESSED SO THE USER CAN'T KEEP LOADING THE SAME IMAGES
        $(this).attr("status", "pressed");

        $.ajax({
            method: "GET",
            url: initial.apiURL + buttonText + initial.apiKey + initial.limit
        }).done(function (response) {

            for (var i = 0; i < initial.limit; i++) {

                var gifData = response.data[i];

                var gifDiv = $("<div>");

                var img_tag = $("<img>");

                var rating_p = $("<p>");

                gifDiv.addClass("GIF_Div");

                img_tag.addClass("GIF");

                //OBTAIN ALL NECESSARY INFORMATION FROM THE GIPHY API AND STORE THEM AS ATTRIBUTES
                //FOR EACH IMAGE
                img_tag.attr({
                    "state": "still",
                    "value": buttonText,
                    "number": [i],
                    "animatedimg": gifData.images.fixed_height.url,
                    "stillimg": gifData.images.fixed_height_still.url,
                    "src": gifData.images.fixed_height_still.url
                });

                rating_p.text("GIF Rating: " + gifData.rating);

                gifDiv.append(img_tag);
                gifDiv.append(rating_p);

                $("#gifContainer").append(gifDiv);

            }

        })
    }
});


//WHAT HAPPENS WHEN YOU CLICK ON A GIF?
$(document).on("click", ".GIF", function () {

    var thisBtn = $(this).attr("class", "GIF");
    //IF THE GIF IS IN "STILL" STATE THEN WE SWITCH ITS IMG SRC ATTRIBUTE FOR THE ANIMATED VERSION
    if (thisBtn.attr("state") === "still") {
        thisBtn.attr("src", thisBtn.attr("animatedimg"));
        //CHANGE THE STATE OF THE GIF TO "ANIMATED"
        thisBtn.attr("state", "animated");
    }

    //IF THE GIF IS IN "ANIMATED" STATE THEN WE SWITCH ITS IMG SRC ATTRIBUTE FOR THE STILL VERSION
    else {

        thisBtn.attr("src", thisBtn.attr("stillimg"));
        //CHANGE THE STATE OF THE GIF TO "STILL"
        thisBtn.attr("state", "still");
    }
});

//THE GIF SECTION CAN GET VERY ANNOYING WITH ALL THOSE GIFs
//CLICKING ON THE "CLEAN" BUTTON WILL EMPTY THE DIV WHERE ALL THE GIFs ARE CONTAINED
//ALL THE BUTTONS GET ASSIGNED THEIR ORIGINAL BOOTSTRAP CLASS TO LET THE USER KNOW THEY ARE UNPRESSED
$(".clean").on("click", function (event) {

    event.preventDefault();

    $("#gifContainer").empty();

    $(".GifBtn").addClass("btn btn-primary");

})



