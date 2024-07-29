import { FaArrowUpLong } from 'react-icons/fa6';
import ChatBox from '../ChatBox/ChatBox';
import { chatWithAi } from '../../services/chat.service';
import { useMutation } from 'react-query';
import React, { useEffect, useRef, useState } from 'react';
import './chat.scss';
import Textarea from 'react-expanding-textarea';
import Loader from '../baseComponents/Loader/Loader';
import { useDashboardContext } from '../../pages/Dashboard/Dashboard';

const Chat: React.FC = () => {
    const { category, allMsgs, setAllMsgs } = useDashboardContext();
    const [userMessage, setUserMessage] = useState<string>('');
    const scrollViewRef = useRef<HTMLDivElement>(null);
    const { mutate: sendChat, isLoading: chatLoading } = useMutation(chatWithAi, {
        onSuccess: (data) => {
            setAllMsgs((prevMsgs) => {
                const updatedMsgs = [...prevMsgs];
                updatedMsgs[updatedMsgs.length - 1].ai = data.message;
                return updatedMsgs;
            });
        },
    });

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollIntoView({ behavior: 'smooth' });
            scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
        }
    }, [allMsgs]);

    useEffect(() => {
        setAllMsgs([]);
    }, [category]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedMsgs = [...allMsgs, { ai: 'Loading ...', user: userMessage }];
        setAllMsgs(updatedMsgs);
        await sendChat({ message: userMessage, category: category[0], country: 'PK', chat_history: updatedMsgs.slice(-6, -1) });
        setUserMessage('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey && userMessage.trim() !== '' && !chatLoading) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="chat-box-wrapper">
            <div className="chat-box" ref={scrollViewRef}>
                {allMsgs.map((data, index) => (
                    <React.Fragment key={index}>
                        <div className="chat-row">
                            <ChatBox sender="user" message={data.user} />
                        </div>

                        {data.ai === 'Loading ...' ? (
                            <div className="chat-row-loading">
                                <Loader />
                            </div>
                        ) : (
                            <div className="chat-row-ai">
                                <ChatBox sender="ai" message={data.ai} />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div className="chat-input-wrapper">
                <div className="inputBox">
                    <Textarea className="myinput" onKeyDown={handleKeyDown} onChange={(e) => setUserMessage(e.target.value)} value={userMessage} placeholder="Talk with me" spellCheck={false} />
                </div>
                <button
                    disabled={userMessage.trim() === '' || chatLoading}
                    className={`chat-submit-btn ${userMessage.trim() === '' || chatLoading ? '' : 'chat-submit-btn-active'}`}
                    onClick={handleSubmit}
                >
                    <FaArrowUpLong color="var(--light-color)" />
                </button>
            </div>
        </div>
    );
};

export default Chat;
