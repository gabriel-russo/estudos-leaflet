import { Map, Handler, LeafletMouseEvent } from 'leaflet';

export default class ClickLogger extends Handler {
  protected _map: Map;

  constructor(map: Map) {
    super(map);
  }

  public addHooks() {
    this._map.on('click', this._log, this);
  }

  public removeHooks() {
    this._map.off('click', this._log, this);
  }

  private _log(e: LeafletMouseEvent) {
    console.log(e.latlng);
  }
}
