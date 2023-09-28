import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ModalOverlay from "../modal-overlay/modal-overlay";
import {createPortal} from "react-dom";
import styles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = props => {
    let element = window.document.getElementById('modal')
        const escFunction = useCallback((event) => {
                if (event.key === "Escape") {
                    props.setActive(false)
                }
        }, []);

        useEffect(() => {
            document.addEventListener("keydown", escFunction, false);

            return () => {
                document.removeEventListener("keydown", escFunction, false);
            };
        }, []);



    return createPortal(
        <ModalOverlay close={() => props.setActive(false)}>
            <section className={styles.containerModal} onClick={event => event.stopPropagation()}>
                <div className={styles.containerButtonCloseTitle}>
                        <h2 className={`text text_type_main-large ${styles.titleIngredient}`}>
                            {props.isTitle && (
                                "Детали ингредиента"
                            )}
                        </h2>
                    <button className={styles.closeButton} onClick={() => props.setActive(false)}>
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
    isTitle: PropTypes.bool.isRequired,
    setActive: PropTypes.func.isRequired
};

export default Modal;