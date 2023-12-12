import {useRef} from 'react';
import styles from "./burger-constructor-list.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {ITypesIngredient} from "../../utils/types-ingredient";
import type { Identifier, XYCoord } from 'dnd-core'


interface IBurgerConstructorListProps {
    data: ITypesIngredient,
    deleteItem: ({data}:any) => void
    index: number,
    moveCard: (dragIndex: number, hoverIndex: number, data: ITypesIngredient) => void,
    id: string
}
const BurgerConstructorList = (props:IBurgerConstructorListProps) => {
    const { data, deleteItem, index, moveCard, id } = props

    const ref = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop] = useDrop<
        any,
        void,
        { handlerId: Identifier | null }
    >({
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
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveCard(dragIndex, hoverIndex, data)
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


export default BurgerConstructorList;
