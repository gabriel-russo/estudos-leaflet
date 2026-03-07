import {
  CircleMarker,
  DomEvent,
  Handler,
  LatLng,
  LeafletMouseEvent,
  Map,
  Point,
  Polyline,
} from 'leaflet';

export default class DrawPolyline extends Handler {
  protected _map: Map;
  private _polyline?: Polyline;
  private _cursorMarker?: CircleMarker;
  private _cursorPosition?: LatLng;
  private _latlngs?: LatLng[];

  constructor(map: Map) {
    super(map);
  }

  public addHooks() {
    this._map.getContainer().style.cursor = 'cell';
    DomEvent.on(this._map.getContainer(), 'mousemove', this.updateCoords, this);
    this._map.on('click', this.registerVertex, this);
    this._map.on('dblclick', this.finish, this);
  }

  public removeHooks() {
    DomEvent.off(
      this._map.getContainer(),
      'mousemove',
      this.updateCoords,
      this
    );
    this._map.off('click', this.registerVertex, this);
    this._map.off('dblclick', this.finish, this);
  }

  private updateCoords(e: Event & MouseEvent) {
    this._cursorPosition = this._map.containerPointToLatLng(
      new Point(e.x, e.y)
    );
    this.updateDraw();
  }

  private updateDraw() {
    if (!this._cursorMarker) {
      this._cursorMarker = new CircleMarker(this._cursorPosition, {
        radius: 2,
        color: '#de6720',
        opacity: 0.8,
        interactive: false,
      });
      this._cursorMarker.addTo(this._map);
      return;
    }

    this._cursorMarker.setLatLng(this._cursorPosition);

    if (this._polyline) {
      if (!this._latlngs || !this._latlngs.length) {
        this._latlngs = this._polyline.getLatLngs() as LatLng[];
      }

      this._polyline.setLatLngs([...this._latlngs, this._cursorPosition]);
    }
  }

  private registerVertex(e: LeafletMouseEvent) {
    if (!this._polyline) {
      this._polyline = new Polyline([e.latlng]);
      this._polyline.addTo(this._map);
      return;
    }
    this._polyline.addLatLng(e.latlng);
    this._latlngs.splice(0);
  }

  private finish() {
    this._map.getContainer().style.cursor = 'grab';
    this._cursorMarker.removeFrom(this._map);
    delete this._cursorPosition;
    delete this._latlngs;
    this.removeHooks();
  }
}
