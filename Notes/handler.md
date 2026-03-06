# Handlers

No Leaflet, um Handler (L.Handler) é um módulo responsável por adicionar um comportamento interativo ao mapa.

Exemplos de comportamentos:

- arrastar o mapa
- zoom com scroll
- zoom com double click
- zoom com touch
- rotação por teclado
- box zoom

| Método             | Função           |
|--------------------|------------------|
| `constructor(map)` | Construtor       |
| `addHooks()`       | Registra eventos |
| `removeHooks()`    | Remove eventos   |

```typescript
import {Map, Handler, LeafletMouseEvent} from 'leaflet';

export default class MeuHandler extends Handler {
  protected _map: Map;

  constructor(map: Map) {
    super(map);
  }

  public addHooks() {
    this._map.on('click', this._click, this);
  }

  public removeHooks() {
    this._map.off('click', this._click, this);
  }

  private _click(e: LeafletMouseEvent) {
    console.log(e.latlng);
  }
}
```

## Ciclo de vida
```
criar mapa
      ↓
criar handler
      ↓
handler.enable()
      ↓
addHooks()
      ↓
registrar eventos DOM
      ↓
usuário interage
      ↓
handler executa lógica
```

Se desativar:

```
handler.disable()
      ↓
removeHooks()
      ↓
remove eventos DOM
```
