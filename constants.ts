
import { LicenseTier, LicenseDetails, Song, User, Purchase } from './types';

export const LICENSE_TIERS: Record<LicenseTier, LicenseDetails> = {
  [LicenseTier.BASIC]: {
    tier: LicenseTier.BASIC,
    name: 'Basic License',
    price: 39.99,
    features: [
      '500 Downloads / 50,000 Streams',
      'Synchronize with 1 Video',
      'Non-profit performances only',
      'No publishing split'
    ],
    fileTypes: ['MP3']
  },
  [LicenseTier.STANDARD]: {
    tier: LicenseTier.STANDARD,
    name: 'Standard License',
    price: 59.99,
    features: [
      '2,500 Downloads / 500,000 Streams',
      '2 Radio Stations',
      'Synchronize with 1 Video',
      'For-profit performances allowed',
      'Publishing split: 50/50'
    ],
    fileTypes: ['MP3', 'WAV']
  },
  [LicenseTier.PROFESSIONAL]: {
    tier: LicenseTier.PROFESSIONAL,
    name: 'Professional License',
    price: 79.99,
    features: [
      '2,500 Downloads / 500,000 Streams',
      'MP3, WAV & STEMS Included',
      'For-profit performances allowed',
      'Publishing split: 50/50',
      'Licensor buy-back option (200%)'
    ],
    fileTypes: ['MP3', 'WAV', 'STEMS']
  },
  [LicenseTier.UNLIMITED]: {
    tier: LicenseTier.UNLIMITED,
    name: 'Unlimited License',
    price: 159.99,
    features: [
      'Unlimited Distribution & Streams',
      'Unlimited Radio, Videos & Performance',
      'MP3, WAV & STEMS Included',
      'Publishing split: 50/50',
      'Licensor buy-back option (200%)'
    ],
    fileTypes: ['MP3', 'WAV', 'STEMS']
  },
  [LicenseTier.EXCLUSIVE]: {
    tier: LicenseTier.EXCLUSIVE,
    name: 'Exclusive Ownership',
    price: 'Make an Offer',
    features: [
      'Full Ownership Transfer (Work-for-hire)',
      'Beat removed from catalog permanently',
      'MP3, WAV & STEMS Included',
      'Composition publishing split: 50/50',
      'Master ownership transfers to Licensee'
    ],
    fileTypes: ['MP3', 'WAV', 'STEMS']
  }
};

export const INITIAL_SONGS: Song[] = [
  {
    id: '1',
    title: 'Topaz - Blue - Paradise Mix',
    artist: 'PROGRADE',
    bpm: 124,
    key: 'Cm',
    genre: 'Synthwave',
    duration: '2:14',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=600',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    tags: ['paradise', 'lux', 'serene'],
    prices: {
      [LicenseTier.BASIC]: 39.99,
      [LicenseTier.STANDARD]: 59.99,
      [LicenseTier.PROFESSIONAL]: 79.99,
      [LicenseTier.UNLIMITED]: 159.99,
      [LicenseTier.EXCLUSIVE]: 'Make an Offer'
    }
  },
  {
    id: '2',
    title: 'Topaz - Yellow - Diva Mix',
    artist: 'PROGRADE',
    bpm: 128,
    key: 'F#m',
    genre: 'Lo-Lux',
    duration: '2:28',
    coverUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    tags: ['diva', 'yellow', 'lux'],
    prices: {
      [LicenseTier.BASIC]: 39.99,
      [LicenseTier.STANDARD]: 59.99,
      [LicenseTier.PROFESSIONAL]: 79.99,
      [LicenseTier.UNLIMITED]: 159.99,
      [LicenseTier.EXCLUSIVE]: 'Make an Offer'
    }
  },
  {
    id: '3',
    title: 'Opal II - Pleiadian Mix',
    artist: 'PROGRADE',
    bpm: 120,
    key: 'Am',
    genre: 'Cosmic',
    duration: '2:14',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    tags: ['opal', 'cosmic', 'deep'],
    prices: {
      [LicenseTier.BASIC]: 39.99,
      [LicenseTier.STANDARD]: 59.99,
      [LicenseTier.PROFESSIONAL]: 79.99,
      [LicenseTier.UNLIMITED]: 159.99,
      [LicenseTier.EXCLUSIVE]: 'Make an Offer'
    }
  }
];

export const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'PROGRADE', email: 'progradebeats@gmail.com', role: 'Admin', joinDate: '2024-01-01' }
];

export const INITIAL_PURCHASES: Purchase[] = [];
