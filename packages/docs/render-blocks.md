# Render Blocks

In BlockSuite, blocks can be rendered by any UI framework. A block should be rendered to a DOM element, and we use `view` to represent the renderer.

By default, we provide a [lit](https://lit.dev/) renderer called `@blocksuite/lit`.
But it's still possible to use other UI frameworks. We'll introduce later about how to write a custom renderer in [custom renderer](/#WIP).

## Lit Block View

We provide a `BlockElement` class to help build a lit block view.

```typescript
import { defineBlockSchema, type SchemaToModel } from '@blocksuite/store';
import { BlockElement } from '@blocksuite/lit';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

const myBlockSchema = defineBlockSchema({
  //...
  props: () => ({
    count: 0,
  }),
});

type MyBlockModel = SchemaToModel<typeof myBlockSchema>;

@customElements('my-block')
class MyBlockView extends BlockElement<MyBlockModel> {
  override render() {
    return html`
      <div>
        <h3>My Block</h3>
      </div>
    `;
  }
}
```

## Render Children

A block can have children, and we can render them by using `content` property.

```typescript
@customElements('my-block')
class MyBlockView extends BlockElement<MyBlockModel> {
  override render() {
    return html`
      <div>
        <h3>My Block</h3>
        ${this.content}
      </div>
    `;
  }
}
```

## Get & Set Props

It's easy to get and set props in a block view.

```typescript
@customElements('my-block')
class MyBlockView extends BlockElement<MyBlockModel> {
  private _onClick = () => {
    this.page.updateBlock(this.model, {
      count: this.model.count + 1,
    });
  };

  override render() {
    return html`
      <div>
        <h3>My Block</h3>
        <p>Count: ${this.model.count}</p>
        <button @click=${this._onClick}>Add</button>
      </div>
    `;
  }
}
```

It's also possible to watch prop changes to create something like `computed props`:

```typescript
@customElements('my-block')
class MyBlockView extends BlockElement<MyBlockModel> {
  private _yen = '0¥';

  override connectedCallback() {
    super.connectedCallback();

    this.model.propsUpdated.on(() => {
      this._yen = `${this.model.count * 100}¥`;
    });
  }

  override render() {
    return html`
      <div>
        <h3>My Block</h3>
        <p>Price: ${this._yen}</p>
        <button @click=${this._onClick}>Add</button>
      </div>
    `;
  }
}
```
