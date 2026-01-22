
import React, { useState } from 'react';
import { X, Check, ShieldCheck, Loader2 } from 'lucide-react';
import { Song, LicenseTier, Purchase } from '../types';
import { LICENSE_TIERS } from '../constants';
import { generateLicenseAgreement } from '../services/gemini';

interface LicenseModalProps {
  song: Song;
  onClose: () => void;
  onSuccess: (purchase: Purchase) => void;
}

const LicenseModal: React.FC<LicenseModalProps> = ({ song, onClose, onSuccess }) => {
  const [selectedTier, setSelectedTier] = useState<LicenseTier>(LicenseTier.BASIC);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'selection' | 'checkout'>('selection');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handlePurchase = async () => {
    if (selectedTier === LicenseTier.EXCLUSIVE) {
      alert("Inquiry Sent! We will contact you at " + email + " regarding your offer for " + song.title);
      onClose();
      return;
    }

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const agreement = await generateLicenseAgreement(name, song, selectedTier);
    const amount = typeof song.prices[selectedTier] === 'number' ? song.prices[selectedTier] as number : 0;
    
    const purchase: Purchase = {
      id: `SV-${Math.random().toString(36).substring(7).toUpperCase()}`,
      songId: song.id,
      songTitle: song.title,
      tier: selectedTier,
      customerName: name,
      customerEmail: email,
      amount: amount,
      purchaseDate: new Date().toISOString(),
      agreementText: agreement
    };

    setIsProcessing(false);
    onSuccess(purchase);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <div className="glass w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl flex flex-col animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h3 className="text-xl font-bold">{step === 'selection' ? 'Select Your License' : 'Secure Checkout'}</h3>
            <p className="text-sm text-gray-400">{song.title} — {song.artist}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {step === 'selection' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {(Object.keys(LICENSE_TIERS) as LicenseTier[]).map(tier => {
                const details = LICENSE_TIERS[tier];
                const isSelected = selectedTier === tier;
                const price = song.prices[tier];
                return (
                  <div 
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`relative p-5 rounded-2xl border transition-all cursor-pointer flex flex-col h-full ${
                      isSelected 
                        ? 'bg-purple-600/10 border-purple-500 ring-1 ring-purple-500 shadow-lg shadow-purple-600/10' 
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="mb-3">
                      <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded ${
                        isSelected ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'
                      }`}>
                        {tier}
                      </span>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-2xl font-bold">{typeof price === 'number' ? `$${price}` : price}</h4>
                      <p className="text-xs text-gray-400">{details.name}</p>
                    </div>
                    <ul className="space-y-2 mb-6 flex-1">
                      {details.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-gray-300 leading-tight">
                          <Check className="w-3 h-3 text-purple-500 mt-0.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex flex-wrap gap-1">
                        {details.fileTypes.map(ft => (
                          <span key={ft} className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded border border-white/5 font-mono text-gray-400">
                            {ft}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <img src={song.coverUrl} className="w-16 h-16 rounded-xl shadow-lg" alt="" />
                    <div>
                      <h4 className="font-bold text-lg">{song.title}</h4>
                      <p className="text-xs text-gray-400">{LICENSE_TIERS[selectedTier].name}</p>
                      <p className="text-xl font-bold mt-1 text-purple-400">
                        {typeof song.prices[selectedTier] === 'number' ? `$${song.prices[selectedTier]}` : song.prices[selectedTier]}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-600/5 p-4 rounded-xl text-xs text-gray-400 leading-relaxed border border-purple-500/10">
                  <p className="font-bold text-gray-300 mb-1">Instant Asset Delivery</p>
                  Files and license agreements will be delivered to your email inbox immediately after checkout.
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Full Legal Name</label>
                  <input 
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none"
                    placeholder="Licensee Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Delivery Email</label>
                  <input 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div 
                  className="flex items-start gap-3 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all border border-white/10"
                  onClick={() => setAgreed(!agreed)}
                >
                   <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0 ${agreed ? 'bg-purple-600 border-purple-600' : 'border-white/20'}`}>
                    {agreed && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <p className="text-[11px] text-gray-400 leading-snug">
                    I agree to the <span className="text-purple-400 underline">Master Music License Agreement</span> and understand that all sales are final.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-black/20 flex items-center justify-between">
          <button 
            onClick={step === 'selection' ? onClose : () => setStep('selection')}
            className="px-6 py-3 rounded-xl font-bold hover:bg-white/5 transition-colors text-sm"
          >
            {step === 'selection' ? 'Cancel' : 'Back to Selection'}
          </button>
          
          <button 
            onClick={step === 'selection' ? () => setStep('checkout') : handlePurchase}
            disabled={isProcessing || (step === 'checkout' && (!name || !email || !agreed))}
            className="bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-purple-600/20"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              step === 'selection' 
                ? 'Continue to Checkout' 
                : (selectedTier === LicenseTier.EXCLUSIVE ? 'Send Offer' : `Secure License - $${song.prices[selectedTier]}`)
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LicenseModal;
