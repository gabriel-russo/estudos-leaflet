import {Map, Handler, DomEvent} from 'leaflet';

export default class ClickLogger extends Handler {
  protected _map: Map;

  constructor(map: Map) {
    super(map);
    this._map = map;
  }

  addHooks() {
    DomEvent.on(this._map.getContainer(), 'click', this._log, this);
  }

  removeHooks() {
    DomEvent.off(this._map.getContainer(), 'click', this._log, this);
  }

  _log(e) {
    console.log(e);
  }
}
