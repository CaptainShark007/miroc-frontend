import { STORAGE_KEYS } from '@/shared/constants/redux';
import { AuthState } from '@features/auth/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const loadStateFromStorage = (): AuthState => {
  try {
    const authJson = localStorage.getItem(STORAGE_KEYS.AUTH);

    if (authJson) {
      const auth = JSON.parse(authJson);
      return {
        token: auth.token,
        username: auth.username,
        idUser: auth.idUser,
        rol: auth.rol,
      };
    }
  } catch (error) {
    console.error(
      'Error al cargar estado de autenticación desde localStorage:',
      error
    );
  }

  return {
    token: null,
    idUser: null,
    username: null,
    rol: null,
  };
};

export const initialState: AuthState = loadStateFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<AuthState>) {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.idUser = action.payload.idUser;
      state.rol = action.payload.rol;
      if (action.payload.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(action.payload));
      }
    },
    clearToken(state) {
      state.token = null;
      state.idUser = null;
      state.username = null;
      state.rol = null;
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
