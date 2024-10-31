import { formatTimeStamp } from "../../helper/utils";
import Avatar from "../Avatar";
import { EmailCardItemProps } from "./types/types";
interface EmailCardProps {
    card: EmailCardItemProps;
    onClick: () => void;
    isClicked: boolean;
    isFavorite: boolean;
    isRead: boolean;
    isSelected: boolean;
}
export const EmailCard = ({
    card,
    onClick,
    isFavorite,
    isRead,
    isClicked,
    isSelected,
}: EmailCardProps) => {
    return (
        <div
            className={`
                ${isRead ? "bg-[#f2f2f2]" : "bg-white"} 
             my-4 relative text-[#636363] border-2 cursor-pointer border-[#cfd2dc] rounded-xl ${
                 isClicked && "text-sm "
             } ${isSelected && "border-[#e54065]"}`}
            onClick={onClick}
        >
            <div className={`flex  py-3 ${isClicked && "py-2.5"}`}>
                <Avatar
                    text={card.from.name[0]}
                    twStyle={`${
                        isClicked ? "min-w-[20%] pt-1" : "min-w-[10%] pt-1"
                    }`}
                />

                <div className="flex-[0.9]">
                    <div className={`font-medium ${isClicked && "pb-1 "} `}>
                        <span className="font-normal pr-1 ">From:</span>
                        {card?.from?.name ?? ""} {card?.from?.email ?? ""}
                    </div>
                    <div className={`  font-medium ${isClicked && " pt-0"}`}>
                        {" "}
                        <span className="font-normal pr-1">Subject:</span>{" "}
                        {card.subject}
                    </div>
                    <div className={`py-1 ${isClicked && "py-0 pb-1"}`}>
                        {!isClicked
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
