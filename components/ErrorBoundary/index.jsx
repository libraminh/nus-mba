import NUSIcon from '../../public/images/nus-icon.jpg';
import React from 'react';
import Image from 'next/image';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // componentDidCatch(error, errorInfo) {
  //   // You can also log the error to an error reporting service
  //   logErrorToMyService(error, errorInfo);
  // }

  render() {
    if (this.state.hasError) {
      // setTimeout(() => {
      //   window.location.reload();
      // }, 5000);

      return (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center flex-col space-y-3'>
          <Image src={NUSIcon} alt='logo' width={196} height={196} />
          <h1 className='text-2xl font-bold'>
            Oops! Your session has expired.
          </h1>
          <div className='text-lg'>Please try to refresh the page.</div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
