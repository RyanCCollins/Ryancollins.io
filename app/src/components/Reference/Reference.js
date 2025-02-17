import React, { PropTypes } from 'react';
import { Column, Row } from 'react-foundation';
import './Reference.scss';

const Reference = ({
  reference
}) => (
  <Row className="container reference-item__container">
    <Column isColumn large={10} medium={12} small={12} centerOnSmall>
      <div className="reference-item">
        <div className="profile__image">
          <img
            alt={`A person named ${reference.person.name}`}
            src={reference.person.image}
            className="img-circle img-thumbnail profile__image"
          />
        </div>
        <div className="reference-item__wrapper">
          <div className="reference-text__wrapper">
            <p className="reference__text">“{reference.text}”</p>
          </div>
          <div className="reference-signature">
            <p className="reference__source-name">
              {reference.person.name}
              <span className="reference__source-title"> - {reference.person.title}</span>
            </p>
          </div>
        </div>
      </div>
    </Column>
  </Row>
);

Reference.propTypes = {
  reference: PropTypes.object.isRequired
};

export default Reference;
