import { useDispatch, useSelector } from "react-redux";
import { login, register, logout, getProfile } from "../store/authSlice";
import { useCallback } from "react";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { loading, error, userProfile } = useSelector((state) => state.auth);

  // Usamos useCallback para memorizar estas funciones
  const loginUser = useCallback(
    async (email, password) => {
      try {
        const data = await dispatch(login({ email, password })).unwrap();
        return data; // Si necesitas la data después del login
      } catch (error) {
        throw new Error(error);
      }
    },
    [dispatch] // Dependencia de dispatch, no cambia entre renderizados
  );

  const registerUser = useCallback(
    async (email, password) => {
      try {
        const data = await dispatch(register({ email, password })).unwrap();
        return data; // Si necesitas la data después del registro
      } catch (error) {
        throw new Error(error);
      }
    },
    [dispatch] // Dependencia de dispatch
  );

  const signOut = useCallback(
    async () => {
      try {
        await dispatch(logout()).unwrap();
      } catch (error) {
        throw new Error(error);
      }
    },
    [dispatch] // Dependencia de dispatch
  );

  const getUserProfile = useCallback(
    async () => {
      try {
        const data = await dispatch(getProfile()).unwrap();
        return data; // Devuelves el perfil si lo necesitas
      } catch (error) {
        throw new Error(error);
      }
    },
    [dispatch] // Dependencia de dispatch
  );

  return {
    loginUser,
    registerUser,
    signOut,
    getUserProfile,
    loading,
    error,
    userProfile,
  };
};
