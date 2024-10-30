import { handleCardClick } from "../helper/utils";
import { LocalDataProps } from "../hooks/useEmailList";
import { EmailCard } from "./EmailCard/EmailCard";
import { EmailCardItemProps } from "./EmailCard/types/types";

type EmailCardProps = {
    data: EmailCardItemProps[];
    // handleCardClick: (card: EmailCardItemProps) => void;
    // selectedCard?: EmailCardItemProps;
    localData: LocalDataProps;
    setLocalData: React.Dispatch<React.SetStateAction<LocalDataProps>>;
    setSelectedCard: React.Dispatch<
        React.SetStateAction<EmailCardItemProps | null>
    >;
};
export const EmailList = ({
    data,
 
    localData,setLocalData,setSelectedCard
}:
EmailCardProps) => {
    return (
        <div className=" overflow-y-scroll h-[92vh] w-full ">
            {data?.map((card) => {
                return (
                    <EmailCard
                        key={card.id}
                        card={card}
                        onClick={() => handleCardClick(card,localData,setLocalData,setSelectedCard)}
                        isRead={localData?.readIds?.includes(card.id)}
                        isFavorite={localData?.favoriteIds?.includes(card.id)}
                        // isSelected={card.id === selectedCard?.id}
                        // isFavorite={
                        //     (card.id === selectedCard?.id &&
                        //         selectedCard?.isFavorite) ||
                        //     false
                        // }
                    />
                );
            })}
        </div>
    );
};
