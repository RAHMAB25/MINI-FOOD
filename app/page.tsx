
'use client';

import { useState } from 'react';

export default function PageVerification() {
  const [mail, setMail] = useState('');
  const [motpas, setMotpas] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, motpas }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Connexion réussie (:');
      } else {
        setMessage(data.message || 'Échec de la connexion');
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      setMessage('donner non exacte !');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="mail" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
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

        <button type="submit" className="btn btn-primary">Connexion</button>
        {message && <p className="mt-3 text-danger">{message}</p>}
      </form>
    </div>
  );
}
