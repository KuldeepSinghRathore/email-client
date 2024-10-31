import { useMemo, useState } from "react";
import { EmailList } from "./components/EmailList";
import { Paginate } from "./components/Paginate";
import { useEmailList } from "./hooks/useEmailList";
import { EmailCardItemProps } from "./components/EmailCard/types/types";
import { EmailBody } from "./components/EmailBody/EmailBody";
import { handleFavoriteToggle } from "./helper/utils";
import { FilterBy } from "./components/FilterBy";

export type FilterType = "unread" | "read" | "favorite";
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
    const [filter, setFilter] = useState<FilterType>("unread");
    const finalData = useMemo(() => {
        const getFilteredData = (
            filterType: FilterType,
            data: EmailCardItemProps[]
        ) => {

            switch (filterType) {
                case "read":
                    return data.filter((item) =>
                        localData.readIds.includes(item.id)
                    );
                case "favorite": {
                    return data.filter((item) =>
                        localData.favoriteIds.includes(item.id)
                    );
                   
                }
                case "unread":
                    return data.filter(
                        (item) => !localData.readIds.includes(item.id)
                    );
                // case "all":
                default:
                    return data;
            }
        };

        return getFilteredData(filter, data);
    }, [data, filter, localData.favoriteIds, localData.readIds]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error While Fetching Emails {error?.message}</div>;
    const handleFilter = (selected: FilterType) => {
        setFilter(selected);
    };

    return (
        <div className=" min-h-screen  z-0 flex flex-col bg-[#f4f5f9] w-screen ">
            <header className="w-[92%]    mx-auto flex-[.2] py-4 max-w-screen-xl flex flex-col justify-center ">
                <FilterBy filter={filter} handleFilter={handleFilter} />
            </header>
            <main className="w-[92%] mx-auto  flex-[.6]   max-w-screen-xl flex">
                {finalData && finalData?.length > 0 ? (
                    <div className={`flex   w-full  justify-between`}>
                        <EmailList
                            data={finalData}
                            localData={localData}
                            setLocalData={setLocalData}
                            setSelectedCard={setSelectedCard}
                            selectedId={selectedCard?.id}
                        />

                        {selectedCard?.id && (
                            <EmailBody
                                card={selectedCard}
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
                ) : (
                    <div className=" w-[92%] mx-auto min-h-[70vh] justify-center items-center flex-1   max-w-screen-xl flex flex-col">
                        No Data Found For Filter {filter}
                    </div>
                )}
            </main>
            <footer className="pb  mx-auto  h-[0.2]  ">
                <Paginate
                    handleNext={handleNext}
                    handlePrevious={handlePrevious}
                    pageNumber={pageNumber}
                    total={total}
                />
            </footer>
        </div>
    );
}

export default App;
