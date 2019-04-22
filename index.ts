import '~/index.css';
import '~/node_modules/leaflet/dist/leaflet.css';
import 'leaflet';

import osmLayer from '~/layer/osm-layer'
import sozEinrLayer from '~/layer/soz-einrichtung'

let map = new L.Map('map');

// start the map Hamburg
map.setView(new L.LatLng(53.55, 9.98),9);
map.addLayer(osmLayer);

map.addLayer(sozEinrLayer)
var baseMaps = {
    "OpenStreetMap": osmLayer,
};

var overlayMaps = {
    "Soziale Einrichtungen": sozEinrLayer,
};

L.control.layers(baseMaps, overlayMaps).addTo(map);
