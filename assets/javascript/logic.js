/**
 * Created by rpaulin on 4/8/17.
 */

//CREATE ARRAY WITH STRINGS FOR THE INITIAL BUTTONS

var initialButtons = ["cat", "dog", "guinea pig", "elephant", "snow leopard", "mini aussie"];

var createButton = function(text){
    var new_button = $("<button>");
    new_button.addClass("GifBtn");
    new_button.text(text);
    $(".buttonContainer").append(new_button);
}

for (var x = 0; x < initialButtons.length; x++) {
    createButton(initialButtons[x]);
}

$("#searchButton").on("click", function (event) {

    event.preventDefault();
    var inputValue = $("#searchInput").val();
    createButton(inputValue);

});

$(document).on("click", ".GifBtn", function () {

    var apiURL = "https://api.giphy.com/v1/gifs/search?limit=10&rating=pg&q=";

    var apiKey = "&api_key=dc6zaTOxFJmzC";

    $.ajax({
        method: "GET",
        url: apiURL + $(this).text() + apiKey
    }).done(function (response) {

        for (var i = 0; i < 10; i++) {

            var img_tag = $("<img>");

            var rating_p = $("<p>");

            img_tag.attr("src", response.data[i].images.fixed_height.url);

            rating_p.html(response.data[i].rating);

            $("#gifContainer").append(img_tag);

            $("#gifContainer").append(rating_p);

        }

    });

})