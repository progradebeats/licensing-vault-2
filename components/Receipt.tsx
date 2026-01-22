
import React from 'react';
import { Download, CheckCircle, Mail, FileText, Music, Archive, FileAudio } from 'lucide-react';
import { Purchase, Song } from '../types';
import { LICENSE_TIERS } from '../constants';

interface ReceiptProps {
  purchase: Purchase;
  song: Song;
  onClose: () => void;
}

const Receipt: React.FC<ReceiptProps> = ({ purchase, song, onClose }) => {
  const tierDetails = LICENSE_TIERS[purchase.tier];

  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-green-500/10 rounded-full mb-6 border border-green-500/20">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-4xl font-bold mb-3">Thank you for your purchase!</h2>
        <p className="text-gray-400">A confirmation email has been sent to <span className="text-white font-medium">{purchase.customerEmail}</span></p>
      </div>

      <div className="glass rounded-3xl overflow-hidden border-purple-500/30">
        <div className="bg-purple-600/10 p-8 flex items-center gap-6 border-b border-white/10">
          <img src={song.coverUrl} className="w-24 h-24 rounded-2xl shadow-2xl" alt="" />
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400 bg-purple-400/10 px-2 py-1 rounded">
              {purchase.tier} License
            </span>
            <h3 className="text-2xl font-bold mt-2">{song.title}</h3>
            <p className="text-gray-400">{song.artist}</p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Downloads & Assets</h4>
            <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Music className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold">Standard MP3</p>
                    <p className="text-[10px] text-gray-500 uppercase">320kbps High Quality</p>
                  </div>
                </div>
                <Download className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </button>

              {tierDetails.fileTypes.includes('WAV') && (
                <button className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                      <FileAudio className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">Lossless WAV</p>
                      <p className="text-[10px] text-gray-500 uppercase">24-bit / 48kHz Professional</p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </button>
              )}

              {tierDetails.fileTypes.includes('STEMS') && (
                <button className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <Archive className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">Multi-Track Stems</p>
                      <p className="text-[10px] text-gray-500 uppercase">ZIP Archive (~450MB)</p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </button>
              )}
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500">License Agreement</h4>
              <button className="flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 font-bold">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
            <div className="bg-black/40 border border-white/5 p-6 rounded-2xl text-[11px] font-mono text-gray-500 leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap">
              {purchase.agreementText}
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-4 rounded-2xl font-bold bg-white/5 hover:bg-white/10 transition-all border border-white/10"
          >
            Back to Marketplace
          </button>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 text-xs text-gray-500">
        <p>Order ID: {purchase.id}</p>
        <span className="w-1 h-1 rounded-full bg-gray-700"></span>
        <p>Purchased on {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Receipt;
