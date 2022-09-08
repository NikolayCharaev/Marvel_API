import { Component } from 'react';
import cat from './errorImage.gif';
import './errorBoundary.scss';

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, errorInfo) {
    console.log('ERROR - ', error, 'ERROR INFO - ', errorInfo);
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <>
          <img className="error" src={cat} alt="error" />
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
