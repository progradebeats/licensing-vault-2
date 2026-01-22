
# SonicVault | Professional Music Licensing Platform

This is a high-end music licensing platform built with React, Tailwind CSS, and Google Gemini AI.

## Features
- **Tiered Licensing**: Five distinct license tiers with dynamic pricing.
- **AI Agreements**: Automated generation of legal license agreements using Gemini 3.
- **Admin Console**: Full track management (Art, MP3, WAV, Stems ZIP) and user directory.
- **Audio Infrastructure**: Custom playback engine with session-based streaming.

## Local Setup
1. Clone or copy the files into a local directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your environment variables:
   - Create a `.env` file and add `VITE_GEMINI_API_KEY=your_key_here`.
4. Configure Firebase:
   - Update `services/firebase.ts` with your Firebase project credentials.
5. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment
This app is ready for deployment to **Vercel**, **Netlify**, or **Firebase Hosting**.
Run `npm run build` to generate the production-ready assets in the `dist/` folder.

## Legal Notice
PROGRADE® and SonicVault are trademarks of MazeOne Digital Recordings, LLC. This software is provided as a platform for music distribution.
