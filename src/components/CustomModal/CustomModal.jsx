import Modal from 'react-modal';
import './CustomModal.scss';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '230px',
        width: '400px',
        borderRadius: '5px',
        boxShadow: '0 10px 40px 0 #0000001a',
    },
    overlay: {
        width: '100%',
        zIndex: 1,
        background: 'transparent',
        boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(2px)',
    },
};

function CustomModal({ isOpen, isNo, isYes }) {
    return (
        <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
            <div className="host">
                <p>Warning! Do you want to change the category?</p>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '25px', justifyContent: 'center', alignItems: 'center', marginTop: '40px', marginBottom: '40px' }}>
                    <button onClick={isYes}>Yes</button>
                    <button onClick={isNo}>No</button>
                </div>
            </div>
        </Modal>
    );
}

export default CustomModal;
