
export enum LicenseTier {
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  PROFESSIONAL = 'PROFESSIONAL',
  UNLIMITED = 'UNLIMITED',
  EXCLUSIVE = 'EXCLUSIVE'
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  key: string;
  genre: string;
  duration: string;
  coverUrl: string;
  audioUrl: string; // Preview URL (Session-based)
  audioBlob?: Blob; // Preview binary
  coverBlob?: Blob; // Artwork binary
  mp3Blob?: Blob;   // Full Master MP3 binary
  wavBlob?: Blob;   // Lossless WAV binary
  stemsBlob?: Blob; // ZIP Stems binary
  tags: string[];
  prices: {
    [key in LicenseTier]: number | string;
  };
  files?: {
    mp3?: string;
    wav?: string;
    stemsZip?: string;
  };
}

export interface LicenseDetails {
  tier: LicenseTier;
  name: string;
  price: number | string;
  features: string[];
  fileTypes: string[];
}

export interface Purchase {
  id: string;
  songId: string;
  songTitle: string;
  tier: LicenseTier;
  customerName: string;
  customerEmail: string;
  purchaseDate: string;
  amount: number;
  agreementText: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Customer';
  joinDate: string;
}
