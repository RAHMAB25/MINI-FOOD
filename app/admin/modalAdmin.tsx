'use client';

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type ModalAdminProps = {
  show: boolean;
  handleClose: () => void;
  Data: {
    id: number;
    nom: string;
    etat: string;
  } | null;
  onEtatChange: (etat: string) => void;
  onSave: () => void;
};

export default function ModalAdmin({
  show,
  handleClose,
  Data,
  onEtatChange,
  onSave,
}: ModalAdminProps) {
  if (!Data) return null;

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Modifier l'état - {Data.nom}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <strong>État actuel : </strong>
          {Data.etat === '1'
            ? 'Accepté'
            : Data.etat === '2'
            ? 'Refusé'
            : 'Non défini'}
        </div>

        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="radio"
            name="etat"
            id="etat-accepté"
            value="1"
            checked={Data.etat === '1'}
            onChange={(e) => onEtatChange(e.target.value)}
          />
          <label className="form-check-label" htmlFor="etat-accepté">
            Accepté
          </label>
        </div>

        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="radio"
            name="etat"
            id="etat-refusé"
            value="2"
            checked={Data.etat === '2'}
            onChange={(e) => onEtatChange(e.target.value)}
          />
          <label className="form-check-label" htmlFor="etat-refusé">
            Refusé
          </label>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
        <Button variant="primary" onClick={onSave}>
          Enregistrer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
