import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css'
const ModalOverlay = props => {

    return (
        <section className={styles.containerModalOverlay} onClick={props.close}>
            {props.children}
        </section>

    );
};

ModalOverlay.propTypes = {
    children: PropTypes.element,
    close: PropTypes.func.isRequired
};

export default ModalOverlay;