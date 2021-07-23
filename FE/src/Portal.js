import ReactDOM from 'react-dom';

const MyPortal = ({ children }) => {
  const el = document.getElementById('portal');
  return ReactDOM.createPortal(children, el);
};

export default MyPortal;
