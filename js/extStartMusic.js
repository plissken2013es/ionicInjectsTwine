window.globalStartMusic = function()  {
    var currentTrack = 0;
    var tracks = ["bso1", "bso2", "bso3"];
    var bso = playSound(tracks[currentTrack++]);
    if (currentTrack >= 3) currentTrack = 0;
    console.log(bso);
    bso.onended = function(ev) {
        console.log(ev);
        console.log("bso track on end");
        playSound(tracks[currentTrack++]);
        if (currentTrack >= 3) currentTrack = 0;
    };
};