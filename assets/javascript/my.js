var topics = ["Judy Garland", "Grace Jones", "Madonna", "Whoopi Goldberg", "Selena Quintanilla", "Barack Obama", "Bette Midler", "RuPaul"];

function displayIconGifs() {
    var icon = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + icon + "&apikey=og7P4A2raQmMUV60NTJG8NkmLPGbVrXb";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (result) {
        //   $("#icons-view").text(JSON.stringify(response));
        console.log(result);
        var data = result.data;
        var output = "";
        for (var index in data) {
            var gifObject = data[index];
            var gifURL = gifObject.images.original.url;
            console.log(gifURL);
            output += "<img width='200px' src='" + gifURL + "'/>";
        }
        $("#icons-view").html(output);
        console.log(gifURL);
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