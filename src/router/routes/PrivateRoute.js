import { Navigate } from 'react-router-dom';

// تابعی که چک می‌کند آیا توکن موجود است یا نه
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute