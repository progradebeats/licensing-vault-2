
import { GoogleGenAI } from "@google/genai";
import { LicenseTier, Song } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLicenseAgreement = async (
  customerName: string,
  song: Song,
  tier: LicenseTier
): Promise<string> => {
  const price = song.prices[tier];
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Draft a professional music license agreement for the brand SonicVault.
      
      CRITICAL: You MUST dynamically populate these fields into the agreement:
      - EFFECTIVE DATE: ${date}
      - TRACK TITLE: "${song.title}"
      - LICENSEE NAME: "${customerName}"
      - LICENSE FEE: $${price} USD
      - LICENSE TIER: "${tier}"

      Legal Entity: MazeOne Digital Recordings, LLC.
      
      Base the text on a professional Master Music License structure including:
      1. PARTIES: Licensor (MazeOne Digital Recordings, LLC d/b/a SonicVault) and Licensee (${customerName}).
      2. GRANT OF LICENSE: Specific to the ${tier} tier usage limits.
      3. OWNERSHIP: Licensor retains master ownership (except Exclusive tier).
      4. TERM: Ten (10) years.
      5. CREDIT: "Produced by SonicVault".
      
      Ensure the document looks legally authoritative and complete (approx 500-600 words).`,
      config: {
        temperature: 0.1,
      }
    });
    
    return response.text || "Agreement generation failed. Please contact support.";
  } catch (error) {
    console.error("Error generating license:", error);
    return `SonicVault Music License Agreement
    Effective Date: ${date}
    Licensee: ${customerName}
    Track: ${song.title}
    Price: $${price}
    Tier: ${tier}
    
    Formal legal document text failed to generate. Please contact support@sonicvault.com with your Order ID for a manual PDF copy.`;
  }
};
