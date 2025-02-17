import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import './SinglePostView.scss';
import {
  SinglePost,
  Divider,
  LoadingIndicator,
  Author,
  CommentThread
} from '../../../components';

class SinglePostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null
    };
    this.setPost = this.setPost.bind(this);
  }
  componentDidMount() {
    const {
      posts,
      params
    } = this.props;
    const postId = params.postId;
    const postItems = posts.items;
    const selectedPost = postItems.filter((post) => post._id == postId);
    this.setPost(selectedPost[0]);
  }
  setPost(post) {
    this.setState({ post });
  }
  render() {
    const {
      location
    } = this.props;
    const {
      post
    } = this.state;
    return (
      <div className="single-post-view__wrapper">
        {post === null ?
          <LoadingIndicator />
        :
          <div>
            <h1 className="section-header">{post.title}</h1>
            <Divider />
            <SinglePost
              {...this.props}
              post={post}
            />
            <div className="author-wrapper">
              <Author
                author={post.author}
              />
            </div>
            <section className="comments">
              <CommentThread
                location={location}
                post={post}
              />
            </section>
          </div>
        }
        <div className="huge-space"></div>
      </div>
    );
  }
}

SinglePostView.propTypes = {
  params: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired
};

// mapStateToProps :: {State} -> {Props} 
const mapStateToProps = (state) => ({
  posts: state.posts
});

export default connect(mapStateToProps)(SinglePostView);
