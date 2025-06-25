'use client';

import { useEffect, useState } from 'react';
import ModalAdmin from './modalAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ModalAjout from './modalAjout';

type ReservationWithUser = {
  id: number;
  nom: string;
  dated: string;
  datef: string;
  etat: string;
  user_id: number;
  usernom: string;
  adre: string;
  tep: string;
  mail: string;
};

export default function ListAdmin() {
  const [reservations, setReservations] = useState<ReservationWithUser[]>([]);
  const [data, setData] = useState<ReservationWithUser | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEtatChange = (etat: string) => {
    setData((prev) => prev ? { ...prev, etat } : null);
  };

  const handleSaveEtat = async () => {
    if (!data?.id) return;

    try {
      await fetch(`http://localhost:3002/reservation/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ etat: data.etat }),
      });

      setShow(false);

      const res = await fetch('http://localhost:3002/nvreservation');
      const updated = await res.json();
      setReservations(updated);

    } catch (err) {
      console.error('Erreur mise à jour :', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3002/nvreservation');
        const data = await res.json();
        setReservations(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
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

  return (
    <div className="container-fluid min-vh-100 position-relative text-white"
      style={{
        backgroundImage: "url('/images/foot.JPG')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.24)', zIndex: 0 }}></div>

      <div className="container position-relative py-5" style={{ zIndex: 1 }}>
        <h2 className="text-white mb-4">Réservations</h2>

        <Button onClick={() => setShowModal(true)}>AJOUTER USER</Button>
        <ModalAjout
          show={showModal}
          handleClose={() => setShowModal(false)}
          onUserAdded={() => setShowModal(false)}
        />

        <div className="row mt-4">
          {reservations.map((r) => (
            <div key={r.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow">
                <div className="card-body text-dark">
                  <h5 className="card-title">Réservation</h5>
                  <p><strong>Nom :</strong> {r.nom}</p>
                  <p><strong> DATE Début :</strong> {formatDate(r.dated)}</p>
                  <p><strong> DATE Fin :</strong> {formatDate(r.datef)}</p>
                  <p><strong>État :</strong> {r.etat === '1' ? 'Acceptée' : r.etat === '2' ? 'Refusée' : 'En attente'}</p>
                  <p><strong>Nom utilisateur :</strong> {r.usernom}</p>
                  <p><strong>Email :</strong> {r.mail}</p>
                  <p><strong>Téléphone :</strong> {r.tep}</p>
                  <p><strong>Adresse :</strong> {r.adre}</p>
                  <Button
                    type="button"
                    className="mt-2"
                    onClick={() => {
                      setData(r);
                      handleShow();
                    }}
                  >
                    Choix d'état
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalAdmin
        handleClose={handleClose}
        show={show}
        Data={data}
        onEtatChange={handleEtatChange}
        onSave={handleSaveEtat}
      />
    </div>
  );
}
