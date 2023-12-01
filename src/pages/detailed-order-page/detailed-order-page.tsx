import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getDetailedOrder} from "../../services/detailed-order/actions";
import DetailedOrder from "../../components/detailed-order/detailed-order";

const DetailedOrderPage = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const detailedOrder = useAppSelector(state => state.detailedOrder.order)

    useEffect(() => {
        if (id !== undefined) {
            dispatch(getDetailedOrder(id))
        }
    }, [dispatch]);

    useEffect(() => {
        console.log(detailedOrder)
    }, [detailedOrder]);

    return (
        <div className={`pt-30`}>
            <DetailedOrder numberOrder={detailedOrder[0]?.number}
                           statusOrder={detailedOrder[0]?.status}
                           name={detailedOrder[0]?.name}
                           ingredients={detailedOrder[0]?.ingredients}
                           date={detailedOrder[0]?.createdAt}
            />
        </div>
    );
};

export default DetailedOrderPage;
