import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
    return (
        <div>
            {props.ingredient}
        </div>
    );
};

Card.propTypes = {

};

export default Card;