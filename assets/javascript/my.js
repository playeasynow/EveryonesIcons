$(document).ready(function () {
    
    // initial buttons
    var topics = ["Judy Garland", "Grace Jones", "Madonna", "Whoopi Goldberg", "Selena Quintanilla", "Barack Obama", "Bette Midler", "RuPaul"];

    // re-renders HTML to display appropriate content for each icon
    function displayIconGifs() {
        var icon = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + icon + "&apikey=og7P4A2raQmMUV60NTJG8NkmLPGbVrXb&limit=10";

        // creates AJAX call for specific icon button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (result) {
            $("#icons-view").empty();
            // store all objects data
            var results = result.data;

            for (var i = 0; i < results.length; i++) {
                // creating and storing a div tag
                var iconDiv = $("<div>");
                
                iconDiv.addClass("icon-pictures");

                // creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // creating and storing an image tag
                var iconImage = $("<img>");
                // setting the src attribute of the image to a property pulled off the result item
                iconImage.attr("src", results[i].images.fixed_height.url);
                iconImage.attr("data-still", results[i].images.fixed_height_still.url);
                iconImage.attr("data-animate", results[i].images.fixed_height.url);
                iconImage.attr("data-state", "still");
                iconImage.addClass("iconImage");

                // Appending the paragraph and image tag to the iconDiv
                iconDiv.prepend(iconImage);
                iconDiv.prepend(p);
                $("#icons-view").prepend(iconDiv);
            }

            $(".iconImage").on("click", function () {
                var state = $(this).attr("data-state");
                console.log(state);

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    }

    // function to create initial buttons on the HTML
    function renderButtons() {
        // need to clear buttons div everytime you click or you'll have repeat buttons because of loop
        $("#buttons").empty();

        // loop to create initial buttons
        for (var i = 0; i < topics.length; i++) {
            var initialButtons = $("<button>").addClass("icon m-2 btn btn-1 btn-1e").attr("data-name", topics[i]).text(topics[i]);
            $("#buttons").append(initialButtons);
        }
    }

    // captures value from button click
    $("#add-icon").on("click tap", function (event) {
        event.preventDefault();

        // stores value entered into the form
        var icon = $("#icon-input").val().trim();

        // pushes entered value into the topics array
        topics.push(icon);

        renderButtons();
    });

    // Function for displaying the icon GIF
    // Using $(document).on instead of $(".icon").on to add event listeners to dynamically generated elements
    $(document).on("click", ".icon", displayIconGifs);

    renderButtons();

});