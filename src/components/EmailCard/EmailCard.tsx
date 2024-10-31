import { formatTimeStamp } from "../../helper/utils";
import Avatar from "../Avatar";
import { EmailCardItemProps } from "./types/types";
interface EmailCardProps {
    card: EmailCardItemProps;
    onClick: () => void;
    isSelected: boolean;
    isFavorite: boolean;
    isRead: boolean;
}
export const EmailCard = ({
    card,
    onClick,
    isFavorite,
    isRead,
    isSelected,
}: EmailCardProps) => {
    return (
        <div
            className={`
                ${isRead ? "bg-[#f2f2f2]" : "bg-white"} 
             my-4 relative text-[#636363] border-2 border-[#cfd2dc] rounded-xl ${
                 isSelected && "text-sm"
             }`}
            onClick={onClick}
        >
            <div className={`flex  py-3 ${isSelected && "py-2.5"}`}>
                <Avatar
                    text={card.from.name[0]}
                    twStyle={`${
                        isSelected ? "min-w-[20%] pt-1" : "min-w-[10%] pt-1"
                    }`}
                />

                <div className="flex-[0.9]">
                    <div className={`font-medium ${isSelected && "pb-1 "} `}>
                        <span className="font-normal pr-1 ">From:</span>
                        {card?.from?.name ?? ""} {card?.from?.email ?? ""}
                    </div>
                    <div className={`  font-medium ${isSelected && " pt-0"}`}>
                        {" "}
                        <span className="font-normal pr-1">Subject:</span>{" "}
                        {card.subject}
                    </div>
                    <div className={`py-1 ${isSelected && "py-0 pb-1"}`}>
                        {!isSelected
                            ? card?.short_description
                            : card.short_description.substring(0, 42) +
                              `${"..."}`}
                    </div>
                    <div className="flex gap-5">
                        <div>{formatTimeStamp(card.date)}</div>
                        <div className="text-[#e54065] font-medium">
                            {isFavorite && "Favorite"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
