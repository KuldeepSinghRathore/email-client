import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { EmailCardItemProps } from "../EmailCard/types/types";
import axios from "axios";
import { formatTimeStamp } from "../../helper/utils";
import Avatar from "../Avatar";
import EmailBodySkelton from "../Skeltons/EmailBodySkelton";

type Props = {
    card: EmailCardItemProps;
    onFavToggle: () => void;

    isFavorite: boolean;
};
const fetchRecipeBody = async (recipeId: string): Promise<string> => {
    const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}?id=${recipeId}`
    );
    const { body } = await response.data;

    return body;
};
export const EmailBody = ({ card, onFavToggle, isFavorite }: Props) => {
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["list", card.id],
        queryFn: () => fetchRecipeBody(card.id),
        placeholderData: keepPreviousData,
    });
    if (isLoading) {
        return (
            <>
                <EmailBodySkelton />
            </>
        );
    }
    if (isError) return <div>Error While Fetching Emails {error?.message}</div>;
    return (
        <div
            className={`flex w-[62%]  py-5 bg-white text-[#636363]  rounded-xl mt-4 border-2 border-[#cfd2dc] `}
        >
            <div className=" w-full ">
                <div className="flex">
                    <Avatar
                        text={card.from.name[0]}
                        twStyle={`${"ml-5 pt-1"}`}
                    />

                    <div className="ml-5 ">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold flex-1 ">
                                {card.subject}
                            </h2>
                            <button
                                onClick={onFavToggle}
                                className="bg-[#e54065]  flex-1 max-w-fit mr-10  text-white px-4 py-1 rounded-full flex"
                            >
                                {isFavorite
                                    ? "Remove favorite"
                                    : "Mark as favorite"}
                            </button>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm ">
                                {formatTimeStamp(card.date)}
                            </p>
                        </div>
                        {data && (
                            <div
                                style={{ height: "calc(80vh - 160px)" }}
                                className="prose  mx-auto pr-10 overflow-y-scroll scrollbar-hide"
                                dangerouslySetInnerHTML={{ __html: data }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
