type HeaderProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
};
export default function HeaderAdmin({ activeTab, setActiveTab, handleLogout }: HeaderProps) {


    return  (
        
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
   
        
    )
}