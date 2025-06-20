'use client';

import React, { useState } from 'react';

type ModalReservationProps = {

reservation :any ,
  setReservation:Function
};

export default function ModalReservation({reservation ,setReservation} :ModalReservationProps) {
      const [message, setMessage] = useState('');
    
      const [nom, setNom] = useState('');
      const [dated, setDated] = useState('');

      const handleSave = async () => {
    try {
      const body = { nom, dated };
      const response = await fetch('http://localhost:3002/reserver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setMessage('Réservation ajoutée avec succès');
      setNom('');
      setDated('');

      // Recharge les réservations
      let datareservation :any =reservation
      datareservation.push(data)
      setReservation(datareservation);
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de l'ajout");
    }
  };
  return (
    <div
      className="modal fade"
      id="reservationModal"
      tabIndex={-1}
      aria-labelledby="reservationModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">

          {/* En-tête */}
          <div className="modal-header">
            <h5 className="modal-title" id="reservationModalLabel">
              Ajouter Réservation
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Corps */}
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Nom</label>
              <input
                type="text"
                className="form-control"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Date début</label>
              <input
                type="datetime-local"
                className="form-control"
                value={dated}
                onChange={(e) => setDated(e.target.value)}
              />
            </div>

            {message && <div className="alert alert-info mt-2">{message}</div>}
          </div>

          {/* Pied de page */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fermer
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              data-bs-dismiss="modal"
            >
              Enregistrer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
