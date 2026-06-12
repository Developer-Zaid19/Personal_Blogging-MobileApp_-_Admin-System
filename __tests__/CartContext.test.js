import React from 'react';
import renderer from 'react-test-renderer';
import {CartProvider, useCart} from '../src/context/CartContext';
import products from '../src/data/Products-Json/products';

let latestContext;

const TestConsumer = () => {
  latestContext = useCart();
  return null;
};

describe('CartContext', () => {
  it('adds a product and updates totals', async () => {
    let testRenderer;

    await renderer.act(async () => {
      testRenderer = renderer.create(
        <CartProvider>
          <TestConsumer />
        </CartProvider>,
      );
    });

    expect(testRenderer).toBeTruthy();

    await renderer.act(async () => {
      latestContext.addItem(products[0]);
    });

    expect(latestContext.cartCount).toBe(1);
    expect(latestContext.totalItems).toBe(1);
    expect(latestContext.subtotal).toBe(78);
  });
});
