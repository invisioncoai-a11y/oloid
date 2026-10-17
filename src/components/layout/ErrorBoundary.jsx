import React from 'react';
import { Button } from '../ui/Button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#16263B' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#64748B', maxWidth: '500px', marginBottom: '2rem' }}>
            An unexpected error occurred while rendering this view. You can return to the homepage or reload the application.
          </p>
          <Button onClick={this.handleReset} variant="primary">
            Return to Homepage
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

