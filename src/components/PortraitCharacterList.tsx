import { useEffect, useState } from "react";

type PortraitListProps = {
  fetchFunction: () => any;
  onButtonClick: any;
};

type CharacterData = {
  number: number;
  imgs: {
    portrait: string;
  };
  name: string;
  data: string;
};

export default function PortraitList({
  fetchFunction,
  onButtonClick,
}: PortraitListProps) {
  const [character, setCharacter] = useState<CharacterData[]>([]);

  useEffect(() => {
    const response = fetchFunction;
    setCharacter(response.data.data);
  }, [fetchFunction]);

  return (
    <section className="flex flex-row flex-wrap mx-[3rem] mt-26 text-center justify-center relative z-20">
      {character.map((character) => (
        <button
          key={character.number}
          className="flex flex-col mb-20 cursor-pointer hover:scale-105 transition-transform duration-300 relative"
          onClick={onButtonClick}
        >
          <img
            src={character.imgs.portrait}
            alt={`Retrato de ${character.name}`}
            className="size-[20rem] block"
          />
          <p className=" bg-gray-600/70 text-white font-semibold text-2xl mx-[3rem] py-1 ">
            {character.name}
          </p>
        </button>
      ))}
    </section>
  );
}
