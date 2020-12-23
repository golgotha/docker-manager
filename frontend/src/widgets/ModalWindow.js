import React, {Component} from 'react';
import PT from 'prop-types';
import ReactDOM from 'react-dom';

export default class ModalWindow extends Component {
  static propTypes = {
    children: PT.oneOfType([PT.element, PT.array])
  }
  render() {
    return ReactDOM.createPortal(
      <React.Fragment>{this.props.children}</React.Fragment>,
      document.querySelector('.container')
    );
  }
}

