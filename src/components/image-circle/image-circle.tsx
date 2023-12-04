import React from 'react';
import styles from "./image-circle.module.css";

interface IImageCircleProps {
    image: string,
    ingredientLength: number,
    index: number
}

const ImageCircle = ({image, ingredientLength, index}:IImageCircleProps) => {
    return (
        <>
            {index < 6 && (
                <section className={styles.containerImage} style={{zIndex: ingredientLength - index, left: index * -20, backgroundImage: `url(${image})`}}>
                    {index === 5 && (
                        <section className={styles.howHiddenImageCircle}>
                            {ingredientLength - index !== 0 && (
                                <span className={`text text_type_main-default`}>
                                            +{(ingredientLength - index)}
                                </span>
                            )}
                        </section>
                    )}
                </section>
            )}
        </>
    );
};

export default ImageCircle;
