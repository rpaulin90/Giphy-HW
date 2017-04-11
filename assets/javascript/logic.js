/**
 * Created by rpaulin on 4/8/17.
 */

//CREATE ARRAY WITH STRINGS FOR THE INITIAL BUTTONS

var initialButtons = ["cat", "dog", "guinea pig", "elephant", "snow leopard", "mini aussie"];

var createButton = function(text){
    var new_button = $("<button>");
    new_button.addClass("GifBtn btn btn-primary");
    new_button.text(text);
    new_button.attr("status","unpressed");
    $(".buttonContainer").append(new_button);
}

for (var x = 0; x < initialButtons.length; x++) {
    createButton(initialButtons[x]);
}

$("#searchButton").on("click", function(event) {

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

                gifDiv.addClass("GIF_Div");

                img_tag.addClass("GIF");

                img_tag.attr("state", "still");

                img_tag.attr("value", buttonText);

                img_tag.attr("number", [i]);

                img_tag.attr("animatedimg",response.data[i].images.fixed_height.url);

                img_tag.attr("stillimg",response.data[i].images.fixed_height_still.url);

                img_tag.attr("src", img_tag.attr("stillimg"));

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
            thisBtn.attr("src",thisBtn.attr("animatedimg"));
            thisBtn.attr("state", "animated");
    }

    else {

        thisBtn.attr("src",thisBtn.attr("stillimg"));
        thisBtn.attr("state", "still");
    }
});

$(".clean").on("click",function (event) {

    event.preventDefault();

    $("#gifContainer").empty();

    $(".GifBtn").addClass("btn btn-primary");

})



