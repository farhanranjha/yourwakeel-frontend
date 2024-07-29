import { BiCategory } from 'react-icons/bi';
import { FC, useContext, useState } from 'react';
import CategorySidebar from '../CategorySidebar/CategorySidebar';
import { RiArrowRightDoubleLine, RiArrowLeftDoubleLine } from 'react-icons/ri';
import './sidebar.scss';
import { useDashboardContext } from '../../pages/Dashboard/Dashboard';

const Sidebar: FC = () => {
    const { category, setCategory } = useDashboardContext();
    const [active, setActive] = useState(0);
    const [isOpen, setIsOpen] = useState(true);

    const handleCloseClick = () => {
        setActive(0);
        setIsOpen(!isOpen);
    };

    return (
        <div className="wrapper">
            <div className="sidebar-wrapper">
                <div className="sidebar-selected-item">
                    <BiCategory fontSize={30} />
                    <p className="item-text">Categories</p>
                </div>
                {category && (
                    <div className="selected-catgegory">
                        <p>{category}</p>
                    </div>
                )}
            </div>
            {isOpen && <CategorySidebar category={category} setCategory={setCategory} setIsOpen={setIsOpen} setActive={setActive} />}
            <div className="close-btn" style={isOpen ? { marginLeft: '336px' } : {}}>
                {isOpen ? (
                    <RiArrowLeftDoubleLine fontSize={20} color="var(--primary-color)" className="arrow-right" onClick={handleCloseClick} />
                ) : (
                    <RiArrowRightDoubleLine fontSize={20} color="var(--primary-color)" className="arrow-right" onClick={handleCloseClick} />
                )}
            </div>
        </div>
    );
};
export default Sidebar;
