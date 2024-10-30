import { useState } from "react";
import { EmailList } from "./components/EmailList";
import { Paginate } from "./components/Paginate";
import { useEmailList } from "./hooks/useEmailList";
import { EmailCardItemProps } from "./components/EmailCard/types/types";
import { EmailBody } from "./components/EmailBody/EmailBody";

function App() {
    const {
        handlePrevious,
        handleNext,
        isLoading,
        isError,
        error,
        pageNumber,
        data,
        total,
    } = useEmailList();
    const [selectedCard, setSelectedCard] = useState<EmailCardItemProps>();
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error While Fetching Emails {error?.message}</div>;
    function handleCardClick(card: EmailCardItemProps) {
        if (card?.id) {
            //get local data
            const storedData = localStorage.getItem("read");
            console.log({ storedData });
            if (storedData) {
                const parsedData = JSON.parse(storedData) || [];
                if (!parsedData.includes(card.id)) {
                    parsedData.push(card.id);
                }
                localStorage.setItem("read", JSON.stringify(parsedData));
            } else if (!storedData) {
                localStorage.setItem("read", JSON.stringify([card.id]));
            }
            const newCard: EmailCardItemProps = { ...card, isRead: true };
            setSelectedCard(newCard);
        }
    }
    function handleFavoriteToggle(card: EmailCardItemProps) {
        if (card?.id) {
            const storedData = localStorage.getItem("favorite");
            console.log({ storedData });
            if (storedData) {
                const parsedData = JSON.parse(storedData) || [];
                console.log({ parsedData });
                if (!parsedData.includes(card.id)) {
                    parsedData.push(card.id);
                }
                localStorage.setItem("favorite", JSON.stringify(parsedData));
            } else if (!storedData) {
                localStorage.setItem("favorite", JSON.stringify([card.id]));
            }
            const newCard: EmailCardItemProps = {
                ...card,
                isFavorite: !card.isFavorite,
            };

            setSelectedCard(newCard);
        }
    }
    return (
        <div className=" h-full bg-[#f4f5f9] max-w-screen-2xl">
            <main className="w-[92%] mx-auto bg-red-400 min-h-screen flex">
                {data?.length > 0 && (
                    <div className={`flex   w-full `}>
                        <div
                            className={`flex  ${
                                selectedCard?.id ? "flex-[0.35]" : "flex-1"
                            }`}
                        >
                            <div className="flex-1">
                                <Paginate
                                    handleNext={handleNext}
                                    handlePrevious={handlePrevious}
                                    pageNumber={pageNumber}
                                    total={total}
                                />
                                <EmailList
                                    data={data}
                                    handleCardClick={handleCardClick}
                                    // selectedCard={selectedCard}
                                />
                            </div>
                        </div>
                        {selectedCard?.id && (
                            <div
                                className={`flex  ${
                                    selectedCard?.id ? "flex-[0.60]" : "flex-1 "
                                }`}
                            >
                                <EmailBody
                                    card={selectedCard}
                                    onFavToggle={() =>
                                        handleFavoriteToggle(selectedCard)
                                    }
                                />
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
