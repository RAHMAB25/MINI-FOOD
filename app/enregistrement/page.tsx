'use client';
import { useState } from 'react';

export default function Enregistrement() {
  const [non, setNon] = useState('');
  const [adre, setAdre] = useState('');
  const [tep, setTep] = useState('');
  const [mail, setMail] = useState('');
  const [motpas, setMotpas] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const body = { non, adre, tep, mail, motpas };
      const response = await fetch("http://localhost:3002/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setMessage(" Utilisateur enregistré avec succès !");
        
        setNon('');
        setAdre('');
        setTep('');
        setMail('');
        setMotpas('');
      } else {
        const err = await response.json();
        setMessage(` Erreur : ${err.message || 'inconnue'}`);
      }
    } catch (error) {
      console.error(error);
      setMessage(" Erreur réseau");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Page Enregistrement</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="non" className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            id="non"
            value={non}
            onChange={(e) => setNon(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="adre" className="form-label">Adresse</label>
          <input
            type="text"
            className="form-control"
            id="adre"
            value={adre}
            onChange={(e) => setAdre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tep" className="form-label">Téléphone</label>
          <input
            type="text"
            className="form-control"
            id="tep"
            value={tep}
            onChange={(e) => setTep(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mail" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="mail"
            value={mail}
             onChange={(e) => setMail(e.target.value.toLowerCase())}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="motpas" className="form-label">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="motpas"
            value={motpas}
            onChange={(e) => setMotpas(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Enregistrer f base
        </button>
      </form>

      
      {message && <p className="mt-3 text-info">{message}</p>}
    </div>
  );
}
