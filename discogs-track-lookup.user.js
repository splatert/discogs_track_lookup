// ==UserScript==
// @name         Discogs_track_lookup
// @namespace    http://tampermonkey.net/
// @version      2026-10-31
// @description  Look up individual tracks on Discogs
// @author       splatert
// @match        https://www.discogs.com/release/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discogs.com
// @grant        none
// ==/UserScript==



function cleanUp(text) {
    return text.replaceAll(/([*])/gm, '');
}



(function() {

    var artists
    var artists = [];
    var titles = [];

    var tracklist = document.getElementsByClassName('tracklist_ZdQ0I')[0];
    if (tracklist) {
        var items = tracklist.getElementsByTagName('tr');


        for (let i = 0; i < items.length; i++) {
            if (!items[i].classList.contains('heading_mkZNt')) {

                var artist = '';
                var title = '';

                var get_artists = items[i].getElementsByClassName('artist_VsG56');
                if (get_artists[0]) {
                    artist = get_artists[0].textContent;
                    artist = cleanUp(artist);
                }

                var get_titles = items[i].querySelectorAll('span.trackTitle_loyWF');
                if (get_titles[0]) {
                    title = get_titles[0].innerText;
                }

                if (artist && title) {
                    createLinkButton(get_titles[0].parentElement, artist, title);
                    artists.push(artist);
                    titles.push(title);
                }
                
            }
        }

    }



    function createLinkButton(location, artist, title) {
        var searchBtn = document.createElement('a');
        searchBtn.style.userSelect = 'none';
        searchBtn.text = ""
        searchBtn.target = '_blank';
        searchBtn.style.marginLeft = '15px';

        searchBtn.href = "https://www.discogs.com/search?q=" + artist + ' ' + title;
        searchBtn.href = searchBtn.href.replaceAll('&','%26');


        searchBtn.innerHTML = '<img src=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEVHcEzV6Pjr8fiLd2j1+fx2l7Tl7fXF4v283fz///9bOyLx9fpNW3NWbY3t9f1nSzNDTF2awNaIr8jm8v2fj4Oxd0ax2Pz7/f6Ju+yBa1uu0+Ww0eOoy954X0u4glbV2+TCBBszAAAAAXRSTlMAQObYZgAAABt0RVh0U29mdHdhcmUAZ2lmMnBuZyAwLjYgKGJldGEpqt1pkgAAAI9JREFUGNNdz1kOgzAMRVESh4AJGRjKTNn/LvsMqEW9fz6y5CTjZxlitaxb07RtjkaBRVlttbZo8tjh1RZSWZZhEuHNFLeE4ASaGyCDq7/QE810Qetk7nkMM/2AzGg6FVkgDzhAxpyQBDRg16FTT6Ad87u6wODeMMcYq1eF77A/HN59/k0EG977GqWUIIC/Pl2MClkXvqPNAAAAAElFTkSuQmCC">';
        location.appendChild(searchBtn);
    }










    console.log(artists);
    console.log(titles);




})();
