'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './header';
import Liste from './liste';

export default function Home() {
  const [activeTab, setActiveTab] = useState('reservation');
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  //HATHHI NJARREB FAHA 
  const [nom, setNom] = useState('');
  const [dated, setDated] = useState('');
  const [message, setMessage] = useState('');

  const [reservation, setReservation] = useState([]);
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

    <div className="flex h-screen mt-3">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />
      {/* CONTENUE */}
      {activeTab === 'reservation' && (
        <div>

         <Liste />
        </div>
      )}

      {/* {activeTab === 'planning' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Planning</h2>
            

              <div className="overflow-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Horaire</th>
              {weekDates.map((date, idx) => (
                <th key={idx} className="border p-2">
                  {date.toLocaleDateString('fr-FR', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horaires.map((horaire, rowIdx) => (
              <tr key={rowIdx}>
                <td className="border p-2 font-medium">{horaire}</td>
                {weekDates.map((_, colIdx) => (
                  <td key={colIdx} className="border p-2 text-center hover:bg-gray-100 cursor-pointer">
                    ..
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>



          </div>
        )} */}



      {/* {activeTab === 'historique' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Historique</h2>
            <p>Contenu de l'historique </p>
          </div>
        )} */}
    </div>



  );

}


