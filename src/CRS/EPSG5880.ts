import { LatLng } from 'leaflet';
// @ts-ignore
import proj4 from 'proj4';

export default class EPSG5880 {
  static def: string =
    '+proj=poly ' +
    '+lat_0=0 ' +
    '+lon_0=-54 ' +
    '+x_0=5000000 ' +
    '+y_0=10000000 ' +
    '+ellps=GRS80 ' +
    '+towgs84=0,0,0,0,0,0,0 ' +
    '+units=m ' +
    '+no_defs ' +
    '+type=crs';

  static convert(latlng: LatLng): LatLng {
    // if only 1 projection is given then it is assumed that it is being projected from WGS84 (fromProjection is WGS84).
    const [x, y] = proj4(EPSG5880.def, [latlng.lng, latlng.lat]);
    return new LatLng(y, x);
  }

  static distance(p1: LatLng, p2: LatLng) {
    const _p1 = EPSG5880.convert(p1);
    const _p2 = EPSG5880.convert(p2);

    const dx = _p2.lng - _p1.lng;
    const dy = _p2.lat - _p1.lat;

    // Distancia Euclidiana
    return Math.sqrt(dx * dx + dy * dy);
  }
}
