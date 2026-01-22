
import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2 } from 'lucide-react';
import { Song } from '../types';

interface AudioPlayerProps {
  song: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ song, isPlaying, onTogglePlay }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, song]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const clickedValue = (x / rect.width) * duration;
      audioRef.current.currentTime = clickedValue;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!song) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10 px-6 py-4 animate-in slide-in-from-bottom duration-500">
      <audio 
        ref={audioRef} 
        src={song.audioUrl} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onTogglePlay}
      />
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-8">
        <div className="flex items-center gap-4 w-1/4">
          <img src={song.coverUrl} className="w-12 h-12 rounded-lg object-cover shadow-lg border border-white/5" alt={song.title} />
          <div className="overflow-hidden">
            <h4 className="font-bold text-sm truncate text-white">{song.title}</h4>
            <p className="text-xs text-gray-400 truncate">{song.artist}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center gap-2 max-w-2xl">
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={onTogglePlay}
              className="bg-white text-black p-3 rounded-full hover:scale-105 transition-transform shadow-lg shadow-white/10"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black" />}
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
          
          <div className="w-full flex items-center gap-3">
            <span className="text-[10px] font-mono text-gray-500 w-10 text-right">{formatTime(currentTime)}</span>
            <div 
              className="flex-1 h-1 bg-white/10 rounded-full relative group cursor-pointer"
              onClick={handleProgressClick}
            >
              <div 
                className="absolute top-0 left-0 h-full bg-purple-500 group-hover:bg-purple-400 transition-all rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-[10px] font-mono text-gray-500 w-10">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="w-1/4 flex items-center justify-end gap-6">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-gray-400" />
            <div className="w-24 h-1 bg-white/10 rounded-full relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-4/5 bg-gray-400"></div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
