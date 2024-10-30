import axios from "axios";
import { LocalDataProps } from "../hooks/useEmailList";
import { EmailCardItemProps } from "../components/EmailCard/types/types";

export const getLocalStorage = (key: string) => {
    console.log("Reading Local Data");

    const item = localStorage.getItem(key);
    try {
        return item ? JSON.parse(item) : [];
    } catch {
        console.log(`Error parsing ${key} from localStorage`);
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