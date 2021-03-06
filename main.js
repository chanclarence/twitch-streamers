$(document).ready(function () {
    var usernames = ["SabbatTC", "reiner72", "aDotaHero", "Food", "thejustinwilsonshow", "rebbybear", "Gildedguy", "atsnowy", "Tricky_Digits", "amandalapalme", "Shilin", "recordingmonsterstudios", "netenho1", "Destange", "LovelyDeerist", "isosine", "RelaxBeats", "JOVIAN", "KristiKates", "deadmau5", "Nightcrawlerxme", "Coestar", "kuyanicwxc", "Dr_riggo", "LIRIK", "DrDisRespectLIVE", "TSM_Viss", "UrgentFury", "Voqals", "throwback", "isatudown", "Hottest", "heatherhearts", "Ninja", "sodapoppin", "shroud", "TSM_Myth", "starhor_z", "crytogood", "tooshi", "ESL_SC2", "OgamingSC2", "cretetion", "dotademon", "jakenbakelive", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    var dataSet = [];
    var counter = 0;
    var liveStatus, statusDescription;
    usernames.forEach(function (username) {
        var apiStreamsUrl = "https://wind-bow.glitch.me/twitch-api/streams/"
        var apiChannelsUrl = "https://wind-bow.glitch.me/twitch-api/channels/"
        apiStreamsUrl += username;
        apiChannelsUrl += username;

        $.getJSON(apiStreamsUrl, function (json) {
            if (json.stream === null) {
                liveStatus = '<span class="badge badge-danger">Offline</span>';
                statusDescription = "";
                dataSet.push({ username, liveStatus, statusDescription });
            } else {
                liveStatus = '<span class="badge badge-success">Online</span>';
                statusDescription = json.stream.channel.status;
                dataSet.push({ username, liveStatus, statusDescription });
                $("#userLogos").append('<a href="' + json.stream.channel.url + '" target="_blank"><img src="' + json.stream.channel.logo + '" title="' + statusDescription + '" id="userLogo" style="width: 40px"></a>');
            }

            counter++;
            if (counter === usernames.length) {
                $('#currentlyOnline').show();
                $('#userLogos').show();
                $('#table').show();
                $('footer').show();
                $('#table').DataTable({
                    data: dataSet,
                    columns: [
                        { data: "username" },
                        { data: "liveStatus" },
                        { data: "statusDescription" },
                    ],
                    "columnDefs": [{
                        "targets": 0,
                        "data": "username",
                        "render": function (data, type, row, meta) {
                            return '<a href=' + '"https://www.twitch.tv/' + data + '" target="_blank">' + data + '</a>';
                        }
                    }]
                });
            }
        });
    });
});