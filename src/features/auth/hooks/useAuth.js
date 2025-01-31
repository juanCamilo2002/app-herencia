import { useDispatch } from 'react-redux';
import { loginSuccess, logout} from '../store/authSlice';
import { authService } from '../services/authService';

export const useAuth = () => {
  const dispatch = useDispatch();

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      localStorage.setItem('accessToken', data.accessToken);
      dispatch(loginSuccess(data));  
      return data;  
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al hacer login');
    }
  };

  const register = async (email, password) => {
    try {
      const data = await authService.register(email, password);
      dispatch(loginSuccess(data));  
      return data;  
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al registrar');
    }
  };

  const signOut = async () => {
    await authService.logout();
    dispatch(logout());  
    localStorage.removeItem('accessToken');
  };

  return { login, register, signOut };
};
