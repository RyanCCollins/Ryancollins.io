import React, { PropTypes } from 'react';
import './CircleChart.scss';
import { StaggeredMotion, spring } from 'react-motion';
import elementInViewport from '../../../lib/isVisible';

class CircleChart extends React.Component {
  constructor(props) {
    super(props);
    this.setItemHeight = this.setItemHeight.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      height: 0,
      needsAnimation: true
    };
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  setItemHeight() {
    const height = 108 * (this.props.item.percent / 100);
    this.setState({
      height
    });
  }
  handleScroll() {
    const elem = this.refs.item;
    if (elementInViewport(elem)) {
      if (this.state.needsAnimation) {
        this.setItemHeight();
        this.setState({ needsAnimation: false });
      }
    }
  }
  render() {
    const {
      item
    } = this.props;
    return (
      <div className="item last" id={`language-item-${item.id}`} ref="item">
        <StaggeredMotion
          defaultStyles={[{ height: 0 }]}
          styles={prevInterpolatedStyles =>
            prevInterpolatedStyles.map((_, i) =>
              i === 0 ?
                { height: spring(this.state.height) }
              :
                { height: spring(prevInterpolatedStyles[i - 1].height) }
          )}
        >
          {interpolatingStyles =>
            <div className="circle">
              {interpolatingStyles.map((style, i) =>
                <span
                  className="item-progress"
                  key={i}
                  style={style}
                  data-percent={item.percent}
                ></span>
            )}
            </div>
          }
        </StaggeredMotion>
        <span className="percent">{item.percent}%</span>
        <h4 className="text-center uppercase text-white">{item.name}</h4>
      </div>
    );
  }
}

CircleChart.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CircleChart;
