import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useModal} from "../../hooks/useModal";

const BurgerConstructor = props => {
    const [firstElement, setFirstElement] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const { isModalOpen, openModal, closeModal } = useModal();


    useEffect(() => {
        let sum = 0

        props.data.find(item => item.type === 'bun' ? setFirstElement(item) : "")

        props.data.forEach(x => {
            sum += x.price;
        });
        setTotalPrice(sum)

    }, [props])
    return (
        <main className={styles.mainContainerBurgerConstructor}>
            <div className={styles.mainContainer}>
                <ConstructorElement text={firstElement.name + ' (верх)'}
                                    price={firstElement.price}
                                    isLocked={true}
                                    type={'top'}
                                    extraClass={`mt-25 mb-4 ${styles.firstConstructorElement}`}
                                    thumbnail={firstElement.image}
                />
                <section className={`custom-scroll ${styles.mainMapBurgerConstructor}`}>

                    {props.data.filter(item => item.type !== 'bun').map((item, index) => (
                        <div className={styles.containerBurgerConstructor} key={index}>
                            <DragIcon type={"primary"}/>
                            <ConstructorElement text={item.name}
                                                thumbnail={item.image}
                                                price={item.price}
                            />
                        </div>
                    ))}

                </section>
                <ConstructorElement text={firstElement.name  + ' (низ)'}
                                    thumbnail={firstElement.image}
                                    isLocked={true}
                                    type={'bottom'}
                                    extraClass={`mt-4 ${styles.lastConstructorElement}`}
                                    price={firstElement.price}
                />
                <section className={`pt-10 ${styles.containerTotalPrice}`}>
                    <div className={`pr-10 ${styles.containerPrice}`}>
                        <span className="text text_type_digits-medium">
                            {totalPrice}
                        </span>
                        <CurrencyIcon type={"primary"}/>
                    </div>
                    <Button htmlType="button" onClick={openModal} type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </section>
            </div>
            {isModalOpen && (
                <Modal title="" setActive={closeModal}>
                    <OrderDetails/>
                </Modal>
            )}
        </main>
    );
};

BurgerConstructor.propTypes = {
    data: PropTypes.array.isRequired
};

export default BurgerConstructor;