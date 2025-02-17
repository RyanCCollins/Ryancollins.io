import React, { PropTypes } from 'react';
import { Row, Column } from 'react-foundation';
import './Portfolio.scss';
import PortfolioOverlay from './PortfolioOverlay';
import elementInViewport from '../../../lib/isVisible';
import PerfectImg from '../PerfectImg/PerfectImg';

const alternatingAnimation = () =>
  'fadeSlideInUp';

const Styles = {
  fadedOut: {
    opacity: 0
  },
  fadedIn: {
    opacity: 1
  }
};

class PortfolioItem extends React.Component {
  constructor(props) {
    super(props);
    const { i } = this.props;
    this.state = {
      needsAnimation: true,
      isAnimating: false,
      isScrolledIntoView: i === 0
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleFadeInAfterTimeout = this.handleFadeInAfterTimeout.bind(this);
  }
  componentDidMount() {
    if (window.addEventListener) {
      window.addEventListener('scroll', this.handleScroll, true);
    } else {
      window.attachEvent('onscroll', this.handleScroll, true);
    }
    /* Call the handle scroll right away if it's the first project*/
    const { isScrolledIntoView } = this.state;
    if (isScrolledIntoView) {
      this.handleScroll();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll() {
    const { i } = this.props;
    const { id } = this.props.project;
    const selector = `portfolio-item-${id}`;
    const element = document.getElementById(selector);
    if (elementInViewport(element)) {
      if (this.state.needsAnimation === true) {
        console.log(`Element ${element} is in viewport`);
        this.setState({
          needsAnimation: false,
          isScrolledIntoView: true,
          isAnimating: true,
          animationName: alternatingAnimation(i)
        });
      }
    }
  }
  handleFadeInAfterTimeout() {
    setTimeout(() => {
      this.setState({
        needsAnimation: false,
        isScrolledIntoView: true
      });
    }, 5000);
  }
  render() {
    const {
      project,
      onLoad,
      i
    } = this.props;
    return (
      <Row className="display portfolio-item" key={i}>
        <Column
          small={12}
          medium={10}
          large={8}
          centerOnSmall
          id={`portfolio-item-${project.id}`}
        >
          <div
            style={this.state.isScrolledIntoView ? Styles.fadedIn : Styles.fadedOut}
            className={this.state.isAnimating ?
              `image-wrapper overlay-fade-in ${this.state.animationName}`
            :
              'image-wrapper overlay-fade-in'
            }
          >
            <PerfectImg
              onLoad={onLoad}
              src={project.featureImage}
            />
            <PortfolioOverlay
              project={project}
            />
          </div>
        </Column>
      </Row>
    );
  }
}

PortfolioItem.propTypes = {
  project: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
  i: PropTypes.number.isRequired
};

export default PortfolioItem;
