/**
 * Created by rpaulin on 4/8/17.
 */

//CREATE ARRAY WITH STRINGS FOR THE INITIAL BUTTONS

var initialButtons = ["cat", "dog", "guinea pig", "elephant", "snow leopard", "mini aussie"];

for(var x = 0; x < initialButtons.length; x++){
    var new_button = $("<button>");
    new_button.addClass("GifBtn")
    new_button.text(initialButtons[x]);
    $(".buttonContainer").append(new_button);
}

$("#searchButton").on("click",function(event){

    event.preventDefault();
    var inputValue = $("#searchInput").val();
    var new_button = $("<button>");
    new_button.addClass("GifBtn")
    new_button.text(inputValue);
    $(".buttonContainer").append(new_button);

})

$(document).on("click",".GifBtn",function(){


    $.ajax({
        method: "GET",
        url: "http://api.giphy.com/v1/gifs/search?q=" +
        $(this).text() + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg"
    }).done(function(response){


        for(var i = 0; i < 10; i++){

                var img_tag = $("<img>");

                var rating_p = $("<p>")

                img_tag.attr("src", response.data[i].images.fixed_height.url);

                rating_p.html(response.data[i].rating);

                $("#gifContainer").append(img_tag);

                $("#gifContainer").append(rating_p);

        }

    });



})