import { useEffect, useState } from "react";

type PortraitListProps = {
  fetchFunction: () => any;
};

type CharacterData = {
  number: number;
  imgs: {
    portrait: string;
  };
  name: string;
  data: string;
};

export default function PortraitList({ fetchFunction }: PortraitListProps) {
  const [character, setCharacter] = useState<CharacterData[]>([]);

  useEffect(() => {
    const response = fetchFunction;
    setCharacter(response.data.data);
  }, [fetchFunction]);

  return (
    <button className="flex flex-row flex-wrap mx-[10rem] mt-26 text-center justify-center relative">
      {character.map((character) => (
        <div key={character.number} className="mb-20">
          <img
            src={character.imgs.portrait}
            alt={`Retrato de ${character.name}`}
            className="size-[20rem] transition-transform duration-300 transform group-hover:scale-105 group-hover:shadow-[0_0_30px_10px_rgba(255,0,0,0.7)]"
          />
          <p className="text-white font-bold text-[1.5rem]">{character.name}</p>
        </div>
      ))}
    </button>
  );
}
