
import React from 'react';
import { Instagram, Facebook, Quote, ArrowUpRight, Music } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Banner Section */}
      <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden bg-zinc-950">
        <img 
          src="input_file_2.png" 
          className="w-full h-full object-cover opacity-60 transition-opacity duration-1000" 
          alt="PROGRADE Studio"
          onError={(e) => {
             const target = e.target as HTMLImageElement;
             target.src = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=2000";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 max-w-screen-2xl mx-auto">
          {/* Logo with heavy contrast filters to ensure it's visible if it was originally black-on-white */}
          <img 
            src="input_file_0.png" 
            className="h-14 md:h-24 object-contain mb-4 invert brightness-[10] contrast-[1.5]" 
            alt="PROGRADE Logo" 
            onError={(e) => {
              (e.target as HTMLImageElement).classList.remove('invert', 'brightness-[10]');
            }}
          />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Visuals & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-45 transition duration-1000"></div>
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-zinc-900">
                <img 
                  src="input_file_1.png" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="PROGRADE Profile"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1514525253361-bee8a187499b?auto=format&fit=crop&q=80&w=800';
                  }}
                />
              </div>
            </div>

            <div className="glass p-8 rounded-3xl border-white/5 space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-500">Digital Presence</h3>
              <div className="grid grid-cols-1 gap-3">
                <a 
                  href="https://open.spotify.com/artist/1W50XRq70kfQIRYJBx2Dhu?si=B4Nlgl9xQOCqQCgXg4qSQQ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group border border-white/5 hover:border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#1DB954] p-2 rounded-xl shadow-lg shadow-green-600/20">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.508 17.302c-.216.354-.678.462-1.032.246-2.85-1.74-6.438-2.13-10.662-1.164-.402.09-.81-.162-.9-.564-.09-.402.162-.81.564-.9 4.62-1.056 8.586-.612 11.784 1.344.354.216.462.678.246 1.038zm1.47-3.258c-.276.45-.858.594-1.308.318-3.258-2.004-8.226-2.586-12.084-1.416-.51.156-1.044-.144-1.194-.654-.156-.51.144-1.044.654-1.194 4.398-1.332 9.876-.678 13.614 1.626.45.276.594.858.318 1.32zm.126-3.414C15.24 8.1 8.61 7.89 4.782 9.054c-.606.186-1.248-.162-1.434-.768-.186-.606.162-1.248.768-1.434 4.398-1.332 11.724-1.08 15.684 1.278.546.324.726 1.032.402 1.578-.324.546-1.032.726-1.578.402z"/></svg>
                    </div>
                    <span className="font-bold text-sm tracking-tight">Spotify</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                </a>

                <a 
                  href="https://music.apple.com/us/album/capricorn-single/1846713911" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group border border-white/5 hover:border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-tr from-rose-400 to-rose-600 p-2 rounded-xl shadow-lg shadow-rose-600/20">
                      <Music className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-sm tracking-tight">Apple Music</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                </a>

                <a 
                  href="https://www.instagram.com/progradebeats" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group border border-white/5 hover:border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-2 rounded-xl shadow-lg shadow-purple-600/20">
                      <Instagram className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-sm tracking-tight">Instagram</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                </a>

                <a 
                  href="https://www.facebook.com/profile.php?id=61576812300178" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group border border-white/5 hover:border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20">
                      <Facebook className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-sm tracking-tight">Facebook</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                </a>

                <a 
                  href="https://www.tiktok.com/@progradebeats" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group border border-white/5 hover:border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-zinc-800 p-2 rounded-xl border border-white/10">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1 .05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
                    </div>
                    <span className="font-bold text-sm tracking-tight">TikTok</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Content */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-12 bg-purple-600"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Artist Profile</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                Crafting Sonic Identities <br />
                <span className="gradient-text">From the Core of NYC</span>
              </h2>
            </div>

            <div className="space-y-8 text-gray-400 text-lg leading-relaxed font-light">
              <p>
                <strong className="text-white font-bold">PROGRADE</strong> is a NYC chill beats producer bringing hip-hop-infused instrumentals built for introspection, creativity, and everyday life. His sound blends classic boom-bap foundations with modern vibed-out textures, giving listeners a soundtrack for focus, emotion, and expression.
              </p>
              
              <div className="relative p-10 glass border-l-4 border-l-purple-600 rounded-r-3xl italic text-white/90 font-medium text-xl md:text-2xl">
                <Quote className="absolute top-4 right-4 w-12 h-12 text-white/5 -scale-x-100" />
                "Whether amplifying a moment or shaping mood-driven playlists, PROGRADE’s beats feel grounded and timeless... present and futuristic."
              </div>

              <p>
                His mission is to connect with listeners through immersive instrumentals that give people space to think, feel, and create - fostering a chill music community that supports listeners, inspires artists, and brings everyday moments into emotional focus.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div className="space-y-1">
                <p className="text-4xl font-bold text-white tracking-tighter">120-130</p>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Average BPM Range</p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-bold text-white tracking-tighter">NYC</p>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Global Headquarters</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
