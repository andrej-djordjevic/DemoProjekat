import {
  genderOptions,
  statusOptions,
  type ICharacter,
} from "../../modules/characters/characters.types";
import { favoritesStore } from "../../modules/auth/favorites.store";
import { observer } from "mobx-react-lite";
import { FaHeart, FaRegHeart, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Modal, Form, Button } from "antd";
import { FieldRender } from "./FieldRender";
import "./CharacterModal.scss";

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
          <div className="modal-content">
            <img
              src={character.image}
              alt={character.name}
              className="modal-image"
            />
            <div className="modal-header">
              <FieldRender
                editing={isEditing}
                name="name"
                className="name-input"
                renderDisplay={() => <h2>{character.name}</h2>}
              />
              <div className="modal-actions">
                {isFavorite && !isEditing && allowEditing && (
                  <Button
                    type="text"
                    icon={<FaEdit />}
                    onClick={handleEditClick}
                    className="edit-button"
                  />
                )}
                {isEditing && (
                  <>
                    <Button
                      type="primary"
                      icon={<FaSave />}
                      onClick={handleSaveEdit}
                      className="save-button"
                    />
                    <Button
                      type="text"
                      icon={<FaTimes />}
                      onClick={handleCancelEdit}
                      className="cancel-button"
                    />
                  </>
                )}
                <Button
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
            <div className="character-details">
              <div className="detail-item">
                <span className="detail-label">Gender:</span>
                <FieldRender
                  editing={isEditing}
                  name="gender"
                  fieldType="select"
                  className="edit-input"
                  options={genderOptions}
                  renderDisplay={() => (
                    <span
                      className={`detail-value gender-${character.gender.toLowerCase()}`}
                    >
                      {character.gender}
                    </span>
                  )}
                />
              </div>
              <div className="detail-item">
                <span className="detail-label">Species:</span>
                <FieldRender
                  editing={isEditing}
                  name="species"
                  className="edit-input"
                  placeholder="Species"
                  renderDisplay={() => (
                    <span className="detail-value">{character.species}</span>
                  )}
                />
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <FieldRender
                  editing={isEditing}
                  name="status"
                  fieldType="select"
                  className="edit-input"
                  options={statusOptions}
                  renderDisplay={() => (
                    <span
                      className={`detail-value status-${character.status.toLowerCase()}`}
                    >
                      {character.status}
                    </span>
                  )}
                />
              </div>
              <div className="detail-item">
                <span className="detail-label">Location:</span>
                <FieldRender
                  editing={isEditing}
                  name={["location", "name"]}
                  className="edit-input"
                  placeholder="Location"
                  renderDisplay={() => (
                    <span className="detail-value">
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
