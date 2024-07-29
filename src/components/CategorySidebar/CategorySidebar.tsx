import './category-sidebar.scss';
import { FC, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { getCategories } from '../../services/chat.service';
import { useQuery } from 'react-query';
import CustomModal from '../CustomModal/CustomModal';
import { useDashboardContext } from '../../pages/Dashboard/Dashboard';

interface Props {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    setActive: React.Dispatch<React.SetStateAction<number>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategorySidebar: FC<Props> = ({ category, setCategory, setActive, setIsOpen }) => {
    const { allMsgs } = useDashboardContext();
    useQuery({
        queryKey: ['categoryKey'],
        queryFn: getCategories,
        onSuccess: (data) => {
            if (!data.error) {
                setCategories(data);
            }
        },
    });
    const [categories, setCategories] = useState<[]>([]);
    const [warningModalOpen, setWarningModalOpen] = useState<Boolean>(false);
    const [toBeSet, setToBeSet] = useState<string>('');

    const handleCloseClick = () => {
        setActive(0);
        setIsOpen(false);
    };

    const handleCategory = (name: string) => {
        if (category === '' || allMsgs.length === 0) {
            setCategory(name);
        } else {
            setToBeSet(name);
            setWarningModalOpen(true);
        }
    };

    const isYes = () => {
        setWarningModalOpen(false);
        setCategory(toBeSet);
        setToBeSet('');
    };
    const isNo = () => {
        setWarningModalOpen(false);
        setToBeSet('');
    };

    return (
        <div className="categories-wrapper">
            <div className="heading-wrapper">
                <h1 className="category-heading">Categories</h1>
                <div className="cross-wrapper">
                    <RxCross2 fontSize={20} color="#fff" className="arrow-right" onClick={handleCloseClick} />
                </div>
            </div>
            <div className={`categories-sidebar`}>
                {categories?.map((name: string, key: number) => (
                    <div key={key.toString()} className={`${name === category ? 'catgeory-selected-item' : 'category-item'}`} onClick={() => handleCategory(name)}>
                        <p className="category-text">{name}</p>
                        <HiArrowNarrowRight fontSize={20} color={name === category ? 'var(--primary-color)' : 'var(--primary-color)'} />
                    </div>
                ))}
            </div>
            <CustomModal isOpen={warningModalOpen} isNo={isNo} isYes={isYes} />
        </div>
    );
};
export default CategorySidebar;
