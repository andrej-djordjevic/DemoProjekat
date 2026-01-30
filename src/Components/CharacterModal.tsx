import '../CSS/characterModal.scss';
import type { Character } from '../services/Characters';

interface Props {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CharacterModal = ({ character, isOpen, onClose }: Props) => {
  if (!isOpen || !character) return null;

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
        <h2>{character.name}</h2>
      </div>
    </div>
  );
};
