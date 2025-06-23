'use client';

import { useEffect, useState } from 'react';
import ModalAdmin from './modalAdmin';

type Reservation = {
  id: number;
  nom: string;
  dated: string;
  datef: string;
  etat: string;
  user_id: number;
};

type User = {
  id: number;
  non: string;
  adre: string;
  tep: string;
  mail: string;
  bloqué: boolean;
};

export default function ListAdmin() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [options, setOptions] = useState<{ [key: number]: string }>({});

  const handleOptionChange = (reservationId: number, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [reservationId]: value,
    }));
  };

  const handleSubmit = (e, reservationId: number) => {
    e.preventDefault();
    alert(`Réservation ${reservationId} : Vous avez choisi l'option ${options[reservationId] || 'aucune'}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch('http://localhost:3002/reservation');
        const reservationsData = await res1.json();
        setReservations(reservationsData);

        const res2 = await fetch('http://localhost:3002/users');
        const usersData = await res2.json();
        setUsers(usersData);
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
    <div
      className="container-fluid min-vh-100 position-relative text-white"
      style={{
        backgroundImage: "url('/images/foot.JPG')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.24)', zIndex: 0 }}
      ></div>

      <div className="container position-relative py-5" style={{ zIndex: 1 }}>
        <div className="d-flex justify-content-between mb-4">
          <h2
            style={{
              background: 'linear-gradient(to right,rgb(106, 0, 255),rgb(225, 0, 255))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              fontSize: '2.2rem',
            }}
          >
            Réservations
          </h2>

          <button
            style={{
              backgroundColor: '#343a40',
              color: '#fff',
              padding: '12px 24px',
              border: '2px solid #fff',
              borderRadius: '12px',
              fontWeight: 'bold',
              letterSpacing: '1px',
              boxShadow: '0 0 10px rgba(255,255,255,0.1)',
              transition: 'all 0.2s ease-in-out',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            AJOUT
          </button>
        </div>

        <div className="row">
          {reservations.map((r) => {
            const user = users.find((u) => u.id === r.user_id);
            const modalId = `optionModal-${r.id}`;

            return (
              <div className="col-md-4 mb-4" key={r.id}>
                <div className="card h-100 shadow">
                  <div className="card-body text-dark">
                    <h5 className="card-title">Réservation</h5>
                    <p className="card-text"><strong>Nom :</strong> {r.nom}</p>
                    <p className="card-text"><strong>Date début :</strong> {formatDate(r.dated)}</p>
                    <p className="card-text"><strong>Date fin :</strong> {formatDate(r.datef)}</p>
                    {user && (
                      <>
                        <p className="card-text"><strong>Adresse :</strong> {user.adre}</p>
                        <p className="card-text"><strong>Téléphone :</strong> {user.tep}</p>
                        <p className="card-text"><strong>Email :</strong> {user.mail}</p>
                        <p className="card-text"><strong>Bloqué :</strong> {user.bloqué ? 'Oui' : 'Non'}</p>
                      </>
                    )}


<ModalAdmin
  modalId={modalId}
  reservationId={r.id}
  etat={options[r.id] || '0'}
  onEtatChange={(value) => handleOptionChange(r.id, value)}
  onSubmit={(e) => handleSubmit(e, r.id)}
/>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
