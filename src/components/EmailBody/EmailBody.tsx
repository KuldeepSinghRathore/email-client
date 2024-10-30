import { EmailCardItemProps } from "../EmailCard/types/types";

type Props = {
    card: EmailCardItemProps;
    onFavToggle: () => void;
};
export const EmailBody = ({ card, onFavToggle }: Props) => {
    return (
        <div className="relative border-2">
            <pre className="whitespace-pre-wrap break-words p-4 text-sm">
                {JSON.stringify(card, null, 2)}
            </pre>
            <button onClick={onFavToggle} className="absolute right-5 top-5">
                MarkFavorite
            </button>
        </div>
    );
};
