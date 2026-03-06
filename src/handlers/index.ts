import ClickLogger from "./ClickLogger";

declare module 'leaflet' {
  interface Map {
    clickLogger: ClickLogger;
  }
}

export {ClickLogger};
