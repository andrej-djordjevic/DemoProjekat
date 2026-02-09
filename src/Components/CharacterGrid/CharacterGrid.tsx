import type { Character } from "../../modules/characters";
import "../../Components/Characters/Characters.scss";
import { Table } from "antd";
import { useState } from "react";
import { CustomButton } from "../CustomButton/CustomButton";

interface CharacterGridProps {
  characters: Character[];
  onCharacterClick: (character: Character) => void;
}

export const CharacterGrid = ({
  characters,
  onCharacterClick,
}: CharacterGridProps) => {
  const [tableView, setTableView] = useState(false);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img: string, record: Character) => (
        <img
          src={img}
          alt={record.name}
          style={{ width: 60, borderRadius: 8 }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Species",
      dataIndex: "species",
      key: "species",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Location",
      dataIndex: ["location", "name"],
      key: "location",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: Character) => record.location?.name,
    },
  ];

  return (
    <div>
      <div className="toggle-center">
        <CustomButton
          className="toggle-tableView-Btn"
          onClick={() => setTableView((v) => !v)}
        >
          Switch to {tableView ? "Grid" : "Table"} View
        </CustomButton>
      </div>
      {tableView ? (
        <Table
          dataSource={characters}
          columns={columns}
          rowKey="id"
          pagination={false}
          onRow={(record) => ({
            onClick: () => onCharacterClick(record),
            style: { cursor: "pointer" },
          })}
        />
      ) : (
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
      )}
    </div>
  );
};
