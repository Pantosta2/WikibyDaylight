export type Perk = {
  perk_name: string;
  perk_id: string;
  description: string;
  icon: string;     
};

type BaseCharacter = {
  number: number;
  name: string; 
  overview: string;
  backstory: string;
  perks: Perk[];
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
