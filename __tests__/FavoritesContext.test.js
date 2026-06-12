import React from 'react';
import renderer from 'react-test-renderer';
import {FavoritesProvider, useFavorites} from '../src/context/FavoritesContext';
import products from '../src/data/Products-Json/products';

let latestContext;

const TestConsumer = () => {
  latestContext = useFavorites();
  return null;
};

describe('FavoritesContext', () => {
  it('adds a product to favorites and marks it as favorite', async () => {
    await renderer.act(async () => {
      renderer.create(
        <FavoritesProvider>
          <TestConsumer />
        </FavoritesProvider>,
      );
    });

    await renderer.act(async () => {
      latestContext.toggleFavorite(products[0]);
    });

    expect(latestContext.isFavorite(products[0].id)).toBe(true);
    expect(latestContext.favoriteCount).toBe(1);
    expect(latestContext.favoriteItems.length).toBe(1);
  });
});
