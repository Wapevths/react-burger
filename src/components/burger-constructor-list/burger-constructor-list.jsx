import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import styles from "./burger-constructor-list.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";

const BurgerConstructorList = props => {
    const { data, deleteItem, index, moveCard, id } = props

    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
        accept: 'moveCardConstructor',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveCard(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })
    const [, drag] = useDrag({
        type: 'moveCardConstructor',
        item: () => {
            return { id, index }
        },

    })
    drag(drop(ref))

    return (
        <div className={styles.containerBurgerConstructor}
             data-handler-id={handlerId}
             ref={ref}

        >
            <DragIcon type={"primary"}/>
            <ConstructorElement text={data.name}
                                thumbnail={data.image}
                                price={data.price}
                                handleClose={() => deleteItem(data.uniqId)}
            />
        </div>
    );
};

BurgerConstructorList.propTypes = {

};

export default BurgerConstructorList;
