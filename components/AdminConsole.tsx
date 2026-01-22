
import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, Music, Loader2, X, 
  LayoutDashboard, ShoppingCart, Plus, Trash2, 
  DollarSign, Server, Image as ImageIcon, LogOut, Lock, 
  Activity, BarChart3, Clock, Database, Shield, HardDrive,
  FileAudio, Archive, ChevronRight, Save, Users as UsersIcon,
  UserPlus, Mail, ShieldAlert
} from 'lucide-react';
import { Song, LicenseTier, User, Purchase } from '../types';
import { calculateVaultWeight, getStorageConfig, uploadFile } from '../services/storage';

interface AdminConsoleProps {
  songs: Song[];
  users: User[];
  purchases: Purchase[];
  onAddSong: (song: Song) => void;
  onDeleteSong: (id: string) => void;
  onUpdateSong: (song: Song) => void;
  onReorderSongs: (songs: Song[]) => void;
  onInviteUser: (user: User) => void;
}

type AdminView = 'overview' | 'tracks' | 'purchases' | 'users' | 'settings' | 'track-form';

const AdminConsole: React.FC<AdminConsoleProps> = ({ songs, users, purchases, onAddSong, onDeleteSong, onUpdateSong, onReorderSongs, onInviteUser }) => {
  // Bypassing auth for preview mode
  const [activeView, setActiveView] = useState<AdminView>('overview');
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadState, setUploadState] = useState<'Encrypting' | 'Uploading Assets' | 'Indexing'>('Encrypting');
  
  const artInputRef = useRef<HTMLInputElement>(null);
  const mp3InputRef = useRef<HTMLInputElement>(null);
  const wavInputRef = useRef<HTMLInputElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);

  const [selectedFiles, setSelectedFiles] = useState<{
    art?: File;
    mp3?: File;
    wav?: File;
    zip?: File;
  }>({});

  const [formData, setFormData] = useState({
    title: '',
    artist: 'PROGRADE',
    genre: '',
    bpm: 120,
    key: 'Cmaj',
    duration: '3:00',
    priceBasic: 39.99,
    priceStandard: 59.99,
    priceProfessional: 79.99,
    priceUnlimited: 159.99,
  });

  useEffect(() => {
    if (editingSong) {
      setFormData({
        title: editingSong.title,
        artist: editingSong.artist,
        genre: editingSong.genre,
        bpm: editingSong.bpm,
        key: editingSong.key,
        duration: editingSong.duration,
        priceBasic: Number(editingSong.prices[LicenseTier.BASIC]) || 39.99,
        priceStandard: Number(editingSong.prices[LicenseTier.STANDARD]) || 59.99,
        priceProfessional: Number(editingSong.prices[LicenseTier.PROFESSIONAL]) || 79.99,
        priceUnlimited: Number(editingSong.prices[LicenseTier.UNLIMITED]) || 159.99,
      });
      setSelectedFiles({});
    }
  }, [editingSong]);

  const handleFileSelection = (type: keyof typeof selectedFiles, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFiles(prev => ({ ...prev, [type]: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      setUploadState('Encrypting');
      for (let i = 0; i <= 30; i += 10) {
        setUploadProgress(i);
        await new Promise(r => setTimeout(r, 100));
      }
      
      setUploadState('Uploading Assets');
      for (let i = 31; i <= 90; i += 15) {
        setUploadProgress(i);
        await new Promise(r => setTimeout(r, 200));
      }

      const songId = editingSong ? editingSong.id : Math.random().toString(36).substring(7);
      
      let coverUrl = editingSong?.coverUrl || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=600';
      let previewUrl = editingSong?.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

      setUploadState('Indexing');
      setUploadProgress(100);
      await new Promise(r => setTimeout(r, 500));

      const finalSong: Song = {
        id: songId,
        title: formData.title,
        artist: formData.artist,
        bpm: formData.bpm,
        key: formData.key,
        genre: formData.genre,
        duration: formData.duration,
        coverUrl: coverUrl,
        audioUrl: previewUrl,
        tags: [formData.genre || 'untagged'],
        prices: {
          [LicenseTier.BASIC]: formData.priceBasic,
          [LicenseTier.STANDARD]: formData.priceStandard,
          [LicenseTier.PROFESSIONAL]: formData.priceProfessional,
          [LicenseTier.UNLIMITED]: formData.priceUnlimited,
          [LicenseTier.EXCLUSIVE]: 'Make an Offer'
        }
      };

      if (editingSong) onUpdateSong(finalSong);
      else onAddSong(finalSong);
      
      setActiveView('tracks');
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Vault Analytics</h1>
          <p className="text-gray-400 mt-1 font-medium text-sm">Monitoring platform performance and catalog health</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-purple-500/20">
            <Activity className="w-3 h-3" /> Live Operations
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass p-6 rounded-2xl border-green-500/20">
          <div className="bg-green-500/10 p-2 rounded-lg w-fit mb-4"><DollarSign className="w-5 h-5 text-green-500" /></div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Gross Revenue</p>
          <h3 className="text-3xl font-bold mt-1 text-white">${purchases.reduce((acc, p) => acc + p.amount, 0).toFixed(2)}</h3>
        </div>
        <div className="glass p-6 rounded-2xl border-purple-500/20">
          <div className="bg-purple-500/10 p-2 rounded-lg w-fit mb-4"><Music className="w-5 h-5 text-purple-500" /></div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Active Masters</p>
          <h3 className="text-3xl font-bold mt-1 text-white">{songs.length}</h3>
        </div>
        <div className="glass p-6 rounded-2xl border-blue-500/20">
          <div className="bg-blue-500/10 p-2 rounded-lg w-fit mb-4"><ShoppingCart className="w-5 h-5 text-blue-500" /></div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Licenses Sold</p>
          <h3 className="text-3xl font-bold mt-1 text-white">{purchases.length}</h3>
        </div>
        <div className="glass p-6 rounded-2xl border-amber-500/20">
          <div className="bg-amber-500/10 p-2 rounded-lg w-fit mb-4"><UsersIcon className="w-5 h-5 text-amber-500" /></div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Platform Users</p>
          <h3 className="text-3xl font-bold mt-1 text-white">{users.length + 1}</h3>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-8 rounded-3xl border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-bold flex items-center gap-2 text-sm"><BarChart3 className="w-4 h-4 text-purple-500" /> Recent Activity</h4>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Last 24 Hours</span>
          </div>
          <div className="space-y-6">
            {purchases.length === 0 ? (
              <p className="text-gray-500 text-sm italic py-4">No recent acquisitions recorded in the ledger.</p>
            ) : (
              purchases.slice(0, 5).map(p => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-purple-500 font-bold text-[10px] uppercase">
                      {p.tier[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">{p.songTitle}</p>
                      <p className="text-[10px] text-gray-500">{p.customerName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-500">${p.amount}</p>
                    <p className="text-[10px] text-gray-500">{new Date(p.purchaseDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-bold flex items-center gap-2 text-sm"><Clock className="w-4 h-4 text-blue-500" /> Infrastructure Status</h4>
            <span className="text-[10px] font-bold text-green-500 uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Optimal
            </span>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Server className="w-4 h-4 text-gray-500" />
                <span className="text-xs font-bold">Cloud Nodes</span>
              </div>
              <span className="text-[10px] text-green-500 font-mono font-bold">ONLINE</span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-gray-500" />
                <span className="text-xs font-bold">Encryption Layer</span>
              </div>
              <span className="text-[10px] text-green-500 font-mono font-bold">AES-256 ACTIVE</span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database className="w-4 h-4 text-gray-500" />
                <span className="text-xs font-bold">Vault Storage</span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono font-bold">{calculateVaultWeight(songs)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-screen-2xl mx-auto py-12 px-6 flex flex-col lg:flex-row gap-12">
      <div className="lg:w-64 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 shrink-0 no-scrollbar">
        <button onClick={() => setActiveView('overview')} className={`flex-1 lg:flex-none flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeView === 'overview' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}><LayoutDashboard className="w-4 h-4" /> Dashboard</button>
        <button onClick={() => setActiveView('tracks')} className={`flex-1 lg:flex-none flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeView === 'tracks' || activeView === 'track-form' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}><Music className="w-4 h-4" /> Catalog</button>
        <button onClick={() => setActiveView('purchases')} className={`flex-1 lg:flex-none flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeView === 'purchases' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}><ShoppingCart className="w-4 h-4" /> Sales</button>
        <button onClick={() => setActiveView('users')} className={`flex-1 lg:flex-none flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeView === 'users' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}><UsersIcon className="w-4 h-4" /> Users</button>
      </div>

      <div className="flex-1 min-w-0">
        {activeView === 'overview' && renderOverview()}
        
        {activeView === 'tracks' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Master Catalog</h1>
                <p className="text-gray-400 text-sm mt-1">Manage tracks, pricing, and master files</p>
              </div>
              <button onClick={() => { setEditingSong(null); setActiveView('track-form'); }} className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-purple-600/20"><Plus className="w-4 h-4" /> Add Master</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {songs.map(song => (
                <div key={song.id} className="glass rounded-2xl overflow-hidden group border-white/5 hover:border-purple-500/30 transition-all flex flex-col">
                  <div className="relative aspect-video">
                    <img src={song.coverUrl} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="font-bold text-white tracking-tight">{song.title}</h3>
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{song.genre}</p>
                    </div>
                  </div>
                  <div className="p-5 flex items-center gap-2 mt-auto">
                    <button onClick={() => { setEditingSong(song); setActiveView('track-form'); }} className="flex-1 bg-white/5 hover:bg-white/10 py-3 rounded-xl text-xs font-bold transition-all border border-white/5">Edit Master</button>
                    <button onClick={() => onDeleteSong(song.id)} className="bg-red-500/10 text-red-500 p-3 rounded-xl hover:bg-red-500/20 transition-all border border-red-500/20"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'track-form' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">{editingSong ? 'Edit Master' : 'Deploy New Master'}</h1>
                <p className="text-gray-400 text-sm mt-1">Metadata, pricing tiers, and multi-format master assets</p>
              </div>
              <button onClick={() => setActiveView('tracks')} className="p-2 hover:bg-white/5 rounded-full transition-colors"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="glass p-8 rounded-3xl border-white/10 space-y-10">
                {/* Metadata Section */}
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500">01 Metadata Architecture</label>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-1">
                       <span className="text-[10px] text-gray-500 font-bold uppercase ml-1">Composition Title</span>
                       <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Celestial Horizon" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-purple-500 transition-all text-sm" />
                     </div>
                     <div className="space-y-1">
                       <span className="text-[10px] text-gray-500 font-bold uppercase ml-1">Artist / Producer</span>
                       <input required value={formData.artist} onChange={e => setFormData({...formData, artist: e.target.value})} placeholder="PROGRADE" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-purple-500 transition-all text-sm" />
                     </div>
                   </div>
                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-500 font-bold uppercase ml-1">Genre</span>
                      <input value={formData.genre} onChange={e => setFormData({...formData, genre: e.target.value})} placeholder="Vibe" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-purple-500 transition-all text-sm" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-500 font-bold uppercase ml-1">BPM</span>
                      <input type="number" value={formData.bpm} onChange={e => setFormData({...formData, bpm: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-purple-500 transition-all text-sm" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-500 font-bold uppercase ml-1">Key</span>
                      <input value={formData.key} onChange={e => setFormData({...formData, key: e.target.value})} placeholder="Cmaj" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-purple-500 transition-all text-sm" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-500 font-bold uppercase ml-1">Length</span>
                      <input value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="3:45" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-purple-500 transition-all text-sm" />
                    </div>
                  </div>
                </div>

                {/* Pricing Section */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500">02 Licensing Tier Valuations (USD)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Basic</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                        <input type="number" step="0.01" value={formData.priceBasic} onChange={e => setFormData({...formData, priceBasic: parseFloat(e.target.value)})} className="w-full bg-transparent border-b border-white/10 pl-6 py-2 outline-none focus:border-purple-500 transition-all text-lg font-bold" />
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Standard</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                        <input type="number" step="0.01" value={formData.priceStandard} onChange={e => setFormData({...formData, priceStandard: parseFloat(e.target.value)})} className="w-full bg-transparent border-b border-white/10 pl-6 py-2 outline-none focus:border-purple-500 transition-all text-lg font-bold" />
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Pro</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                        <input type="number" step="0.01" value={formData.priceProfessional} onChange={e => setFormData({...formData, priceProfessional: parseFloat(e.target.value)})} className="w-full bg-transparent border-b border-white/10 pl-6 py-2 outline-none focus:border-purple-500 transition-all text-lg font-bold" />
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Unlimited</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                        <input type="number" step="0.01" value={formData.priceUnlimited} onChange={e => setFormData({...formData, priceUnlimited: parseFloat(e.target.value)})} className="w-full bg-transparent border-b border-white/10 pl-6 py-2 outline-none focus:border-purple-500 transition-all text-lg font-bold" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Vault Assets Section */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500">03 Secure Vault Assets</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div onClick={() => artInputRef.current?.click()} className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group ${selectedFiles.art ? 'border-purple-500/50 bg-purple-500/5' : 'border-white/10 bg-white/5 hover:border-purple-500/30'}`}>
                      <ImageIcon className={`w-6 h-6 ${selectedFiles.art ? 'text-purple-400' : 'text-gray-600 group-hover:text-purple-400'}`} />
                      <div className="text-center">
                        <p className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-white">Cover Art</p>
                        <p className="text-[9px] text-gray-600 mt-1 truncate max-w-[120px]">{selectedFiles.art?.name || 'JPG/PNG (600px+)'}</p>
                      </div>
                    </div>
                    <div onClick={() => mp3InputRef.current?.click()} className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group ${selectedFiles.mp3 ? 'border-purple-500/50 bg-purple-500/5' : 'border-white/10 bg-white/5 hover:border-purple-500/30'}`}>
                      <Music className={`w-6 h-6 ${selectedFiles.mp3 ? 'text-purple-400' : 'text-gray-600 group-hover:text-purple-400'}`} />
                      <div className="text-center">
                        <p className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-white">MP3 Master</p>
                        <p className="text-[9px] text-gray-600 mt-1 truncate max-w-[120px]">{selectedFiles.mp3?.name || '320kbps Standard'}</p>
                      </div>
                    </div>
                    <div onClick={() => wavInputRef.current?.click()} className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group ${selectedFiles.wav ? 'border-purple-500/50 bg-purple-500/5' : 'border-white/10 bg-white/5 hover:border-purple-500/30'}`}>
                      <FileAudio className={`w-6 h-6 ${selectedFiles.wav ? 'text-purple-400' : 'text-gray-600 group-hover:text-purple-400'}`} />
                      <div className="text-center">
                        <p className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-white">WAV Master</p>
                        <p className="text-[9px] text-gray-600 mt-1 truncate max-w-[120px]">{selectedFiles.wav?.name || '24-bit Lossless'}</p>
                      </div>
                    </div>
                    <div onClick={() => zipInputRef.current?.click()} className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group ${selectedFiles.zip ? 'border-purple-500/50 bg-purple-500/5' : 'border-white/10 bg-white/5 hover:border-purple-500/30'}`}>
                      <Archive className={`w-6 h-6 ${selectedFiles.zip ? 'text-purple-400' : 'text-gray-600 group-hover:text-purple-400'}`} />
                      <div className="text-center">
                        <p className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-white">Stems Archive</p>
                        <p className="text-[9px] text-gray-600 mt-1 truncate max-w-[120px]">{selectedFiles.zip?.name || 'ZIP of Track Stems'}</p>
                      </div>
                    </div>
                    <input type="file" ref={artInputRef} hidden accept="image/*" onChange={e => handleFileSelection('art', e)} />
                    <input type="file" ref={mp3InputRef} hidden accept=".mp3" onChange={e => handleFileSelection('mp3', e)} />
                    <input type="file" ref={wavInputRef} hidden accept=".wav" onChange={e => handleFileSelection('wav', e)} />
                    <input type="file" ref={zipInputRef} hidden accept=".zip" onChange={e => handleFileSelection('zip', e)} />
                  </div>
                </div>

                {isUploading && (
                  <div className="space-y-4 p-8 bg-purple-600/10 rounded-3xl border border-purple-600/20 animate-pulse">
                    <div className="flex justify-between items-center text-[10px] uppercase font-black text-purple-400 tracking-widest">
                      <div className="flex items-center gap-3">
                         <Loader2 className="w-4 h-4 animate-spin" />
                         <span>{uploadState}</span>
                      </div>
                      <span>{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button type="submit" disabled={isUploading} className="flex-1 bg-purple-600 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.25em] hover:bg-purple-500 transition-all flex items-center justify-center gap-3 shadow-lg shadow-purple-600/20 active:scale-[0.98] disabled:opacity-50">
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {editingSong ? 'Commit Master Changes' : 'Initialize Vault Deployment'}
                  </button>
                  <button type="button" onClick={() => setActiveView('tracks')} className="px-8 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.25em] bg-white/5 hover:bg-white/10 border border-white/10 transition-all">Abort</button>
                </div>
              </div>
            </form>
          </div>
        )}

        {activeView === 'purchases' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">License Ledger</h1>
              <p className="text-gray-400 text-sm mt-1">Transaction history and customer acquisitions</p>
            </div>
            
            <div className="glass rounded-3xl border-white/5 overflow-hidden">
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/5">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Order ID</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Customer</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Track</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Tier</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Amount</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {purchases.length === 0 ? (
                      <tr><td colSpan={6} className="px-6 py-24 text-center text-gray-500 font-medium">Ledger is empty.</td></tr>
                    ) : (
                      purchases.map(p => (
                        <tr key={p.id} className="hover:bg-white/5 transition-colors text-sm">
                          <td className="px-6 py-4 font-mono text-purple-400 font-bold">{p.id}</td>
                          <td className="px-6 py-4">
                            <p className="font-bold text-white">{p.customerName}</p>
                            <p className="text-[10px] text-gray-500">{p.customerEmail}</p>
                          </td>
                          <td className="px-6 py-4 text-gray-300">{p.songTitle}</td>
                          <td className="px-6 py-4">
                            <span className="text-[9px] font-black bg-purple-600/10 text-purple-400 px-2 py-1 rounded border border-purple-500/20">{p.tier}</span>
                          </td>
                          <td className="px-6 py-4 font-bold text-green-500">${p.amount.toFixed(2)}</td>
                          <td className="px-6 py-4 text-gray-500">{new Date(p.purchaseDate).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeView === 'users' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">User Directory</h1>
                <p className="text-gray-400 text-sm mt-1">Manage customer access levels and roles</p>
              </div>
              <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all border border-white/10">
                <UserPlus className="w-4 h-4" /> Invite Admin
              </button>
            </div>
            
            <div className="glass rounded-3xl border-white/5 overflow-hidden">
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/5">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Identity</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Email Address</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Access Role</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Registration</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {/* Hardcoded system admin for reference */}
                    <tr className="bg-purple-600/5 transition-colors text-sm">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold text-[10px]">AD</div>
                          <span className="font-bold text-white">PROGRADE (Owner)</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">progradebeats@gmail.com</td>
                      <td className="px-6 py-4">
                        <span className="text-[9px] font-black bg-purple-500/20 text-purple-400 px-2 py-1 rounded border border-purple-500/20 uppercase tracking-widest">Master Admin</span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">2024-01-01</td>
                      <td className="px-6 py-4"><ShieldAlert className="w-4 h-4 text-purple-500/40" /></td>
                    </tr>
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-white/5 transition-colors text-sm">
                        <td className="px-6 py-4 font-bold text-white">{user.name}</td>
                        <td className="px-6 py-4 text-gray-400 font-mono text-[11px]">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[9px] font-black px-2 py-1 rounded border uppercase tracking-widest ${
                            user.role === 'Admin' ? 'bg-blue-600/10 text-blue-400 border-blue-500/20' : 'bg-white/5 text-gray-400 border-white/10'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{user.joinDate}</td>
                        <td className="px-6 py-4">
                          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-500 hover:text-red-400">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-600 text-xs italic">No additional customer accounts indexed.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminConsole;
