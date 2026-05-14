import { Component } from "react";
import styles from "./ErrorBoundary.module.css";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <h2 className={styles.title}>Something went wrong</h2>
          <p className={styles.message}>{this.state.error?.message}</p>
          <button className={styles.button} onClick={this.handleReset}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export { ErrorBoundary };
