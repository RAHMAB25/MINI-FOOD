'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAdmin from './headerAdmin';
import ListAdmin from './listAdmin';

export default function Home() {
  const [activeTab, setActiveTab] = useState('reservation');
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  
  

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
      <HeaderAdmin activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />
      {/* CONTENUE */}
      {activeTab === 'reservation' && (
        <div>
         <ListAdmin/>
        </div>
      )}
       
       {activeTab === 'planning' && (
        <div>
         <h1>contenue</h1>
        </div>
      )}


{activeTab === 'historique' && (
        <div>
        <h1>contenue</h1>
        </div>
      )}

      
    </div>



  );

}


