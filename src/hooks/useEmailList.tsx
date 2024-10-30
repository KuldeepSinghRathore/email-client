import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { EmailCardItemProps } from "../components/EmailCard/types/types";

export const useEmailList = () => {
    const [pageNumber, setPageNumber] = useState(1);

    const { data, isError, isLoading, ...rest } = useQuery({
        queryKey: ["list", pageNumber],
        queryFn: () => fetchEmails(pageNumber),
        placeholderData: keepPreviousData,
        staleTime: 30 * 1000,
    });
    async function fetchEmails(pageNumber: number) {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}?page=${pageNumber}`
        );
        const data = await response.data;
        return data;
    }
    const handleNext = () => {
        setPageNumber((prev) => prev + 1);
    };
    const handlePrevious = () => {
        setPageNumber((prev) => prev - 1);
    };
    const list: EmailCardItemProps[] = data?.list?.length > 0 ? data.list : [];
    const total = data?.total ? data.total : 0;
    const getLocalRead = localStorage.getItem("read");
    const readParsed: string[] = getLocalRead ? JSON.parse(getLocalRead) : [];
    const getLocalFav = localStorage.getItem("favorite");
    const favParsed: string[] = getLocalFav ? JSON.parse(getLocalFav) : [];
    const finalData = list.map((item) => {
        console.log("processed inside findal");
        const id = item.id;
        return {
            ...item,

            isRead: readParsed.includes(id),
            isFavorite: favParsed.includes(id),
        };
    });
    return {
        data: finalData,
        total,
        isError,
        isLoading,
        handleNext,
        handlePrevious,
        pageNumber,
        ...rest,
    };
};
