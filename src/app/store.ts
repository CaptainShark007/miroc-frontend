import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import authSlice, { initialState } from '@/features/auth/slices/auth.slice';
import { getLocalStorage } from '@utils/localStorage';
import { AuthState } from '@features/auth/types';

const preLoadedAuthState = getLocalStorage<AuthState>('auth') ?? initialState;

export const store = configureStore({
  reducer: { auth: authSlice },
  preloadedState: {
    auth: preLoadedAuthState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
