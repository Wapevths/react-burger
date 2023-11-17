import React from 'react';
import PropTypes from 'prop-types';
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

ModalOverlay.propTypes = {
    children: PropTypes.element,
    onClose: PropTypes.func.isRequired
};

export default ModalOverlay;