import type { Character } from "../../modules/characters";
import "../../Components/Characters/Characters.scss";

interface CharacterGridProps {
  characters: Character[];
  onCharacterClick: (character: Character) => void;
}

export const CharacterGrid = ({
  characters,
  onCharacterClick,
}: CharacterGridProps) => {
  return (
    // Todo: Make it toggleable between this grid , or a implementation that uses ANTD Table component
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
