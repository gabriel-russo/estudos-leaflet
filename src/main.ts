import './style.css'
import "leaflet/dist/leaflet.css";
import {Map, TileLayer} from 'leaflet';
import {ClickLogger} from "./handlers";

const map = new Map('map').setView([51.505, -0.09], 13);

const tiles = new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
map.addLayer(tiles);
map.addHandler('clickLogger', ClickLogger);
map.clickLogger.enable();
