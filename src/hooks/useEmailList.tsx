import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { EmailCardItemProps } from "../components/EmailCard/types/types";
import { fetchEmails, getLocalStorage } from "../helper/utils";
export type LocalDataProps = { readIds: string[]; favoriteIds: string[] };
const staleTime = 30 * 1000;
const url = import.meta.env.VITE_BASE_URL;
export const useEmailList = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const { readIds, favoriteIds } = useMemo(() => {
        return {
            readIds: getLocalStorage("read"),
            favoriteIds: getLocalStorage("favorite"),
        };
    }, []);
    const [localData, setLocalData] = useState<LocalDataProps>({
        readIds,
        favoriteIds,
    });

    const { data, isError, isLoading, ...rest } = useQuery({
        queryKey: ["list", pageNumber],
        queryFn: () => fetchEmails(pageNumber, url),
        placeholderData: keepPreviousData,
        staleTime: staleTime,
    });

    const handleNext = () => {
        setPageNumber((prev) => prev + 1);
    };
    const handlePrevious = () => {
        setPageNumber((prev) => prev - 1);
    };

    const finalData = useMemo(() => {
        const list: EmailCardItemProps[] = data?.list ?? [];
        return list.map((item) => {
            const id = item.id;
            return {
                ...item,

                isRead: readIds.includes(id),
                isFavorite: favoriteIds.includes(id),
            };
        });
    }, [data?.list, favoriteIds, readIds]);
    return {
        data: finalData,
        total: data?.total ?? 0,
        isError,
        isLoading,
        handleNext,
        handlePrevious,
        pageNumber,
        setLocalData,
        localData,
        ...rest,
    };
};
