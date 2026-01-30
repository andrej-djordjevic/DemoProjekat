import '../CSS/characterModal.scss';
import type { Character } from '../services/Characters';
import { favoritesStore } from '../favorites.store';
import { observer } from 'mobx-react-lite';
import { FaHeart, FaRegHeart, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface Props {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
  allowEditing?: boolean;
}

export const CharacterModal = observer(
  ({
    character: initialCharacter,
    isOpen,
    onClose,
    allowEditing = false,
  }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCharacter, setEditedCharacter] = useState<Character | null>(
      null,
    );

    const character =
      allowEditing && initialCharacter
        ? favoritesStore.favorites.find((c) => c.id === initialCharacter.id) ||
          initialCharacter
        : initialCharacter;

    useEffect(() => {
      if (character) {
        setEditedCharacter(character);
      }
    }, [character]);

    if (!isOpen || !character) return null;

    const isFavorite = favoritesStore.isFavorite(character.id);
    const handleFavoriteClick = () => {
      favoritesStore.toggleFavorite(character);
    };

    const handleEditClick = () => {
      setIsEditing(true);
      setEditedCharacter({ ...character });
    };

    const handleSaveEdit = () => {
      if (editedCharacter) {
        favoritesStore.updateFavorite(character.id, editedCharacter);
        setIsEditing(false);
      }
    };

    const handleCancelEdit = () => {
      setIsEditing(false);
      setEditedCharacter(character);
    };

    const handleInputChange = (
      field: keyof Character,
      value: string | { name: string; url: string },
    ) => {
      if (editedCharacter) {
        setEditedCharacter((prev) =>
          prev
            ? {
                ...prev,
                [field]: value,
              }
            : null,
        );
      }
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
            {isEditing && editedCharacter ? (
              <input
                type="text"
                value={editedCharacter.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="edit-input name-input"
                placeholder="Character name"
              />
            ) : (
              <h2>{character.name}</h2>
            )}
            <div className="modal-actions">
              {isFavorite && !isEditing && allowEditing && (
                <button className="edit-button" onClick={handleEditClick}>
                  <FaEdit />
                </button>
              )}
              {isEditing && (
                <>
                  <button className="save-button" onClick={handleSaveEdit}>
                    <FaSave />
                  </button>
                  <button className="cancel-button" onClick={handleCancelEdit}>
                    <FaTimes />
                  </button>
                </>
              )}
              <button
                className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
                onClick={handleFavoriteClick}
              >
                {isFavorite ? (
                  <FaHeart size={24} color="red" />
                ) : (
                  <FaRegHeart size={24} />
                )}
              </button>
            </div>
          </div>
          <div className="character-details">
            <div className="detail-item">
              <span className="detail-label">Gender:</span>
              {isEditing && editedCharacter ? (
                <select
                  value={editedCharacter.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="edit-input"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Genderless">Genderless</option>
                  <option value="unknown">Unknown</option>
                </select>
              ) : (
                <span
                  className={`detail-value gender-${character.gender.toLowerCase()}`}
                >
                  {character.gender}
                </span>
              )}
            </div>
            <div className="detail-item">
              <span className="detail-label">Species:</span>
              {isEditing && editedCharacter ? (
                <input
                  type="text"
                  value={editedCharacter.species}
                  onChange={(e) => handleInputChange('species', e.target.value)}
                  className="edit-input"
                  placeholder="Species"
                />
              ) : (
                <span className="detail-value">{character.species}</span>
              )}
            </div>
            <div className="detail-item">
              <span className="detail-label">Status:</span>
              {isEditing && editedCharacter ? (
                <select
                  value={editedCharacter.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="edit-input"
                >
                  <option value="Alive">Alive</option>
                  <option value="Dead">Dead</option>
                  <option value="unknown">Unknown</option>
                </select>
              ) : (
                <span
                  className={`detail-value status-${character.status.toLowerCase()}`}
                >
                  {character.status}
                </span>
              )}
            </div>
            <div className="detail-item">
              <span className="detail-label">Location:</span>
              {isEditing && editedCharacter ? (
                <input
                  type="text"
                  value={editedCharacter.location.name}
                  onChange={(e) =>
                    handleInputChange('location', {
                      ...editedCharacter.location,
                      name: e.target.value,
                    })
                  }
                  className="edit-input"
                  placeholder="Location"
                />
              ) : (
                <span className="detail-value">{character.location.name}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
