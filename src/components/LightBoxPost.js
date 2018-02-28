import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Image from 'react-bootstrap/lib/Image';

class LightBoxPost extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      showLightBox: false
    };
  };

  handleClose() {
   this.setState({ showLightBox: false });
  }

  handleShow() {
    this.setState({ showLightBox: true });
  }

  render() {
    if (this.props.datas === null) {
      return "";
    } else {
      let ArrImages=(typeof this.props.datas.images !== "undefined" ? this.props.datas.images : []);
      return (
        <Modal
          {...this.props}
          bsSize="large"
          aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="subheading">
              <h1>{this.props.datas.subheading}</h1>
            </div>
            <div className="listimages">
              {
                ArrImages.map(function(V, K) {
                  return <div><Image key={'img' + V.id + K} src={V.url} alt={V.type}  responsive rounded /></div>
                })
              }
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      );
    }
  }
}

export default LightBoxPost;
