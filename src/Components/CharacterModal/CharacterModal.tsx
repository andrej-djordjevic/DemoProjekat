import type { Character, Gender, Status } from "../../modules/characters";
import { genderOptions, statusOptions } from "../../modules/characters";
import { favoritesStore } from "../../modules/auth/favorites.store";
import { observer } from "mobx-react-lite";
import { FaHeart, FaRegHeart, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import "./CharacterModal.scss";

export interface ICharacterModalProps {
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

    // Todo: constants go to the top of the component,
    // firstly we have hook calls (unless required in certain order, u might need a constant to pass to the hook), then constants
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
              {isEditing ? (
                <Form.Item name="name" noStyle>
                  <Input className="name-input" />
                </Form.Item>
              ) : (
                <h2>{character.name}</h2>
              )}
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
                {isEditing ? (
                  <Form.Item name="gender" noStyle>
                    <Select<Gender>
                      className="edit-input"
                      options={genderOptions}
                    />
                  </Form.Item>
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
                {isEditing ? (
                  <Form.Item name="species" noStyle>
                    <Input className="edit-input" placeholder="Species" />
                  </Form.Item>
                ) : (
                  <span className="detail-value">{character.species}</span>
                )}
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                {/* Todo: you can write a component that will serve as a field render and take into account editing status 
                 Generally, what we do is create a wrapper component around a ANT Design component in this case form item 
                 and when we define the props we extend ant design props there is a way to add custom props, use spread operator to 
                 pass all antd props to the component, and use your custom props for extra stuff that requires additional customization.
                 */}
                {isEditing ? (
                  <Form.Item name="status" noStyle>
                    <Select<Status>
                      className="edit-input"
                      options={statusOptions}
                    />
                  </Form.Item>
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
                {isEditing ? (
                  <Form.Item name={["location", "name"]} noStyle>
                    <Input className="edit-input" placeholder="Location" />
                  </Form.Item>
                ) : (
                  <span className="detail-value">
                    {character.location.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    );
  },
);
