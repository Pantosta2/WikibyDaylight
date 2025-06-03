// src/Types/GeneralTypes.ts

// Perk actualizada basada en tu ejemplo "Bond" y necesidades de la UI
export type Perk = {
  id: number; // ID numérico, crucial para keys y seguimiento
  name: string;
  description: string;
  icon: string;
  code?: string; // Código de la perk (ej: "bond")

  // Campos opcionales para ayudar a distinguir.
  // Suponemos que para perks generales (obtenidas con ".../all/perk"),
  // estos podrían ser null o no estar definidos.
  // Ajusta según lo que realmente devuelva tu API para perks generales.
  survivorCode?: string | null;
  killerCode?: string | null;
  // Podrías tener un campo más genérico como:
  // characterCode?: string | null;
};

// Tipo de respuesta para getCharacterPerks, usando la Perk actualizada
export type CharacterSpecificPerksResponse = Perk[];

// --- Tus otros tipos existentes ---
export type PowerDetails = {
  powerName: string;
  killerCode: string;
  description: string;
};

type BaseCharacter = {
  number: number;
  code: string;
  name: string;
  overview: string;
  backstory: string;
  nationality: string;
  dlc: string;
  imgs: {
    portrait: string;
  };
};

export type KillerApiData = BaseCharacter & {
  role: 'killer';
  fullName: string;
  gender: string;
  difficulty: string;
  moveSpeed: number | string;
  terrorRadius: number | string;
  powerName: string;
  powerCode: string;
};

export type SurvivorApiData = BaseCharacter & {
  role: "survivor";
  // nationality ya está en BaseCharacter
};

export type CharacterProfileData = KillerApiData | SurvivorApiData;

export type CharacterListEnvelope = {
  data: CharacterProfileData[];
};