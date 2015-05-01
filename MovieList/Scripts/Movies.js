function PostSearch() {
    var t = $('#title').val();
    var y = $('#year').val();
    $('.movies').children().remove();

    if (t != "" && CheckYear(y) === true) {
        $.getJSON("http://www.omdbapi.com/?t="+t+"&y="+y+"&plot=full&r=json")
            .done(function (data) {
                $('.movies').css({ "padding": "20px" });
                $('.movies').append('<p>Title: ' + data.Title + '</p>' + '<p>Type: ' + data.Type + '</p>' +
                    '<p>Year: '+data.Year+'</p>'+ '<p>Genre: '+data.Genre+'</p>'+
                    '<p>' + data.Director + '</p>' + '<p>' + data.Plot + '</p>');
                $('.movies').append('<br><p><input type="button" value="Add" onclick="AddMovie(' + data + ');" />');
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