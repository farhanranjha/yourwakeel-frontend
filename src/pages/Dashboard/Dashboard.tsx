import React, { createContext, useContext, useState } from 'react';
import Chat from '../../components/Chat/Chat';
import { IMsgHistory } from '../../types/services';
import './dashboard.scss';
import Sidebar from '../../components/SIdebar/Sidebar';

interface DashboardProviderProps {
    children: React.ReactNode;
}

const DashboardContext = createContext<
    | {
          category: string;
          setCategory: React.Dispatch<React.SetStateAction<string>>;
          allMsgs: IMsgHistory[];
          setAllMsgs: React.Dispatch<React.SetStateAction<IMsgHistory[]>>;
      }
    | undefined
>(undefined);

export const useDashboardContext = () => useContext(DashboardContext)!;

const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
    const [category, setCategory] = useState<string>('');
    const [allMsgs, setAllMsgs] = useState<IMsgHistory[]>([]);

    return <DashboardContext.Provider value={{ category, setCategory, allMsgs, setAllMsgs }}>{children}</DashboardContext.Provider>;
};

const Dashboard: React.FC = () => {
    return (
        <DashboardProvider>
            <div className="home-wrapper">
                <Sidebar/>
                <div className="chat-wrapper">
                    <Chat />
                </div>
            </div>
        </DashboardProvider>
    );
};

export default Dashboard;
