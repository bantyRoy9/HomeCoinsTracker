import React from 'react';
import { Text, View } from 'react-native';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static componentDidCatch(error) {
    console.log('errrrprsdfafdsf');
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error here or perform any other actions
    console.error('Error caught by ErrorBoundary:', error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <View>
          <Text>Something went wrong!</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
