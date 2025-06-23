'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PageVerification() {
  const router = useRouter();
  const [mail, setMail] = useState('');
  const [motpas, setMotpas] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
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
        console.log("" ,response)
         localStorage.setItem("user", JSON.stringify(data.user));
        toast.success('Connexion réussie ! 🎉');
        
        setTimeout(() => {
          if(data.user.admin){
             router.push('/admin');
          }
          else  {
 router.push('/home');
          }
          
        }, 2000); 
        
      } else {
        toast.error(data.message || 'Échec de la connexion ');
        setTimeout(() => {
          
                  setMail("");
                  setMotpas("");
      
        }, 2000);
        
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      toast.error('Erreur réseau ou serveur indisponible');
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
        <br></br> <br></br>

        <button
  type="button"
  className="btn btn-success mt-3"
  onClick={() => router.push('/enregistrement')}
>
  Enregistrer
</button>

        
        
      </form>

      <ToastContainer  
      position="top-right" autoClose={2500}
       />
    </div>


       
    
  );
}
