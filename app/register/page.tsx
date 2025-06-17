'use client';

import { useState } from 'react';

export default function page() {
  const [cin, setCin] = useState('');
  const [telephonne, setTelephonne] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">cin</label>
          <input
            type="text"
            className="form-control"
            id="nom"
            value={cin}
            onChange={(e) => setCin(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prenom" className="form-label">telephonne</label>
          <input
            type="text"
            className="form-control"
            id="prenom"
            value={telephonne}
            onChange={(e) => setTelephonne(e.target.value)}
            required
          />
        </div>
        
        
        <button type="submit" className="btn btn-primary">enregistrer</button>
      </form>
    </div>
  );
}