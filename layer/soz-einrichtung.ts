import 'leaflet'
import $ from 'jquery'

const FARBE='rot'
const URL = 'https://tools.adfc-hamburg.de/t30-paten/version0.0.8/assets/sozEinr.json'

// 0= prüfen
// 1= nicht T30
// 2= alles Okay
// 3= Angeordnet
// 4= Abgelehnt
const FARBCODE = ['#0554fa','#ef140d','#f7ab05', '#44f917', '#e7ff08','#000000' ]

const POPUP_TEXT = ['Wir wissen nicht sicher, ob hier überall Tempo 30 ist. <br>[t30da:Hier ist schon Tempo 30]  [t30antrag:Ich setze mich hier für Tempo 30 ein!] [t30fordern:Hier sollte mal jemand was tun]',
                    'Hier ist mindestens einen Straße ohne Tempo 30 <br>[details:Details] [t30fordern:Ich will mich hier für Tempo 30 einsetzen]',
                    'Dieser Ort ist Verkehrsberühigt <br>[details:Details] [fehler:Fehler melden]',
                    'Die Behörde hat Tempo 30 angeordnet, nur das Schild steht noch nicht <br>[details:Details] [fehler:Fehler melden]',
                    'Wir sehen hier keine Chance auf Tempo 30 <br>[details:Details] [fehler:Fehler melden]'];

function Popup (feature, layer) {
    console.log();
    let p = POPUP_TEXT[feature.properties.tempo30];
    p = p.replace(/\[([^:]*):([^\]]*)\]/g,'<button data-id="' + feature.properties.id + '" data-action="$1" class="adfc-map-button adfc-map-button-$1">$2</button>');
    layer.bindPopup('<b>'+feature.properties.Name+ '</b><br>' +
                    feature.properties.Strasse +' '+feature.properties.Nummer+ ', '+ feature.properties.PLZ+' Hamburg<br>'+
                    '<b>Stand der Dinge:</b>' + p;
                   )
}


let CustomIcon = L.Icon.extend({
    options: {
	iconSize:     [25, 25],
	shadowSize:   [25, 25],
	iconAnchor:   [12, 12],
	shadowAnchor: [0,0],
	popupAnchor:  [-1, -11]
    }
});

//const starSvg='<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" class="star rating" data-rating="1"><polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill:lime;stroke:purple;stroke-width:1;"/></svg>'

function createSvgIcon(idx) {
    const farbe = FARBCODE[idx];
    const starSvg='<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" class="star rating" data-rating="1">'+
        '<polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill:'+
        farbe+';"/>'+
        '</svg>'

    const url='data:image/svg+xml;base64,'+ window.btoa(starSvg)

    return new CustomIcon({iconUrl: url})

}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function iconSetzen(feature, latlng) {

    return L.marker(latlng, { 'icon': createSvgIcon(feature.properties.tempo30) });
    }
let sozEinrLayer = new L.geoJSON(null,{
    'onEachFeature': Popup,
    'pointToLayer': iconSetzen
});

$.ajax({
    dataType: 'json',
    url: URL,
    success: function (data) {
        let items=[]
        for (let item of data) {
            item.tempo30=getRandomInt(0,4);
            items.push({
                "type": "Feature",
                "properties": item
                "geometry": {
                    "type": "Point",
                    "coordinates": [ item.lon, item.lat ]
                }
            });
        }
        var geoJson=  {
            "type": "FeatureCollection",
            "name": "KeinTempo30ohne",
            "crs": {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                }
            },
            "features": items
        }
        sozEinrLayer.addData(geoJson);
    }
});

/*
  {
"type": "FeatureCollection",
"name": "KeinTempo30ohne",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "A": "1", "Name": "Ev. KiTa Arche Noah", "Straße": "Manshardtstraße", "Nr.": "105f", "PLZ": "22119", "Nummer": "105f" },
"geometry": { "type": "Point", "coordinates": [ 10.1045831, 53.5591532 ] } },

[{"Bezirk": "Harburg", "art": 3, "Nummer": "34", "PLZ": "21077", "tempo30": 1, "Strasse": "Am Frankenberg", "lat": 53.43802815, "Name": "Haus am Frankenberg", "id": 0, "lon": 9.98145757437306},



*/
export default sozEinrLayer;
$(document).ready(function() {
    $("body").click(function(event){
        let $t = $(event.target)
        if ($t.is("button.adfc-map-button") {
            const id=$t.attr('data-id');
            const action=$t.attr('data-action');
            alert(action + id);
        }
    });
});
