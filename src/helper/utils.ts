import axios from "axios";
import { LocalDataProps } from "../hooks/useEmailList";
import { EmailCardItemProps } from "../components/EmailCard/types/types";

export const getLocalStorage = (key: string) => {

    const item = localStorage.getItem(key);
    try {
        return item ? JSON.parse(item) : [];
    } catch {
        return [];
    }
};

export async function fetchEmails(pageNumber: number, url: string) {
    const response = await axios.get(
        `${url}?page=${pageNumber}`
    );
    const data = await response.data;
    return data;
}


export function handleFavoriteToggle(id: string, localData: LocalDataProps, setLocalData: React.Dispatch<React.SetStateAction<LocalDataProps>>) {
    if (id) {
        if (!localData.favoriteIds.includes(id)) {
            const newValue = [...localData.favoriteIds, id];
            setLocalData((p) => ({ ...p, favoriteIds: newValue }));
            localStorage.setItem("favorite", JSON.stringify(newValue));
        } else {
            const newArray = localData.favoriteIds.filter(
                (i) => i !== id
            );
            setLocalData((p) => ({ ...p, favoriteIds: newArray }));
            localStorage.setItem("favorite", JSON.stringify(newArray));
        }
    }
}
export function handleCardClick(card: EmailCardItemProps, localData: LocalDataProps, setLocalData: React.Dispatch<React.SetStateAction<LocalDataProps>>, setSelectedCard: React.Dispatch<React.SetStateAction<EmailCardItemProps | null>>) {
    if (card?.id) {
        if (!localData.readIds.includes(card.id)) {
            const newValue: string[] = [...localData.readIds, card.id];
            setLocalData((p) => ({ ...p, readIds: newValue }));
            localStorage.setItem("read", JSON.stringify(newValue));
        }

        const newCard: EmailCardItemProps = { ...card, isRead: true };
        setSelectedCard(newCard);
    }
}


export function formatTimeStamp(timestamp: number) {
    if (!timestamp || isNaN(new Date(timestamp).getTime())) {
        return ""
    }
    const date = new Date(timestamp)

    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear().toString()

    let hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const ampm = hours >= 12 ? 'pm' : 'am'

    hours = hours % 12
    hours = hours ? hours : 12     //now '0' to '12'
    return `${day}/${month}/${year} ${hours}:${minutes}${ampm}`

}