'use client';

import { useEffect, useState } from 'react';
import ModalAdmin from './modalAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ModalAjout from './modalAjout';




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
  const [data, setData] = useState<any>({});
  const [options, setOptions] = useState<{ [key: number]: string }>({});
   const [showModal, setShowModal] = useState(false)



  const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);



const handleEtatChange = (etat: string) => {
  setData((prev: any) => ({
    ...prev,
    etat: etat,
  }));
};

// enregistrer l etat bl put 
const handleSaveEtat = async () => {
  if (!data?.id) return;

  try {
    await fetch(`http://localhost:3002/reservation/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ etat: data.etat }),
    });

    alert(`État de la réservation ${data.id} mis à jour à ${data.etat}`);
    setShow(false);

    const res1 = await fetch('http://localhost:3002/reservation');
    const reservationsData = await res1.json();
    setReservations(reservationsData);

  } catch (err) {
    console.error('Erreur mise à jour:', err);
  }
};

  

  const handleOptionChange = (reservationId: number, value: string) => {
    setOptions((prev) => ({ ...prev, [reservationId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent, reservationId: number) => {
    e.preventDefault();
    const selected = options[reservationId] || 'aucune';

    try {
      await fetch(`http://localhost:3002/reservation/${reservationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ etat: selected }),
      });
      alert(`Réservation ${reservationId} mise à jour avec option ${selected}`);
    } catch (err) {
      console.error('Erreur mise à jour:', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch('http://localhost:3002/reservation');
        const reservationsData = await res1.json();
        setReservations(reservationsData);

        const res2 = await fetch('http://localhost:3002/users');
        const usersData = await res2.json();
        setUsers(Array.isArray(usersData) ? usersData : []);
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
      <>
      <Button onClick={() => setShowModal(true)}>AJOUTER USER</Button>
      <ModalAjout
        show={showModal}
        handleClose={() => setShowModal(false)}
        onUserAdded={() => {
          setShowModal(false);
        }}
      />
      
    </>

<div className="row">

          {reservations.map((r) => {
            const user = users.find((u) => u.id === r.user_id);
            const modalId = `optionModal-${r.id}`;
            return (
              <div className="col-md-4 mb-4" key={r.id}>
                <div className="card h-100 shadow">
                  <div className="card-body text-dark">
                    <h5 className="card-title">Réservation</h5>
                    <p><strong>Nom :</strong> {r.nom}</p>
                    <p><strong>Début :</strong> {formatDate(r.dated)}</p>
                    <p><strong>Fin :</strong> {formatDate(r.datef)}</p>
                    <p><strong>État :</strong> {r.etat === '1' ? 'Acceptée' : r.etat === '2' ? 'Refusée' : 'En attente'}</p>

                    {user && (
                      <>
                        <p><strong>Adresse :</strong> {user.adre}</p>
                        <p><strong>Téléphone :</strong> {user.tep}</p>
                        <p><strong>Email :</strong> {user.mail}</p>
                        <p><strong>Bloqué :</strong> {user.bloqué ? 'Oui' : 'Non'}</p>
                        
                      </>
                    )}

               
                  </div>
                     <Button
        type="button"
    
         onClick={ ()=>{
          setData(r)
          handleShow()}}
      >
        Choix d'état
      </Button>
                </div>
              </div>
            );
          })}
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
