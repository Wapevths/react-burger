import React, { useEffect } from 'react';
import ModalOverlay from "../modal-overlay/modal-overlay";
import {createPortal} from "react-dom";
import styles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IModalProps {
    children: React.ReactElement,
    title: string,
    setActive: (status:boolean) => void
}
const Modal = (props:IModalProps) => {
    const element:any = window.document.getElementById('modal')
    const escFunction = (event:KeyboardEvent) => {
        if (event.key === "Escape") {
            handleCloseModal()
        }
    }
    useEffect(() => {
        document.addEventListener("keydown", escFunction);
        return () => {
            document.removeEventListener("keydown", escFunction);
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
                    <button className={styles.closeButton} onClick={handleCloseModal} id="close-button">
                        <CloseIcon type="primary"/>
                    </button>
                </div>

                {props.children}
            </section>
        </ModalOverlay>,
        element
    );
};


export default Modal;
