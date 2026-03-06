import {CircleMarker, DomEvent, Handler, LatLng, LeafletMouseEvent, Map, Point, Polyline} from 'leaflet';

export default class DrawPolyline extends Handler {
  protected _map: Map;
  private _cursorMarker?: CircleMarker;
  private _cursorPosition?: LatLng
  private _polyline?: Polyline
  private _latlngs?: LatLng[];

  constructor(map: Map) {
    super(map);
  }

  public addHooks() {
    DomEvent.on(this._map.getContainer(), 'mousemove', this._updateCoords, this);
    this._map.on('click', this._registerVertix, this);
    this._map.on('dblclick', this._finishPolyline, this);
  }

  public removeHooks() {
    DomEvent.off(this._map.getContainer(), 'mousemove', this._updateCoords, this);
    this._map.off('click', this._registerVertix, this);
    this._map.off('dblclick', this._finishPolyline, this);
  }

  private _updateCoords(e: Event & MouseEvent) {
    if (!e) {
      return;
    }
    this._cursorPosition = this._map.containerPointToLatLng(new Point(e.x, e.y));
    this.updateDraw();
  }

  private _savePolylineCoords() {
    this._latlngs = this._polyline.getLatLngs() as LatLng[];
  }

  private updateDraw() {
    if (!this._cursorMarker) {
      this._cursorMarker = new CircleMarker(this._cursorPosition, {radius: 5, color: 'red'});
      this._cursorMarker.addTo(this._map);
      return;
    }

    this._cursorMarker.setLatLng(this._cursorPosition);

    if (this._polyline) {

      if (!this._latlngs || !this._latlngs.length) {
        this._savePolylineCoords();
      }

      this._polyline.setLatLngs([...this._latlngs, this._cursorPosition]);
    }
  }

  private _registerVertix(e: LeafletMouseEvent) {
    if (!this._polyline) {
      this._polyline = new Polyline([e.latlng]);
      this._polyline.addTo(this._map);
      return;
    }
    this._polyline.addLatLng(e.latlng);
    this._latlngs.splice(0);
  }

  private _finishPolyline() {
    this._cursorMarker.removeFrom(this._map);
    delete this._cursorPosition;
    delete this._latlngs;
    this.removeHooks();
  }
}
