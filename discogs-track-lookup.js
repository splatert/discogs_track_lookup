// ==UserScript==
// @name         Discogs_track_lookup
// @namespace    http://tampermonkey.net/
// @version      2024-08-27
// @description  Look up individual tracks on Discogs
// @author       splatert
// @match        https://www.discogs.com/release/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discogs.com
// @grant        none
// ==/UserScript==



function removeANVMark(artist) {
    if (artist.endsWith('*')) {
        artist = artist.slice(0, -1);
    }
    return artist;
}



(function() {
    
    var get_artists = document.getElementsByClassName('artist_3zAQD');
    var get_titles = document.getElementsByClassName('trackTitle_CTKp4');

    var artists = [];
    var titles = [];

    for (let i=0; i<get_artists.length; i++) {
        var artist = get_artists[i].firstChild.firstChild.innerText;
        
        artist = removeANVMark(artist);
        artists.push(artist);
    }




    var skip = false;

    for (let i=0; i<get_titles.length; i++) {
        if (!skip) {
            skip = true;
            titles.push(get_titles[i].firstChild.textContent);
        }
        else {
            skip = false;
        }
    }



    for (let i=0; i<artists.length; i++) {
        
        var searchBtn = document.createElement('a');
        searchBtn.style.userSelect = 'none';
        searchBtn.text = ""
        searchBtn.target = '_blank';
        searchBtn.style.marginLeft = '15px';
        searchBtn.href = "https://www.discogs.com/search?q=" + artists[i] + ' - ' + titles[i];

        searchBtn.innerHTML = '<img src=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEVHcEzV6Pjr8fiLd2j1+fx2l7Tl7fXF4v283fz///9bOyLx9fpNW3NWbY3t9f1nSzNDTF2awNaIr8jm8v2fj4Oxd0ax2Pz7/f6Ju+yBa1uu0+Ww0eOoy954X0u4glbV2+TCBBszAAAAAXRSTlMAQObYZgAAABt0RVh0U29mdHdhcmUAZ2lmMnBuZyAwLjYgKGJldGEpqt1pkgAAAI9JREFUGNNdz1kOgzAMRVESh4AJGRjKTNn/LvsMqEW9fz6y5CTjZxlitaxb07RtjkaBRVlttbZo8tjh1RZSWZZhEuHNFLeE4ASaGyCDq7/QE810Qetk7nkMM/2AzGg6FVkgDzhAxpyQBDRg16FTT6Ad87u6wODeMMcYq1eF77A/HN59/k0EG977GqWUIIC/Pl2MClkXvqPNAAAAAElFTkSuQmCC">';
        get_artists[i].appendChild(searchBtn);
    }


            







    console.log(artists);
    console.log(titles);




})();