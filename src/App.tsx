import { useMemo, useState } from "react";
import { EmailList } from "./components/EmailList";
import { Paginate } from "./components/Paginate";
import { useEmailList } from "./hooks/useEmailList";
import { EmailCardItemProps } from "./components/EmailCard/types/types";
import { EmailBody } from "./components/EmailBody/EmailBody";
import { handleFavoriteToggle } from "./helper/utils";
import { FilterBy } from "./components/FilterBy";
import AppSkelton from "./components/Skeltons/AppSkelton";

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
                default:
                    return data;
            }
        };

        return getFilteredData(filter, data);
    }, [data, filter, localData.favoriteIds, localData.readIds]);
    const handleFilter = (selected: FilterType) => {
        setFilter(selected);
    };
    if (isLoading) {
        return <AppSkelton />;
    }
    if (isError) return <div>Error While Fetching Emails {error?.message}</div>;

    return (
        <div className=" min-h-screen relative  z-0 flex flex-col bg-[#f4f5f9] w-screen ">
            <header className="w-[92%]    mx-auto h-20 py-4 max-w-screen-xl flex flex-col justify-center ">
                <FilterBy filter={filter} handleFilter={handleFilter} />
            </header>
            <main
                style={{ height: "calc(100vh - 160px)" }}
                className="w-[92%] mx-auto     max-w-screen-xl flex"
            >
                {finalData && finalData?.length > 0 ? (
                    <div
                        className={`flex overflow-y-scroll scrollbar-hide w-full  justify-between`}
                    >
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
                    <div className=" w-[92%] mx-auto  justify-center items-center flex-1   max-w-screen-xl text-2xl text-[#636363] flex flex-col capitalize">
                        No Data Found For {filter}
                    </div>
                )}
            </main>
            <footer className="absolute bottom-0 left-0 right-0 max-w-screen-xl flex w-[92%]  mx-auto   h-20 ">
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
