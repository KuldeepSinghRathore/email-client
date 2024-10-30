import { EmailCard } from "./EmailCard/EmailCard";
import { EmailCardItemProps } from "./EmailCard/types/types";

type EmailCardProps = {
    data: EmailCardItemProps[];
    handleCardClick: (card: EmailCardItemProps) => void;
    // selectedCard?: EmailCardItemProps;
};
export const EmailList = ({
    data,
    handleCardClick,
}: // selectedCard,
EmailCardProps) => {
    return (
        <div className=" overflow-y-scroll h-[92vh] w-full ">
            {data?.map((card) => {
                return (
                    <EmailCard
                        key={card.id}
                        card={card}
                        onClick={() => handleCardClick(card)}
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
