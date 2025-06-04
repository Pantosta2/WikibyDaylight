import type { Perk } from "../../Types/GeneralTypes";
import PerkCard from "./PerkCard";

interface PerkListDisplayProps {
  perks: Perk[];
  isLoading: boolean;
  error?: Error | null;
  title: string;
  onPerkSelect?: (perk: Perk) => void;
  selectedPerkIds?: number[];
  maxPerksReached?: boolean;
}

const PerkListDisplay: React.FC<PerkListDisplayProps> = ({
  perks,
  isLoading,
  error,
  onPerkSelect,
  selectedPerkIds,
  maxPerksReached,
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto"></div>
        <p className="text-xl text-gray-300 mt-4">Loading perks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-900/30 border border-red-700 p-6 rounded-lg mx-auto max-w-lg">
        <p className="text-2xl text-red-400 font-semibold">
          Something went wrong!
        </p>
        <p className="text-md text-red-500 mt-2">
          Error:{" "}
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred."}
        </p>
      </div>
    );
  }

  if (perks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-400">Not perks found</p>
      </div>
    );
  }

  const sortedPerks = [...perks].sort((a, b) => {
    const isAGeneral = !a.survivorCode && !a.killerCode;
    const isBGeneral = !b.survivorCode && !b.killerCode;
    if (isAGeneral && !isBGeneral) return -1;
    if (!isAGeneral && isBGeneral) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="flex flex-wrap justify-center items-stretch gap-x-5 gap-y-6 absolute">
      {sortedPerks.map((perk) => (
        <PerkCard
          key={perk.id}
          perk={perk}
          onSelect={onPerkSelect}
          isSelected={selectedPerkIds?.includes(perk.id)}
          isDisabled={maxPerksReached && !selectedPerkIds?.includes(perk.id)}
        />
      ))}
    </div>
  );
};

export default PerkListDisplay;
