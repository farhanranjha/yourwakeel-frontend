import { FC } from 'react';
import './box.scss';

interface Props {
    sender?: string;
    message?: string;
}
const ChatBox: FC<Props> = ({ sender, message }) => {
    return <div className={`${sender === 'user' ? 'chat-box-wrap' : 'chat-box-ai'}`}>{message}</div>;
};
export default ChatBox;
