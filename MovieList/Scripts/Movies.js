function PostSearch() {
    var t = $('#title').val();
    var y = $('#year').val();
    $('.movies').children().remove();

    if (t != "" && CheckYear(y) === true) {
        $.getJSON("http://www.omdbapi.com/?t="+t+"&y="+y+"&plot=short&r=json")
            .done(function (data) {
                    $(".movies").append("<p>"+data.Title+"</p>");
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