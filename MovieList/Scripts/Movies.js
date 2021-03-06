﻿$(document).ready(function () {
    $('#accordion').accordion({
        heightStyle: "fill"
    });
    GetLibrary();
});

var this_movie;

function GetLibrary() {
    $('.library').children().remove();
    $.getJSON("api/allmovies")
        .done(function (data) {
            $('.library').append('<p>A list of movies in the movie library:</p>');
            $.each(data, function (key, item) {
                $('.library').append('<li>' + item.Title + '</li>')
            })
        });
}

function Search() {
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
                $('.movies').append('<br><p id="addbtn"><input type="button" value="Add" onclick="AddMovie();" /></p>');
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

    return !isNaN(y) && y.length === 4 ? true : false;
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
            GetLibrary();
        },
    });
}