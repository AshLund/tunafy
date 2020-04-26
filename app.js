
$("#submitBtn").on("click", function (event) {
    var search = $("#searchName").val().trim();
    console.log(search);
    if (search === "") {
        console.log('please enter an artist');
        $('#errorAlert').text("Please Enter An Artist.")
        return false
    } else {
    var noError = "";
    $('#errorAlert').text(noError)
    $("#gif").empty();
    $("#topTracks").empty();
    event.preventDefault();
    var apiKey = "AIzaSyDxltz2D44dwY72zZCAMZw7NR-s37e3Evo";

    var apiKey10 ="3210dee919595df6a421526e3f0a6d13";
    var apiKeygiphy= "dJZAoTE5oJZcb8BOEXkAExAi85YngNzf";
    var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + search + '&type=video&videoEmbeddable=true&order=viewCount' + '&maxResults=25&key=' + apiKey
    var url1 = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKeygiphy +  "&limit=10"
    //?method=artist.gettoptracks
    var url2 = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + search + "&api_key=" + apiKey10 + "&format=json"
    //Get Artist TOP Tracks
    var url3 = "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + search + "&api_key=" + apiKey10 + "&format=json"
    $.ajax({
        url: url,
        method: 'GET'
    }).then(function (response) {
        console.log(response)
        // ================== GIPHY API ==================== // 
        $.ajax({
            url: url1,
            method: 'GET'
        }).then(function (gifResponse) {
            for (var j = 0; j < 9; j++) {
                var gif = $('<img>', {
                    id: 'gifImg',
                    src: gifResponse.data[j].images.fixed_height.url
                })
                gif.appendTo($('#gif'))
                console.log(gifResponse)
            }
        })
        // ================== Last FM API ==================== // 
        $.ajax({
            url: url2,
            method: 'GET'
        }).then(function (lastFMResponse) {
            console.log(lastFMResponse)
            var artist = lastFMResponse.artist.name
            var artistBio = lastFMResponse.artist.bio.summary
            console.log(artist + " " + artistBio)
            $('#bio').html(artistBio)
        })
        // ================== Last FM API For Getting Top Tracks ==================== // 
        $.ajax({
            url: url3,
            method: 'GET'
        }).then(function (lastFMResponseTopTracks) {
            console.log(lastFMResponseTopTracks)

            for (var a = 0; a < 10; a++) {
                console.log(lastFMResponseTopTracks.toptracks.track[a].name)
                console.log(lastFMResponseTopTracks.toptracks.track[a].url)
                $('#topTracks').append(lastFMResponseTopTracks.toptracks.track[a].name + "<br>")

            }
        })
        for (var i = 1; i < 10; i++) {
            var videoSrc = 'https://www.youtube.com/embed/' + response.items[i].id.videoId + '?autoplay=0'
            var thumbSrc = response.items[i].snippet.thumbnails.high.url
            console.log


                console.log(videoSrc)
            const iFrame = $("#vid-" + i)
            iFrame.attr("src", videoSrc)
            const iThumb=$("#img-" + i)
            iThumb.attr("src", thumbSrc)
            console.log(iThumb + "this is not working")


            // var video = $('<iframe />', {
            //     id: 'video',
            //     src: videoSrc
            // });
            // video.appendTo($('#vid-[i]'))
            // var results = response;
            // console.log(results.items)
            // }
        }
        // Init Animations data-aos = ...
        // AOS.init();
    })
    }
}) 