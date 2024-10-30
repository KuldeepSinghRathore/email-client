export type EmailCardItemProps = {
    id: string;
    from: {
        email: string;
        name: string;
    };
    date: number;
    subject: string;
    short_description: string;
    isRead: boolean;
    isFavorite: boolean;
};