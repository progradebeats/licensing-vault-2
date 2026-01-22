
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SongCard from './components/SongCard';
import LicenseModal from './components/LicenseModal';
import AudioPlayer from './components/AudioPlayer';
import AdminConsole from './components/AdminConsole';
import About from './components/About';
import Receipt from './components/Receipt';
import Footer from './components/Footer';
import { Music, Cloud, AlertTriangle, ExternalLink, Settings, WifiOff } from 'lucide-react';
import { Song, Purchase, User } from './types';
import { 
  getSongsFromCloud, 
  saveSongToCloud, 
  deleteSongFromCloud,
  getPurchasesFromCloud,
  savePurchaseToCloud
} from './services/storage';
import { isFirebaseSetup } from './services/firebase';

const App: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [currentView, setCurrentView] = useState<'home' | 'admin' | 'success' | 'about'>('home');
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSongForLicense, setSelectedSongForLicense] = useState<Song | null>(null);
  const [lastPurchase, setLastPurchase] = useState<Purchase | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const cloudSongs = await getSongsFromCloud();
        const cloudPurchases = await getPurchasesFromCloud();
        setSongs(cloudSongs);
        setPurchases(cloudPurchases);
      } catch (e: any) {
        console.error("Cloud Access Error", e);
        // We don't set a hard error here anymore, storage service will return fallbacks
      } finally {
        setIsLoaded(true);
      }
    };
    fetchInitialData();
  }, []);

  const handlePlayTrack = (song: Song) => {
    if (activeSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveSong(song);
      setIsPlaying(true);
    }
  };

  const handlePurchaseSuccess = async (purchase: Purchase) => {
    await savePurchaseToCloud(purchase);
    setPurchases(prev => [purchase, ...prev]);
    setLastPurchase(purchase);
    setSelectedSongForLicense(null);
    setCurrentView('success');
  };

  const handleAddSong = async (newSong: Song) => {
    try {
      await saveSongToCloud(newSong);
      setSongs(prev => [newSong, ...prev]);
    } catch (e) {
      alert("Note: Changes are only saved in-memory as Firebase is not configured.");
      setSongs(prev => [newSong, ...prev]);
    }
  };

  const handleUpdateSong = async (updatedSong: Song) => {
    try {
      await saveSongToCloud(updatedSong);
      setSongs(prev => prev.map(s => s.id === updatedSong.id ? updatedSong : s));
    } catch (e) {
      setSongs(prev => prev.map(s => s.id === updatedSong.id ? updatedSong : s));
    }
  };

  const handleDeleteSong = async (id: string) => {
    try {
      await deleteSongFromCloud(id);
      setSongs(prev => prev.filter(s => s.id !== id));
    } catch (e) {
      setSongs(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleNavigate = (view: 'home' | 'admin' | 'about') => {
    setCurrentView(view);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
            <Cloud className="w-3 h-3" /> Initializing SonicVault...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={handleNavigate} currentView={currentView} />
      
      {!isFirebaseSetup && currentView === 'home' && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-2">
          <div className="max-w-screen-2xl mx-auto flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-500">
            <WifiOff className="w-3 h-3" /> Sandbox Mode — Configure Firebase in services/firebase.ts to go live
          </div>
        </div>
      )}

      <main className="flex-1 pb-32">
        {currentView === 'home' && (
          <div className="max-w-screen-2xl mx-auto px-6 py-12 animate-in fade-in duration-700">
            <header className="mb-12">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                Premium Music <br />
                <span className="gradient-text">Licensing Reimagined</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                Unlock world-class production music for your projects. 
                Simple, transparent, tiered licensing designed for creators of all scales.
              </p>
            </header>

            {songs.length === 0 ? (
              <div className="py-24 text-center opacity-40">
                <Music className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <h3 className="text-2xl font-bold">Catalog is Empty</h3>
                <p>Upload your first professional master in the Admin Dashboard.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {songs.map(song => (
                  <SongCard 
                    key={song.id} 
                    song={song} 
                    isActive={activeSong?.id === song.id}
                    isPlaying={isPlaying}
                    onPlay={handlePlayTrack}
                    onSelect={setSelectedSongForLicense}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {currentView === 'admin' && (
          <AdminConsole 
            songs={songs} 
            users={users} 
            purchases={purchases} 
            onAddSong={handleAddSong} 
            onDeleteSong={handleDeleteSong}
            onUpdateSong={handleUpdateSong}
            onReorderSongs={setSongs}
            onInviteUser={() => {}}
          />
        )}

        {currentView === 'about' && <About />}

        {currentView === 'success' && lastPurchase && (
          <Receipt 
            purchase={lastPurchase} 
            song={songs.find(s => s.id === lastPurchase.songId) || songs[0]} 
            onClose={() => setCurrentView('home')}
          />
        )}
      </main>

      <Footer />

      {selectedSongForLicense && (
        <LicenseModal 
          song={selectedSongForLicense} 
          onClose={() => setSelectedSongForLicense(null)}
          onSuccess={handlePurchaseSuccess}
        />
      )}

      <AudioPlayer 
        song={activeSong} 
        isPlaying={isPlaying} 
        onTogglePlay={() => setIsPlaying(!isPlaying)} 
      />
    </div>
  );
};

export default App;
