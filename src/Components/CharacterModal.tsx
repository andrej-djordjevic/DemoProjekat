import '../CSS/characterModal.scss';
import type { Character } from '../services/Characters';
import { favoritesStore } from '../favorites.store';
import { observer } from 'mobx-react-lite';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface Props {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CharacterModal = observer(
  ({ character, isOpen, onClose }: Props) => {
    if (!isOpen || !character) return null;

    const isFavorite = favoritesStore.isFavorite(character.id);
    const handleFavoriteClick = () => {
      favoritesStore.toggleFavorite(character);
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
          <img
            src={character.image}
            alt={character.name}
            className="modal-image"
          />
          <div className="modal-header">
            <h2>{character.name}</h2>
            <button
              className={`favorite-button `}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? (
                <FaHeart size={24} color="red" />
              ) : (
                <FaRegHeart size={24} />
              )}
            </button>
          </div>
          <div className="character-details">
            <div className="detail-item">
              <span className="detail-label">Gender:</span>
              <span
                className={`detail-value gender-${character.gender.toLowerCase()}`}
              >
                {character.gender}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Species:</span>
              <span className="detail-value">{character.species}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status:</span>
              <span
                className={`detail-value status-${character.status.toLowerCase()}`}
              >
                {character.status}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{character.location.name}</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
