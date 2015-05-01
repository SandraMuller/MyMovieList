var this_movie;

function PostSearch() {
    var t = $('#title').val();
    var y = $('#year').val();
    $('.movies').children().remove();

    if (t !== "" && CheckYear(y) === true) {
        $.getJSON("http://www.omdbapi.com/?t=" + t + "&y=" + y + "&plot=full&r=json")
            .done(function (data) {
                this_movie = data;
                $('.movies').css({ "padding": "20px" });
                $('.movies').append('<p>Title: ' + data.Title + '</p>' +
                    '<p>Type: ' + data.Type + '</p>' + '<p>Year: ' + data.Year + '</p>' +
                    '<p>Genre: ' + data.Genre + '</p>' + '<p>Director/s: ' + data.Director + '</p>' +
                    '<p>' + data.Plot + '</p>');
                $('.movies').append('<br><p id="addbtn"><input type="button" value="Add" onclick="AddMovie();" />');
            })
        .fail(function (jqXHR, textStatus, err) {
            alter('Error: ' + err);
        });

        $('#title').val("");
        $('#year').val("");
    }
    else { alert("Please enter a valid title and year!"); }
}

function CheckYear(y) {
    if (y.length == 4 && !isNaN(y)) {
        return true;
    }
    return false;
}

function AddMovie() {
    var movie = {
        Title: "" + this_movie.Title + "",
        Genre: "" + this_movie.Genre + "",
        Description: "" + this_movie.Plot + ""
    };
    $.ajax({
        type: "POST",
        data: JSON.stringify(movie),
        url: "api/addmovie",
        contentType: "application/json",
        success: function () {
            $('#addbtn').remove();
            $('.movies').append('<p>Added to MyMovies. To edit this item please go to your <strong>MyMovies</strong> page.</p>');
        },
    });
}