import React, { PropTypes } from 'react';
import Spinner from 'react-spinkit';
import './LoadingIndicator.scss';

const isHidingStyle = {
  display: 'none'
};

const isNotHidingStyle = {
  display: ''
};

const LoadingIndicator = ({
  isLoading,
  children
}) => (
  <div>
    {isLoading ?
      <div
        className="loading-indicator-container"
        style={isLoading ? isNotHidingStyle : isHidingStyle}
      >
        <div id="overlay"></div>
        <div className="loading-indicator">
          <Spinner
            spinnerName="cube-grid"
          />
        </div>
      </div>
    :
      <noscript />
    }
    <div style={isLoading ? { display: 'none' } : {}}>
      {children}
    </div>
  </div>
);

LoadingIndicator.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool.isRequired
};

export default LoadingIndicator;
