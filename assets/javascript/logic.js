/**
 * Created by rpaulin on 4/8/17.
 */

//CREATE ARRAY WITH STRINGS FOR THE INITIAL BUTTONS

var initialButtons = ["cat", "dog", "guinea pig", "elephant", "snow leopard", "mini aussie"];

var createButton = function(text){
    var new_button = $("<button>");
    new_button.addClass("GifBtn btn btn-primary");
    new_button.text(text);
    $(".buttonContainer").append(new_button);
}

for (var x = 0; x < initialButtons.length; x++) {
    createButton(initialButtons[x]);
    $(".GifBtn").attr("status","unpressed");
}

$("#searchButton").on("click", function (event) {

    event.preventDefault();
    var inputValue = $("#searchInput").val();
    createButton(inputValue);

});

$(document).on("click", ".GifBtn", function () {

    if($(this).attr("status") === "unpressed") {

        var apiURL = "https://api.giphy.com/v1/gifs/search?limit=10&rating=pg&q=";

        var apiKey = "&api_key=dc6zaTOxFJmzC";

        var buttonText = $(this).attr("class", "GifBtn").text();

        $(this).attr("status", "pressed");

        $.ajax({
            method: "GET",
            url: apiURL + buttonText + apiKey
        }).done(function (response) {

            for (var i = 0; i < 10; i++) {

                var gifDiv = $("<div>");

                var img_tag = $("<img>");

                var rating_p = $("<p>");

                img_tag.attr("src", response.data[i].images.fixed_height_still.url);

                gifDiv.addClass("GIF_Div");

                img_tag.addClass("GIF");

                img_tag.attr("state", "still");

                img_tag.attr("value", buttonText);

                img_tag.attr("number", [i]);

                rating_p.text("GIF Rating: " + response.data[i].rating);

                gifDiv.append(img_tag);
                gifDiv.append(rating_p);

                $("#gifContainer").append(gifDiv);

            }

        })
    }
});

$(document).on("click", ".GIF", function () {

    var apiURL = "https://api.giphy.com/v1/gifs/search?limit=10&rating=pg&q=";

    var apiKey = "&api_key=dc6zaTOxFJmzC";

    var thisBtn = $(this).attr("class", "GIF");

    if (thisBtn.attr("state") === "still") {
        $.ajax({
            method: "GET",
            url: apiURL + thisBtn.attr("value") + apiKey
        }).done(function (response) {
            thisBtn.attr("src", response.data[thisBtn.attr("number")].images.fixed_height.url);
            thisBtn.attr("state", "animated");
        })
    }

    else {
        $.ajax({
            method: "GET",
            url: apiURL + thisBtn.attr("value") + apiKey
        }).done(function (response) {
            thisBtn.attr("src", response.data[thisBtn.attr("number")].images.fixed_height_still.url);
            thisBtn.attr("state", "still");
        })
    }
});

$(".clean").on("click",function () {

    $("#gifContainer").empty();

    $(".GifBtn").addClass("btn btn-primary");

})



