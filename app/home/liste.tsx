'use client';

import { useState, useEffect } from 'react';
import ModalReservation from './reservationModal';

type Reservation = {
  id: number;
  nom: string;
  dated: string;
  datef: string;
  etat: string;
};

export default function Liste() {
  const [reservation, setReservation] = useState<Reservation[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [nom, setNom] = useState('');
  const [dated, setDated] = useState('');
  const [message, setMessage] = useState('');

  // Charger les données
  const getReservation = async () => {
    try {
      const res = await fetch('http://localhost:3002/reservation');
      const data = await res.json();
      setReservation(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getReservation();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Confirmer la suppression ?")) return;
    try {
      await fetch(`http://localhost:3002/reservation/${id}`, {
        method: 'DELETE',
      });
      setReservation(reservation.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  const handleEdit = (r: Reservation) => {
    setEditMode(true);
    setEditId(r.id);
    setNom(r.nom);
    setDated(r.dated);
    setMessage('');
    const modal = new (window as any).bootstrap.Modal(document.getElementById('reservationModal'));
    modal.show();
  };

  const handleSave = async () => {
    try {
      const body = { nom, dated };
      const url = editMode
        ? `http://localhost:3002/reservation/${editId}`
        : `http://localhost:3002/reserver`;

      const method = editMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setMessage(editMode ? 'Réservation modifiée !' : 'Réservation enregistrée !');
        setNom('');
        setDated('');
        setEditMode(false);
        setEditId(null);
        getReservation(); // recharge la liste
      } else {
        setMessage("Erreur lors de l’enregistrement");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur réseau");
    }
  };

  return (
    <div className="container">
      <div className='d-flex justify-content-between mp-3'>
        <h2 className="text-xl font-bold mb-4">Réservation</h2>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#reservationModal"
          onClick={() => {
            setEditMode(false);
            setNom('');
            setDated('');
            setMessage('');
          }}
        >
          Nouvelle Réservation
        </button>
      </div>

      {/* Modal */}
      <ModalReservation
        nom={nom}
        setNom={setNom}
        dated={dated}
        setDated={setDated}
        message={message}
        handleSave={handleSave}
      />

      {/* Liste des cartes */}
      <div className="row mt-4">
        {reservation.map((r) => (
          <div className="col-md-4 mb-4" key={r.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">cadre de reservation</h5>
                <p className="card-text"><strong>Nom :</strong> {r.nom}</p>
                <p className="card-text"><strong>Date début :</strong> {formatDate(r.dated)}</p>
                <p className="card-text"><strong>Date fin :</strong> {formatDate(r.datef)}</p>
                <p className="card-text"><strong>État :</strong> {r.etat}</p>
                <div className="d-flex justify-content-between mt-3">
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r.id)}>Supprimer</button>
                  <button className="btn btn-sm btn-warning" onClick={() => handleEdit(r)}>Modifier</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

