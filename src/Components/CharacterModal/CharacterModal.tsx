import {
  genderOptions,
  statusOptions,
  type ICharacter,
} from "../../modules/characters/characters.types";
import { favoritesStore } from "../../modules/auth/favorites.store";
import { observer } from "mobx-react-lite";
import { FaHeart, FaRegHeart, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Modal, Form } from "antd";
import { FieldRender } from "./FieldRender";
import styles from "./CharacterModal.module.scss";
import { CustomButton } from "../CustomButton/CustomButton";

export interface ICharacterModalProps {
  character: ICharacter | null;
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
  }: ICharacterModalProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();

    const character = (() => {
      const isEditMode = allowEditing && initialCharacter;
      if (!isEditMode) return initialCharacter;
      const favoriteCharacter = favoritesStore.favorites.find(
        (c) => c.id === initialCharacter.id,
      );
      return favoriteCharacter || initialCharacter;
    })();

    if (!character) return null;

    const isFavorite = favoritesStore.isFavorite(character.id);

    const handleFavoriteClick = () => {
      favoritesStore.toggleFavorite(character);
    };

    const handleEditClick = () => {
      setIsEditing(true);
      form.setFieldsValue(character);
    };

    const handleSaveEdit = () => {
      form.validateFields().then((values) => {
        const updated = { ...character, ...values };
        favoritesStore.updateFavorite(character.id, updated);
        setIsEditing(false);
      });
    };

    const handleCancelEdit = () => {
      setIsEditing(false);
      form.resetFields();
    };

    return (
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={400}
        centered
        className="modal-centered"
      >
        <Form form={form}>
          <div className={styles["modal-content"]}>
            <img
              src={character.image}
              alt={character.name}
              className={styles["modal-image"]}
            />
            <div className={styles["modal-header"]}>
              <FieldRender
                editing={isEditing}
                name="name"
                className={styles["name-input"]}
                renderDisplay={() => <h2>{character.name}</h2>}
              />
              <div className={styles["modal-actions"]}>
                {isFavorite && !isEditing && allowEditing && (
                  <CustomButton
                    type="text"
                    icon={<FaEdit />}
                    onClick={handleEditClick}
                    className={styles["edit-button"]}
                  />
                )}
                {isEditing && (
                  <>
                    <CustomButton
                      type="primary"
                      icon={<FaSave />}
                      onClick={handleSaveEdit}
                      className={styles["save-button"]}
                    />
                    <CustomButton
                      type="text"
                      icon={<FaTimes />}
                      onClick={handleCancelEdit}
                      className={styles["cancel-button"]}
                    />
                  </>
                )}
                <CustomButton
                  type="text"
                  icon={
                    isFavorite ? (
                      <FaHeart size={24} color="red" />
                    ) : (
                      <FaRegHeart size={24} />
                    )
                  }
                  onClick={handleFavoriteClick}
                  className={`favorite-button ${isFavorite ? "favorite" : ""}`}
                />
              </div>
            </div>
            <div className={styles["character-details"]}>
              <div className={styles["detail-item"]}>
                <span className={styles["detail-label"]}>Gender:</span>
                <FieldRender
                  editing={isEditing}
                  name="gender"
                  fieldType="select"
                  className={styles["edit-input"]}
                  options={genderOptions}
                  renderDisplay={() => (
                    <span
                      className={`${styles["detail-value"]} ${styles[`gender-${character.gender.toLowerCase()}`]}`}
                    >
                      {character.gender}
                    </span>
                  )}
                />
              </div>
              <div className={styles["detail-item"]}>
                <span className={styles["detail-label"]}>Species:</span>
                <FieldRender
                  editing={isEditing}
                  name="species"
                  className={styles["edit-input"]}
                  placeholder="Species"
                  renderDisplay={() => (
                    <span className={`${styles["detail-value"]}`}>
                      {character.species}
                    </span>
                  )}
                />
              </div>
              <div className={styles["detail-item"]}>
                <span className={styles["detail-label"]}>Status:</span>
                <FieldRender
                  editing={isEditing}
                  name="status"
                  fieldType="select"
                  className={styles["edit-input"]}
                  options={statusOptions}
                  renderDisplay={() => (
                    <span
                      className={`${styles["detail-value"]} ${styles[`status-${character.status.toLowerCase()}`]}`}
                    >
                      {character.status}
                    </span>
                  )}
                />
              </div>
              <div className={styles["detail-item"]}>
                <span className={styles["detail-label"]}>Location:</span>
                <FieldRender
                  editing={isEditing}
                  name={["location", "name"]}
                  className={styles["edit-input"]}
                  placeholder="Location"
                  renderDisplay={() => (
                    <span className={styles["detail-value"]}>
                      {character.location.name}
                    </span>
                  )}
                />
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    );
  },
);
