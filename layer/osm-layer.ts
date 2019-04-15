import 'leaflet'

const osmLayer = new L.TileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            minZoom: 8,
            maxZoom: 19,
            attribution:  'Basiskarte &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        }
    );
export default osmLayer;
