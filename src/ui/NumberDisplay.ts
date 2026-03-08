import { Map, Tooltip } from 'leaflet';
import './NumberDisplay.css';

export default class NumberDisplay extends Tooltip {
  constructor() {
    super();
    this.options.className = 'leaflet-number-display';
    this.options.permanent = true;
    this.options.content = '';
  }
  public onAdd(map: Map): this {
    this._map = map;
    return super.onAdd(this._map);
  }

  public setValue(number: number, unit?: string) {
    let str = number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (unit) {
      str = `${str} ${unit}`;
    }

    this.setContent(str);
  }
}
