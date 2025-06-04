import type { Perk } from "../../services/GeneralGetService";

type PerkDisplayListProps = {
  perks: Perk[];
  isLoading: boolean;
  error: string | null;
};

export default function PerkDisplayList({
  perks,
  isLoading,
  error,
}: PerkDisplayListProps) {
  if (isLoading) {
    return <p className="text-sm text-gray-600 my-4">Loading perks...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500 my-4">{error}</p>;
  }

  if (!perks || perks.length === 0) {
    return (
      <p className="text-sm text-gray-600">
        No perks listed for this character.
      </p>
    );
  }

  return (
    <>
      <h4 className="text-lg font-semibold mt-3 mb-1 text-white">Perks:</h4>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {perks.map((perk) => (
          <li
            key={perk.name || `perk-${perk.icon}`}
            className="p-3 border border-gray-700 rounded-md shadow-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center mb-2">
              {perk.icon && (
                <img
                  src={perk.icon}
                  alt={perk.name}
                  className="w-16 h-16 md:w-20 md:h-20 mr-3 border border-gray-600 object-contain rounded-md"
                  loading="lazy"
                />
              )}
              <strong className="text-md text-white flex-1">{perk.name}</strong>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              {perk.description}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
