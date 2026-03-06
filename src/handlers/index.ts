import ClickLogger from "./ClickLogger";
import DrawPolyline from "./DrawPolyline";

declare module 'leaflet' {
  interface Map {
    clickLogger: ClickLogger;
    drawPolyline: DrawPolyline;
  }
}

export {ClickLogger, DrawPolyline};
