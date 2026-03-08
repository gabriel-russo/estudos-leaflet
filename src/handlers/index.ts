import ClickLogger from './ClickLogger';
import DrawPolyline from './DrawPolyline';
import Ruler from './Ruler';

declare module 'leaflet' {
  interface Map {
    clickLogger: ClickLogger;
    drawPolyline: DrawPolyline;
    ruler: Ruler;
  }
}

export { ClickLogger, DrawPolyline, Ruler };
