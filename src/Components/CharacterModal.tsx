import '../CSS/characterModal.scss';
import type { Character, Gender, Status } from '../services/Characters';
import { genderOptions, statusOptions } from '../services/Characters';
import { favoritesStore } from '../stores/favorites.store';
import { observer } from 'mobx-react-lite';
import { FaHeart, FaRegHeart, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';

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
    const [form] = Form.useForm();

    const character =
      allowEditing && initialCharacter
        ? favoritesStore.favorites.find((c) => c.id === initialCharacter.id) ||
          initialCharacter
        : initialCharacter;

    useEffect(() => {
      if (character) {
        form.setFieldsValue(character);
      }
    }, [character, form]);

    useEffect(() => {
      if (!isOpen) {
        setIsEditing(false);
      }
    }, [isOpen]);

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
        width={500}
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
                  className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
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
                  <Form.Item name={['location', 'name']} noStyle>
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
