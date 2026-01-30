import { makeAutoObservable, runInAction } from 'mobx';
import type { Character } from './services/Characters';

export class FavoritesStore {
  favorites: Character[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFavorites();
  }

  loadFavorites() {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      try {
        this.favorites = JSON.parse(stored);
      } catch (error) {
        console.error('Error loading favorites:', error);
        this.favorites = [];
      }
    }
  }

  saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  isFavorite(characterId: number): boolean {
    return this.favorites.some((char) => char.id === characterId);
  }

  addToFavorites(character: Character) {
    if (!this.isFavorite(character.id)) {
      runInAction(() => {
        this.favorites.push(character);
        this.saveFavorites();
      });
    }
  }

  removeFromFavorites(characterId: number) {
    runInAction(() => {
      this.favorites = this.favorites.filter((char) => char.id !== characterId);
      this.saveFavorites();
    });
  }

  toggleFavorite(character: Character) {
    if (this.isFavorite(character.id)) {
      this.removeFromFavorites(character.id);
    } else {
      this.addToFavorites(character);
    }
  }

  updateFavorite(characterId: number, updatedCharacter: Character) {
    runInAction(() => {
      const index = this.favorites.findIndex((char) => char.id === characterId);
      if (index !== -1) {
        this.favorites[index] = {
          ...this.favorites[index],
          ...updatedCharacter,
        };
        this.saveFavorites();
      }
    });
  }
}

export const favoritesStore = new FavoritesStore();
