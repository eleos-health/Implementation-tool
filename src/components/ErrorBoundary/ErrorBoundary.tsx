import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  history?: any;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  prevError = false;

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      window.history.go();
    }
    return children;
  }
}

export default ErrorBoundary;
