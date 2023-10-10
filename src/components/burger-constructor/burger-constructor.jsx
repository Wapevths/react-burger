import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useModal} from "../../hooks/useModal";
import {useDispatch, useSelector} from "react-redux";
import {getConstructorIngredients} from "../../services/ingredients/selectors";
import {DELETE_INGREDIENT} from "../../services/ingredients/actions";

const BurgerConstructor = props => {
    const [firstElement, setFirstElement] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const { isModalOpen, openModal, closeModal } = useModal();

    const data = useSelector(getConstructorIngredients)
    const dispatch = useDispatch()

    useEffect(() => {
        let sum = 0

        data.find(item => item.type === 'bun' ? setFirstElement(item) : "")

        data.forEach(x => {
            sum += x.price;
        });
        setTotalPrice(sum)

    }, [data])

    const deleteItem = (uniqId) => {
        dispatch({type: DELETE_INGREDIENT, payload: uniqId})
    }

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

                    {data.filter(item => item.type !== 'bun').map((item, index) => (
                        <div className={styles.containerBurgerConstructor} key={index}>
                            <DragIcon type={"primary"}/>
                            <ConstructorElement text={item.name}
                                                thumbnail={item.image}
                                                price={item.price}
                                                handleClose={() => deleteItem(item.uniqId)}
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
};

export default BurgerConstructor;