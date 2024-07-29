export interface IMsgHistory {
    ai: string;
    user: string;
}

export interface IchatWithAi {
    message: string;
    category: string;
    country: string;
    chat_history: IMsgHistory[];
}
