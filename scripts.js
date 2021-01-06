async function getSongList() {
    // Storing response 
    var data = document.getElementById("searchQueryInput").value;
    var url = "https://api.lyrics.ovh/suggest/" + data;
    const response = await fetch(url);

    // Storing data in form of JSON 
    var data = await response.json();

   

    show(data);
}
async function getLyrics(title, artist) {
    var url = "https://api.lyrics.ovh/v1/" + artist + "/" + title;
    const response = await fetch(url);

    //  // Storing data in form of JSON 
    var data = await response.json();
  
    if (data['lyrics'] != '') {
        show_lyrics(data.lyrics);
    }
    else {
        alert('no lyrics found');
    }

}
function show_lyrics(data) {
    append_lyrics = '';
    append_lyrics += '<h2 class="song">' + data + '</h2>';
    document.getElementById("song_list").innerHTML = '';
    document.getElementById("song_lyrics").innerHTML = append_lyrics;
    document.getElementById("prev_button").style.display = "none";
    document.getElementById("next_button").style.display = "none";
}
function goToback() {
    append_lyrics = '';
    document.getElementById("song_lyrics").innerHTML = append_lyrics;
    show();

}
function goToPrev() {

    if (visible_song_list_start_item >= 10) {

        append_list = '';
        if (visible_song_list_end_item % 10 == 0) {
            visible_song_list_start_item -= 10
            visible_song_list_end_item -= 10;
        }
        else {

            visible_song_list_start_item -= 10;
            visible_song_list_end_item = ((song_list_total_items - visible_song_list_end_item % 10));
        }


        for (var i = visible_song_list_start_item; i < visible_song_list_end_item; i++) {
            append_list += '<li class="song"  >' + song_data[i].title + '<button  onClick="getLyrics(song_title,song_artist)" class="show-lyrics-button ">Lyrics</button></li>';
        }
        document.getElementById("song_list").innerHTML = append_list;
        hide_show_button();
    }
}
function goTonext() {
    append_list = '';
    if (song_list_total_items - visible_song_list_end_item >= 10) {
        visible_song_list_start_item = visible_song_list_end_item;
        visible_song_list_end_item = visible_song_list_start_item + 10;
    }
    else {
        visible_song_list_start_item = visible_song_list_end_item;
        visible_song_list_end_item = visible_song_list_start_item + (song_list_total_items - visible_song_list_end_item);
    }
    // Loop to access all rows  
    for (var i = visible_song_list_start_item; i < visible_song_list_end_item; i++) {
        append_list += '<li class="song"  >' + song_data[i].title + '<button  onClick="getLyrics(song_title,song_artist)" class="show-lyrics-button ">Lyrics</button></li>';
    }
    document.getElementById("song_list").innerHTML = append_list;
    hide_show_button();
}

function show(data) {

    append_lyrics = '';
    document.getElementById("song_lyrics").innerHTML = append_lyrics;
    song_data = data.data;
    append_list = '';
    song_list_total_items = song_data.length;
    visible_song_list_start_item = 0
    visible_song_list_end_item = visible_song_list_start_item + 10;


    for (var i = visible_song_list_start_item; i < visible_song_list_end_item; i++) {
        song_title = song_data[i].title;
        song_artist = song_data[i]['artist']['name'];
        append_list += '<li class="song"  >' + song_data[i].title + '<button  onClick="getLyrics(song_title,song_artist)" class="show-lyrics-button ">Lyrics</button></li>';
    }

    document.getElementById("song_list").innerHTML = append_list;
    hide_show_button();
}

function hide_show_button() {
  
    if (visible_song_list_start_item >= 10) {
        document.getElementById("prev_button").style.display = "block";
    }
    else {
        document.getElementById("prev_button").style.display = "none";
    }
    if (song_list_total_items == visible_song_list_end_item) {
        document.getElementById("next_button").style.display = "none";

    }
    else {
        document.getElementById("next_button").style.display = "block";
    }


}