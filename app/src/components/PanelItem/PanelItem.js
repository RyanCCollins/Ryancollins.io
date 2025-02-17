import React, { PropTypes } from 'react';
import { Column } from 'react-foundation';
import './PanelItem.scss';

const createMarkup = (item) => ({
  __html: item.description
});

const PanelItem = ({
  item,
  icon
}) => (
  <Column
    small={12}
    medium={6}
    large={4}
    className={
      `panel-item
        ${item.id > 2 ? 'bottom' : 'top'}
        ${item.id !== 2 && item.id !== 5 ? 'bordered' : 'not-bordered'}`
    }
  >
    <div className="inner-content">
      {icon}
      <h4 className="centered raleway uppercase ribbon-text">
        <span>{item.title}</span>
      </h4>
      <p className="text-small text-light justified">
        <span dangerouslySetInnerHTML={createMarkup(item)} />
      </p>
    </div>
  </Column>
);

PanelItem.propTypes = {
  icon: PropTypes.node,
  item: PropTypes.object.isRequired
};

export default PanelItem;
