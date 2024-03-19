import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export const EventForm = ({ onSubmit, onCancel, defaultValues, show }) => {
  const [formData, setFormData] = useState(defaultValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(defaultValues);
    onSubmit(formData, defaultValues?.id);
    setFormData({});
  };

  return (
    <Modal
      show={show}
      onHide={onCancel}
      animation={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Prendre un rendez-vous</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit} className="p-1">
        <Modal.Body>
          <div className="row mb-2">
            <label className="col-4">Date:</label>
            <input
              className="col-5"
              type="date"
              name="date"
              value={formData.date || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row mb-2">
            <label className="col-4">Heure:</label>
            <input
              className="col-5"
              type="time"
              name="time"
              value={formData.time || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row mb-2">
            <label className="col-4">Nom du patient:</label>
            <input
              className="col-5"
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row mb-2">
            <label className="col-4">Téléphone:</label>
            <input
              className="col-5"
              type="text"
              pattern="0[157]{1}[0-9]{8}"
              maxLength={10}
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              required
            />
          </div>

          {/* Additional form fields for event details */}
          {/* <div>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div> */}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onCancel}>
            Annuler
          </Button>
          <Button variant="primary" type="submit">
            Enregistrer
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
