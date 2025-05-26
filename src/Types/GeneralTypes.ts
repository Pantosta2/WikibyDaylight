export type Perk = {
  name: string;
  description: string;
  icon: string;     
};

type BaseCharacter = {
  number: number;
  code: string;
  name: string; 
  overview: string;
  backstory: string;
  dlc: string;
  imgs: {
    portrait: string;
  };
};

export type KillerApiData = BaseCharacter & {
  role: 'killer'; 
  fullname: string; 
  difficulty: string;
  moveSpeed: number | string;
  terrorRadius: number | string; 
  power: {
    name: string;
    description: string;
  };
};

export type SurvivorApiData = BaseCharacter & {
  role: "survivor";
  gender: string;
  nationality?: string;
};

export type KillerProfileData = Omit<KillerApiData, 'KillerPerks'>;

export type SurvivorProfileData = Omit<SurvivorApiData, 'SurvivorPerks'>;

export type CharacterProfileData = KillerProfileData | SurvivorProfileData;

export type CharacterListEnvelope = {
  data: CharacterProfileData[];
};

export type CharacterSpecificPerksResponse = Perk[];