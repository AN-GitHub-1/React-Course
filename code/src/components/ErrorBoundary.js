import { Component } from "react";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  // error is automatically passed in by React
  componentDidCatch(error) {
    this.setState({ hasError: true });
  }

  // you can wrap this component around anything that needs error handling
  render() {
    if (this.state.hasError) {
      return <p>Something went wrong</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
