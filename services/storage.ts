
import { Song, User, Purchase } from '../types';
import { db, storage, isFirebaseSetup } from './firebase';
import { INITIAL_SONGS } from '../constants';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  setDoc,
  getDoc
} from "firebase/firestore";
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
} from "firebase/storage";

const SONGS_COLLECTION = 'songs';
const PURCHASES_COLLECTION = 'purchases';
const USERS_COLLECTION = 'users';

// Helper to upload a file to Firebase Storage and return the URL
export const uploadFile = (file: File | Blob, path: string, onProgress?: (progress: number) => void): Promise<string> => {
  if (!isFirebaseSetup) {
    return Promise.reject(new Error("Firebase is not configured. Assets cannot be uploaded to the cloud."));
  }
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(progress);
      }, 
      (error) => reject(error), 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

// --- SONOMATIC CLOUD METHODS ---

export const getSongsFromCloud = async (): Promise<Song[]> => {
  if (!isFirebaseSetup) {
    console.warn("Firebase not setup. Loading initial local catalog.");
    return INITIAL_SONGS;
  }
  try {
    const q = query(collection(db, SONGS_COLLECTION), orderBy('title'));
    const querySnapshot = await getDocs(q);
    const cloudSongs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Song));
    // If cloud is empty, show initial songs for better UX during first setup
    return cloudSongs.length > 0 ? cloudSongs : INITIAL_SONGS;
  } catch (error) {
    console.error("Error fetching songs from cloud:", error);
    return INITIAL_SONGS;
  }
};

export const saveSongToCloud = async (song: Song): Promise<string> => {
  if (!isFirebaseSetup) throw new Error("Firebase not configured.");
  const { id, ...songData } = song;
  const songRef = doc(db, SONGS_COLLECTION, id);
  await setDoc(songRef, songData, { merge: true });
  return id;
};

export const deleteSongFromCloud = async (id: string): Promise<void> => {
  if (!isFirebaseSetup) throw new Error("Firebase not configured.");
  await deleteDoc(doc(db, SONGS_COLLECTION, id));
};

export const savePurchaseToCloud = async (purchase: Purchase): Promise<void> => {
  if (!isFirebaseSetup) {
    console.log("Mock purchase saved locally (Firebase unconfigured):", purchase);
    return;
  }
  await addDoc(collection(db, PURCHASES_COLLECTION), purchase);
};

export const getPurchasesFromCloud = async (): Promise<Purchase[]> => {
  if (!isFirebaseSetup) return [];
  try {
    const q = query(collection(db, PURCHASES_COLLECTION), orderBy('purchaseDate', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Purchase);
  } catch (e) {
    return [];
  }
};

// --- HELPERS ---

export const calculateVaultWeight = (songs: Song[]): string => {
  const totalBytes = songs.length * 50 * 1024 * 1024; 
  if (totalBytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(totalBytes) / Math.log(k));
  return parseFloat((totalBytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getStorageConfig = () => {
  return {
    provider: isFirebaseSetup ? 'firebase' : 'local-mock',
    status: isFirebaseSetup ? 'connected' : 'offline',
    lastSync: new Date().toISOString()
  };
};

export const loadSongsFromDB = getSongsFromCloud;
export const saveSongsToDB = async (songs: Song[]) => {}; 
export const loadUsersFromDB = async () => [];
export const saveUsersToDB = async (users: User[]) => {};
export const isAppInitialized = () => true;
export const markAppAsInitialized = () => {};
