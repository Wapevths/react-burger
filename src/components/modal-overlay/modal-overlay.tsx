import React from 'react';
import styles from './modal-overlay.module.css'
interface IModalOverlay {
    onClose: () => void,
    children: React.ReactElement
}
const ModalOverlay = (props:IModalOverlay) => {

    return (
        <section className={styles.containerModalOverlay} onClick={props.onClose}>
            {props.children}
        </section>

    );
};

export default ModalOverlay;