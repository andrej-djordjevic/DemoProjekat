import type { Character } from '../services/Characters';
import '../CSS/characters.scss';

interface CharacterGridProps {
  characters: Character[];
  onCharacterClick: (character: Character) => void;
}

export const CharacterGrid = ({
  characters,
  onCharacterClick,
}: CharacterGridProps) => {
  return (
    <div className="charactersGrid">
      {characters.map((character) => (
        <div
          key={character.id}
          className="character-card"
          onClick={() => onCharacterClick(character)}
        >
          <img
            className="characterImage"
            src={character.image}
            alt={character.name}
          />
          <p>{character.name}</p>
        </div>
      ))}
    </div>
  );
};
