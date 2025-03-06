import Spinner from 'react-bootstrap/Spinner';
/**
 * 
 * @returns placeholder tag while the client side pages are rendered
 */
const LoadingIndicator = () => {
  return (
  <div className="loading-section">
      <Spinner animation="border" role="status" variant='primary' className='loader'/>
  </div>
  );
};

export default LoadingIndicator;