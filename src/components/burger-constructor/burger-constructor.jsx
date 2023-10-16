import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useModal} from "../../hooks/useModal";
import {useDispatch, useSelector} from "react-redux";
import {getConstructorIngredients} from "../../services/ingredients/selectors";
import {useDrop} from "react-dnd";
import BurgerConstructorList from "../burger-constructor-list/burger-constructor-list";
import {
    addIngredient,
    DELETE_INGREDIENT,
    postOrderIngredients,
    SORT_INGREDIENT,
} from "../../services/ingredients/actions";


const BurgerConstructor = props => {
    const [firstElement, setFirstElement] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const {isModalOpen, openModal, closeModal} = useModal();
    const orderNumber = useSelector(state => state.ingredients.orderIngredients)
    const isLoadingOrder = useSelector(state => state.ingredients.isLoadingOrderIngredients)
    const data = useSelector(getConstructorIngredients)
    const dispatch = useDispatch()

    useEffect(() => {
        let sum = 0

        data.find(item => item.type === 'bun' ? setFirstElement(item) : "")

        data.forEach(x => {
            if (x.type === 'bun') {
                sum += (x.price * 2)
            } else {
                sum += x.price;
            }
        });
        setTotalPrice(sum)
        if (data.length < 1) {
            setFirstElement([])
        }
    }, [data])

    const deleteItem = (uniqId) => {
        dispatch({type: DELETE_INGREDIENT, payload: uniqId})
    }

    const postOrderIngredient = () => {
        const orderIDAllIngredient = data.map((item) => ({_id: item._id}))
        dispatch(postOrderIngredients(orderIDAllIngredient, openModal))
    }

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop(ingredientObj) {
            dispatch(addIngredient(ingredientObj))
        }
    })
    const moveCard = (dragIndex, hoverIndex) => {
        const arrayNoBun = data.filter(item => item.type !== 'bun')
        const findBun = data.filter(item => item.type === 'bun')
        const dragCard = arrayNoBun[dragIndex]
        const newCards = [...arrayNoBun]
        newCards.splice(dragIndex, 1)
        newCards.splice(hoverIndex, 0, dragCard)
        newCards.push(...findBun)
        dispatch({type: SORT_INGREDIENT, payload: newCards})
    }

    return (
        <main className={styles.mainContainerBurgerConstructor} ref={dropRef}>
            {data.length >= 1 ? (
                <div className={styles.mainContainer}>
                    {firstElement.name !== undefined ? (
                        <ConstructorElement text={firstElement.name + ' (верх)'}
                                            price={firstElement.price}
                                            isLocked={true}
                                            type={'top'}
                                            extraClass={`mt-25 mb-4 ${styles.firstConstructorElement}`}
                                            thumbnail={firstElement.image}
                        />
                    ) : (
                        <div
                            className={`mt-25 mb-4 ${styles.firstConstructorElement} ${styles.noIngredientConstructor}`}>
                            добавьте булку
                        </div>
                    )}
                    {/*deleteItem(item.uniqId)*/}
                    <section className={`custom-scroll ${styles.mainMapBurgerConstructor}`}>

                        {data.filter(item => item.type !== 'bun').map((item, index) => (
                            <BurgerConstructorList key={item.uniqId}
                                                   data={item}
                                                   index={index}
                                                   id={item.uniqId}
                                                   moveCard={moveCard}
                                                   deleteItem={deleteItem}
                            />
                        ))}

                    </section>
                    {firstElement.name !== undefined ? (
                        <ConstructorElement text={firstElement.name + ' (низ)'}
                                            thumbnail={firstElement.image}
                                            isLocked={true}
                                            type={'bottom'}
                                            extraClass={`mt-4 ${styles.lastConstructorElement}`}
                                            price={firstElement.price}
                        />
                    ) : (
                        <div className={`mt-4 ${styles.lastConstructorElement} ${styles.noIngredientConstructor}`}>
                            добавьте булку
                        </div>
                    )}


                    <section className={`pt-10 ${styles.containerTotalPrice}`}>
                        <div className={`pr-10 ${styles.containerPrice}`}>
                        <span className="text text_type_digits-medium">
                            {totalPrice}
                        </span>
                            <CurrencyIcon type={"primary"}/>
                        </div>
                        <Button htmlType="button" onClick={postOrderIngredient} type="primary" size="medium">
                            {isLoadingOrder ? "Загрузка..." : "Оформить заказ"}
                        </Button>

                    </section>
                </div>
            ) : (
                <section className={styles.mainContainer}>
                    <div className={`mt-25 mb-4 ${styles.firstConstructorElement} ${styles.noIngredientConstructor}`}>
                        добавьте булку
                    </div>
                    <section
                        className={`custom-scroll ${styles.firstConstructorElement}  ${styles.noIngredientConstructor}`}>
                        добавьте содержимое бургера
                    </section>
                    <div className={`mt-4 ${styles.lastConstructorElement} ${styles.noIngredientConstructor}`}>
                        добавьте булку
                    </div>
                </section>
            )}
            {isModalOpen && (
                <Modal title="" setActive={closeModal}>
                    <OrderDetails orderConstructor={orderNumber}/>
                </Modal>
            )}
        </main>
    );
};


export default BurgerConstructor;