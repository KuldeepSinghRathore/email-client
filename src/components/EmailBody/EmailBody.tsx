type Props = {
    id: string;
    name: string;
    timestamp: number;
    onFavToggle: () => void;

    isFavorite: boolean;
};
export const EmailBody = ({
    id,
    name,
    timestamp,
    onFavToggle,
    isFavorite,
}: Props) => {
    return (
        <div
        className={`flex  ${
            id ? "flex-[0.60]" : "flex-1 "
        }`}
    >
        <div className="relative border-2">
            <pre className="whitespace-pre-wrap break-words p-4 text-sm">
                {JSON.stringify({ id, name, timestamp, isFavorite }, null, 2)}
            </pre>
            <button onClick={onFavToggle} className="absolute right-5 top-5">
                {isFavorite ? "Remove Favorite" : "MarkFavorite"}
            </button>
        </div>
        </div>
    );
};
