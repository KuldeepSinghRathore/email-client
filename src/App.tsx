import { useState } from "react";
import { EmailList } from "./components/EmailList";
import { Paginate } from "./components/Paginate";
import { useEmailList } from "./hooks/useEmailList";
import { EmailCardItemProps } from "./components/EmailCard/types/types";
import { EmailBody } from "./components/EmailBody/EmailBody";
import { handleFavoriteToggle } from "./helper/utils";

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
        localData,
        setLocalData,
    } = useEmailList();
    const [selectedCard, setSelectedCard] = useState<EmailCardItemProps | null>(
        null
    );
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error While Fetching Emails {error?.message}</div>;

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
                                    localData={localData}
                                    setLocalData={setLocalData}
                                    setSelectedCard={setSelectedCard}
                                />
                            </div>
                        </div>
                        {selectedCard?.id && (
                            <EmailBody
                                name={selectedCard.from.name}
                                timestamp={selectedCard.date}
                                id={selectedCard.id}
                                isFavorite={localData?.favoriteIds?.includes(
                                    selectedCard.id
                                )}
                                onFavToggle={() =>
                                    handleFavoriteToggle(
                                        selectedCard.id,
                                        localData,
                                        setLocalData
                                    )
                                }
                            />
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
