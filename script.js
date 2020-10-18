(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        var c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            var kell = h >= 12 ? " p.m." : " a.m."
            if (h > 12) {
                h = h - 12
                if (h < 10) {
                    h = "0" + h
                }
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + kell;

        };

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    var e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {
        event.preventDefault();

        var linn = document.getElementById("linn");

        var fnimi = document.getElementById("fname")
        var lnimi = document.getElementById("lname")

        function valideeri(string) {
            var tähed = /^[A-Za-z]+$/;
            if ((string.value === "") || (!(tähed.test(string.value)))) return true;
        }
        if ((valideeri(fnimi) || valideeri(lnimi))) alert("Nimi ei tohi olla tühi ega sisaldada numbreid")

        const swed = document.getElementById("Swedbank").checked
        const seb = document.getElementById("SEB").checked
        const kred = document.getElementById("Krediitkaart").checked
        if (!(swed || seb || kred)) alert("Valige makseviis")


        if (linn.value === "") {

            alert("Palun valige linn nimekirjast");

            linn.focus();

            return;


        }

        else {

            const linnad = ["tln", "trt", "nrv", "prn"]
            const hinnad = ["0,00", "2,50", "2,50", "3,00"]
            const index = linnad.indexOf(linn.value)
            e.innerHTML = hinnad[index] + " €";

        }

        console.log("Tarne hind on arvutatud");

    }

})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map;

function GetMap() {

    "use strict";

    var centerPoint = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );
    var centerPoint2 = new Microsoft.Maps.Location(
        58.3584937,
        25.5834755
    );

    const kesk = new Microsoft.Maps.Location(
        (58.38104 + 58.3584937) / 2,
        (26.71992 + 25.5834755) / 2
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        zoom: 10,
        center: kesk,
        mapTypeId: Microsoft.Maps.MapTypeId.road,

    });

    var pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
        title: 'Tartu Ülikool',
        //subTitle: 'Hea koht',
        //text: 'UT'
    });
    var pushpin2 = new Microsoft.Maps.Pushpin(centerPoint2, {
        title: 'Viljandi rippsild',
        //subTitle: 'Hea koht',
        //text: 'UT'
    });
    map.entities.push(pushpin2)
    map.entities.push(pushpin);

    var infoTartu = new Microsoft.Maps.Infobox(centerPoint, {
        title: 'Tartu Ülikool',
        description: 'Tartu Ülikool'
    });
    var infoVilj = new Microsoft.Maps.Infobox(centerPoint2, {
        title: 'Viljandi Rippsild',
        description: 'Viljandi'
    });

    //Assign the infobox to a map instance.

    Microsoft.Maps.Events.addHandler(pushpin, 'click', function () { infoTartu.setMap(map); });
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', function () { infoVilj.setMap(map); });


}


// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

