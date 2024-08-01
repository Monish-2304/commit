import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import Cookies from 'js-cookie';

const secretKey = process.env.REACT_APP_SECRET_KEY;
const baseUrl = 'http://localhost:5000/api';
const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${baseUrl}/auth/login`,
                credentials,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${baseUrl}/auth/register`,
                credentials,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const validateToken = createAsyncThunk(
    'auth/validateToken',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { token } = getState().auth;
            const response = await axios.get(`${URLS.BASE_URL}/auth/validate`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error(
                'Validation error:',
                error.response?.data || error.message
            );
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            secureLocalStorage.removeItem('token', secretKey);
            secureLocalStorage.removeItem('user', secretKey);
        },
        loadUserFromStorage: (state) => {
            const token = secureLocalStorage.getItem('token', secretKey);
            const user = secureLocalStorage.getItem('user', secretKey);
            if (token) {
                state.token = token;
                state.user = user;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                secureLocalStorage.setItem(
                    'token',
                    action.payload.token,
                    secretKey
                );
                secureLocalStorage.setItem(
                    'user',
                    action.payload.user,
                    secretKey
                );
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log('error occured', action);
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(registerUser.pending, (state) => {
                console.log('in pending');
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                secureLocalStorage.setItem(
                    'token',
                    action.payload.token,
                    secretKey
                );
                secureLocalStorage.setItem(
                    'user',
                    action.payload.user,
                    secretKey
                );
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Registration failed';
            });
    },
});

export const { logout, loadUserFromStorage } = authSlice.actions;

export default authSlice.reducer;
