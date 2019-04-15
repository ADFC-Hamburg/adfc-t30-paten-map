import '~/index.css';
import '~/node_modules/leaflet/dist/leaflet.css';
import 'leaflet';

import osmLayer from '~/layer/osm-layer';


let map = new L.Map('map');

// start the map Hamburg
map.setView(new L.LatLng(53.55, 9.98),9);
map.addLayer(osmLayer);

/*var baseMaps = {
    "OpenStreetMap": osmLayer,
};

var overlayMaps = {
    "Cities": cities
};

L.control.layers(baseMaps, overlayMaps).addTo(map);*/
