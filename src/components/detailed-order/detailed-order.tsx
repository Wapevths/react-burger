import {FC} from "react";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './detailed-order.module.css';
import { useAppSelector } from "../../hooks/redux-hooks";
import DetailedOrderElement from "../detailed-order-element/detailed-order-element";
import { ITypesIngredient } from "../../utils/types-ingredient";

interface IDetailedOrderProps {
    numberPositionCenter?: boolean;
    numberOrder: number;
    statusOrder: string;
    name: string;
    date: string;
    ingredients: string[];
}

interface IConsolidatedIngredients {
    image: string[];
    count: number[];
}

const DetailedOrder: FC<IDetailedOrderProps> = ({
                                                          numberPositionCenter = true,
                                                          numberOrder,
                                                          statusOrder,
                                                          name,
                                                          date,
                                                          ingredients,
                                                      }: IDetailedOrderProps) => {
    const ingredientStore: ITypesIngredient[] = useAppSelector(state => state.ingredients.ingredients);
    const ingredientsImage: string[] = [];
    const ingredientsName: string[] = [];
    let allIngredientPrice: number = 0;
    const priceIngredient: number[] = [];

    if (ingredients !== undefined) {
        ingredients.forEach((ingredientId) => {
            const foundIngredient = ingredientStore.find((ingredient) => ingredient._id === ingredientId);
            if (foundIngredient) {
                allIngredientPrice += foundIngredient.price;
                ingredientsImage.push(foundIngredient.image_mobile);
                priceIngredient.push(foundIngredient.price);
                ingredientsName.push(foundIngredient.name);
            }
        });
    }

    function consolidateIngredientsAndCountDuplicates(order: string[]): IConsolidatedIngredients {
        const ingredientsCount: Record<string, number> = {};

        order.forEach((ingredient) => {
            ingredientsCount[ingredient] = (ingredientsCount[ingredient] || 0) + 1;
        });

        const image: string[] = [];
        const count: number[] = [];

        for (const ingredient in ingredientsCount) {
            image.push(ingredient);
            count.push(ingredientsCount[ingredient]);
        }

        return { image, count };
    }

    const result: IConsolidatedIngredients = consolidateIngredientsAndCountDuplicates(ingredientsImage);






    return (
        <div className={styles.containerDetailedOrder}>
            <span className={`${styles.orderNumber} text text_type_digits-default pb-10`} style={{justifyContent: numberPositionCenter ? "center" : "start"}}>
                #{numberOrder}
            </span>

            <h2 className={`pb-3 text text_type_main-medium`}>
                {name}
            </h2>

            <span className={`pb-15 text text_type_main-default ${styles.statusOrder}`}>
                {statusOrder === "done" ? "Выполнен" : statusOrder === "pending" ? "В работе" : "Создан"}
            </span>

            <h3 className={`pb-6 text text_type_main-medium`}>
                Состав:
            </h3>

            <section className={`custom-scroll pr-6 ${styles.containerBodyElement}`}>
                {result.image.map((item, index) => (
                        <DetailedOrderElement image={item}
                                              price={priceIngredient[index]}
                                              name={ingredientsName[index]}
                                              key={index}
                                              count={result.count[index]}
                        />
                ))}
            </section>

            <section className={`pt-10 ${styles.containerDatePrice}`}>
                <FormattedDate className={`text text_type_main-default text_color_inactive`}
                               date={new Date(date)}
                />
                <div className={styles.containerPrice}>
                    <span className={`text text_type_digits-default`}>
                        {allIngredientPrice}
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
            </section>
        </div>
    );
};

export default DetailedOrder;
