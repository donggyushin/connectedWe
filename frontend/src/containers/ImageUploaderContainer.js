import React, { Component } from "react";
import { connect } from "react-redux";
import * as feedActions from "store/modules/feed";
import ImageUploader from "components/ImageUploader/ImageUploader";
import uuidv1 from "uuid/v1";

const formData = new FormData();

class ImageUploaderContainer extends Component {
  state = {
    location: "",
    caption: "",
    hashtags: ""
  };

  _handleSubmit = () => {
    const { location, caption, hashtags } = this.state;
    const tagsArray = hashtags.split(",");
    const { uploadPhoto, image_upload_down } = this.props;
    formData.append("location", location);
    formData.append("caption", caption);
    formData.append("hashtags", JSON.stringify(tagsArray));

    uploadPhoto(formData);
    image_upload_down();
  };

  _handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "location") {
      this.setState({
        ...this.state,
        location: value
      });
    } else if (name === "caption") {
      this.setState({
        ...this.state,
        caption: value
      });
    } else if (name === "hashtags") {
      this.setState({
        ...this.state,
        hashtags: value
      });
    } else if (name === "file") {
      formData.append("file", e.target.files[0]);
    }
  };

  _clickXButton = () => {
    const { image_upload_down } = this.props;
    image_upload_down();
  };
  render() {
    return (
      <ImageUploader
        clickXButton={this._clickXButton}
        handleInputChange={this._handleInputChange}
        {...this.state}
        handleSubmit={this._handleSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  image_upload_down: () => dispatch(feedActions.image_upload_down()),
  uploadPhoto: data => dispatch(feedActions.uploadPhoto(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageUploaderContainer);
