import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ModalOverlay from "../modal-overlay/modal-overlay";
import {createPortal} from "react-dom";
import styles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = props => {
    const element = window.document.getElementById('modal')
    const escFunction = (event) => {
        if (event.key === "Escape") {
            handleCloseModal()
        }
    }
    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, []);

    const handleCloseModal = () => {
        props.setActive(false)
    }

    return createPortal(
        <ModalOverlay onClose={handleCloseModal}>
            <section className={styles.containerModal} onClick={event => event.stopPropagation()}>
                <div className={styles.containerButtonCloseTitle}>
                        <h2 className={`text text_type_main-large ${styles.titleIngredient}`}>
                            {props.title}
                        </h2>
                    <button className={styles.closeButton} onClick={handleCloseModal}>
                        <CloseIcon type="primary"/>
                    </button>
                </div>

                {props.children}
            </section>
        </ModalOverlay>,
        element
    );
};

Modal.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string,
    setActive: PropTypes.func.isRequired
};

export default Modal;