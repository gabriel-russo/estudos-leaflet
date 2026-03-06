import './css/style.css'
import "leaflet/dist/leaflet.css";
import {Map, TileLayer} from 'leaflet';
import {ClickLogger, DrawPolyline} from "./handlers";

const map = new Map('map').setView([51.505, -0.09], 13);

map.addHandler('clickLogger', ClickLogger);
map.addHandler('drawPolyline', DrawPolyline);

/* Retire o comentário para ativar */

// map.clickLogger.enable();
// map.drawPolyline.enable();

const tiles = new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

map.addLayer(tiles);
