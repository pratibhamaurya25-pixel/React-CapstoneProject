import React from "react";
import { Link } from "react-router-dom";

export function EmptyState({
  icon,
  title = "No Products Found",
  message = "Please try another search.",
}) {
  return (
    <div>
      {icon && <span>{icon}</span>}
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export function ErrorFallback() {
  function handleRefresh() {
    window.location.reload();
  }

  return (
    <div>
      <h1>Oops!</h1>
      <h2>Something went wrong.</h2>
      <p>The application encountered an unexpected error.</p>
      <button onClick={handleRefresh}>Try Again</button>
      <br />
      <br />
      <Link to="/">Go Home</Link>
    </div>
  );
}

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {

    return {
      hasError: true,
    };

  }

  componentDidCatch(error, errorInfo) {

    console.log("Error :", error);

    console.log("Error Info :", errorInfo);

  }

  render() {

    if (this.state.hasError) {

      return <ErrorFallback />;

    }

    return this.props.children;

  }

}

export default ErrorBoundary;