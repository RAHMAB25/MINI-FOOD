'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';



export default function Home() {
  const [activeTab, setActiveTab] = useState('reservation');
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
//HATHHI NJARREB FAHA 
  const [nom, setNom] = useState('');
  const [dated, setDated] = useState('');
//   const [etat, setEtat] = useState('');
  const [message, setMessage] = useState('');
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const body = { nom,dated};
      const response = await fetch("http://localhost:5000/reserver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setMessage(" la reservation enregistré avec succès !");
        
        setNom('');
        setDated('');
      //   setEtat('');
        
      } else {
        const err = await response.json();
        setMessage(` Erreur : ${err.message || 'inconnue'}`);
      }
    } catch (error) {
      console.error(error);
      setMessage(" Erreur réseau");
    }
  };
// THBSS LHNI


  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUserData(JSON.parse(storedUser));
  } else {
    router.push("/"); 
  }
}, []);
  const handleLogout = () => {
    localStorage.removeItem("user"); 
    router.push("/"); 
  };


  return (
    <div className="flex h-screen">

      <div className="w-1/4 bg-gray-100 p-4">
        <button
          onClick={() => setActiveTab('reservation')}
          className={`w-full text-left p-2 rounded mb-2 ${
            activeTab === 'reservation'
              ? 'bg-black text-white'
              : 'text-black hover:bg-gray-200'
          }`}
        >
          Réservation
        </button>
        <button
          onClick={() => setActiveTab('planning')}
          className={`w-full text-left p-2 rounded mb-2 ${
            activeTab === 'planning'
              ? 'bg-black text-white'
              : 'text-black hover:bg-gray-200'
          }`}
        >
          Planning
        </button>
        <button
          onClick={() => setActiveTab('historique')}
          className={`w-full text-left p-2 rounded ${
            activeTab === 'historique'
              ? 'bg-black text-white'
              : 'text-black hover:bg-gray-200'
          }`}
        >
          Historique
        </button>

        <button onClick={handleLogout} className="btn btn-danger mt-3">
        Déconnecter
      </button>


      </div>



       {/* CONTENUE */}
      <div className="w-3/4 p-6">
        {activeTab === 'reservation' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Réservation</h2>

           <div className="container mt-5">
      <h2 className="mb-4">PAGE DE RESERVATION</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dated" className="form-label">dateD</label>
          <input
            type="text"
            className="form-control"
            id="dated"
            value={dated}
            onChange={(e) => setDated(e.target.value)}
            required
          />
        </div>

        {/* <div className="mb-3">
          <label htmlFor="etat" className="form-label">ETAT</label>
          <input
            type="text"
            className="form-control"
            id="etat"
            value={etat}
            onChange={(e) => setEtat(e.target.value)}
            required
          />
        </div> */}

          <button type="submit" className="btn btn-primary">
          Enregistrer 
        </button>
      </form>

      
      {message && <p className="mt-3 text-info">{message}</p>}
    </div>   
    </div> 
    

  
        
        )
        }








        {activeTab === 'planning' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Planning</h2>
            <p>Contenu du planning</p>
          </div>
        )}












        {activeTab === 'historique' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Historique</h2>
            <p>Contenu de l'historique </p>
          </div>
        )}
      </div>
   </div>
  
  );

}


