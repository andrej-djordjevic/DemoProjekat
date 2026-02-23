import type { ICharacter } from "../../modules/characters/characters.types";
import styles from "../../Components/Characters/Characters.module.scss";
import styles2 from "../../Components/CustomButton/CustomButton.module.scss";
import { Table } from "antd";
import { useState } from "react";
import { CustomButton } from "../CustomButton/CustomButton";

interface ICharacterGridProps {
  characters: ICharacter[];
  onCharacterClick: (character: ICharacter) => void;
}

export const CharacterGrid = ({
  characters,
  onCharacterClick,
}: ICharacterGridProps) => {
  const [tableView, setTableView] = useState(false);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img: string, record: ICharacter) => (
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
      render: (_: any, record: ICharacter) => record.location?.name,
    },
  ];

  return (
    <div>
      <div className={styles2.toggleCenter}>
        <CustomButton
          className={styles2.toggleTableViewBtn}
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
        <div className={styles.charactersGrid}>
          {characters.map((character) => (
            <div
              key={character.id}
              className={styles.characterCard}
              onClick={() => onCharacterClick(character)}
            >
              <img
                className={styles.characterImage}
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
