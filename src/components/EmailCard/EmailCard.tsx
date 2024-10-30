import { EmailCardItemProps } from "./types/types";
interface EmailCardProps {
    card: EmailCardItemProps;
    onClick: () => void;
    // isSelected: boolean;
    // isFavorite: boolean;
}
export const EmailCard = ({
    card,
    onClick,
}: // isSelected,
// isFavorite,
EmailCardProps) => {
    return (
        <div
            className={`${
                card.isRead ? "bg-blue-400" : "bg-yellow-400"
            }  my-4 relative`}
            onClick={onClick}
        >
            <pre className="whitespace-pre-wrap break-words p-4 rounded-lg text-xs">
                {JSON.stringify(card, null, 2)}
            </pre>
            <div className="absolute bottom-4 right-4 text-black">
                {card.isFavorite ? "Favorite" : ""}
            </div>
        </div>
    );
};
