
import React from 'react';
import { Play, Pause, ShoppingCart, Tag } from 'lucide-react';
import { Song } from '../types';

interface SongCardProps {
  song: Song;
  isActive: boolean;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
  onSelect: (song: Song) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, isActive, isPlaying, onPlay, onSelect }) => {
  // Safe price calculation to handle "Make an Offer" strings
  const numericPrices = Object.values(song.prices).filter((p): p is number => typeof p === 'number');
  const minPrice = numericPrices.length > 0 ? Math.min(...numericPrices) : 0;

  return (
    <div className="group glass rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-square">
        <img 
          src={song.coverUrl} 
          alt={song.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={() => onPlay(song)}
            className="bg-purple-600 hover:bg-purple-500 p-4 rounded-full shadow-xl transform scale-90 group-hover:scale-100 transition-transform"
          >
            {isActive && isPlaying ? (
              <Pause className="w-8 h-8 text-white fill-white" />
            ) : (
              <Play className="w-8 h-8 text-white fill-white" />
            )}
          </button>
        </div>
        <div className="absolute bottom-3 left-3 flex gap-2">
          {song.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] uppercase font-bold tracking-widest bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg leading-tight group-hover:text-purple-400 transition-colors">{song.title}</h3>
            <p className="text-gray-400 text-sm">{song.artist}</p>
          </div>
          <span className="text-xs font-mono text-gray-500">{song.duration}</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 font-medium">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-500/50"></span>
            {song.bpm} BPM
          </div>
          <div className="flex items-center gap-1 uppercase">
            <Tag className="w-3 h-3" />
            {song.key}
          </div>
        </div>

        <button 
          onClick={() => onSelect(song)}
          className="w-full bg-white/5 hover:bg-purple-600 border border-white/10 hover:border-purple-500 py-3 rounded-xl flex items-center justify-center gap-2 transition-all group/btn"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="font-semibold text-sm">License from ${minPrice.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
};

export default SongCard;
