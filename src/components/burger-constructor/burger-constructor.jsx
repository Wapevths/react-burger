import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useModal} from "../../hooks/useModal";
import {useDispatch, useSelector} from "react-redux";
import {getConstructorIngredients} from "../../services/ingredients/selectors";
import {
    addIngredient,
    DELETE_INGREDIENT,
    POST_ORDER_INGREDIENTS_ERROR,
    POST_ORDER_INGREDIENTS_REQUEST,
    POST_ORDER_INGREDIENTS_SUCCESS,
} from "../../services/ingredients/actions";
import {useDrag, useDrop} from "react-dnd";
import {store} from "../../services/store";

const BurgerConstructor = props => {
    const [firstElement, setFirstElement] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const {isModalOpen, openModal, closeModal} = useModal();
    const orderNumber = useSelector(state => state.ingredients.orderIngredients)
    const data = useSelector(getConstructorIngredients)
    const dispatch = useDispatch()

    const ref = useRef(null)
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

    const postOrderIngredient = () => {
        const orderIDAllIngredient = data.map((item) => ({_id: item._id}))
        dispatch({type: POST_ORDER_INGREDIENTS_REQUEST})
        fetch('https://norma.nomoreparties.space/api/orders', {
            method: "POST",
            body: JSON.stringify({ingredients: orderIDAllIngredient}),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) =>
                res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
            )
            .then((res) => {
                console.log(res)
                dispatch({type:POST_ORDER_INGREDIENTS_SUCCESS, payload: res})
                openModal();
            })
            .catch((err) => {
                dispatch({type: POST_ORDER_INGREDIENTS_ERROR})
                console.error(err)
            });
    }

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop(ingredientObj) {
            dispatch(addIngredient(ingredientObj))
        }
    })

    const [{isDragging}, drag] = useDrag({
        type: 'moveIngredient',
        item: (id, item) => {
            return {id, item}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    const [, drop] = useDrop({
        accept: 'moveIngredient',
        hover: (item, monitor) => {

        }
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    const moveIngredient = (dragIndex, hoverIndex) => {
        console.log(dragIndex)
        console.log(hoverIndex)
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

                    <section className={`custom-scroll ${styles.mainMapBurgerConstructor}`}>

                        {data.filter(item => item.type !== 'bun').map((item, index) => (
                            <div ref={ref} onClick={moveIngredient(item.uniqId, index)} style={{opacity}}
                                 className={styles.containerBurgerConstructor} key={index}>
                                <DragIcon type={"primary"}/>
                                <ConstructorElement text={item.name}
                                                    thumbnail={item.image}
                                                    price={item.price}
                                                    handleClose={() => deleteItem(item.uniqId)}
                                />
                            </div>
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
                            Оформить заказ
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

BurgerConstructor.propTypes = {};

export default BurgerConstructor;