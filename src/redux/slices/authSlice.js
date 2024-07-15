import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { URLS } from '../../constants/common';
const secretKey = process.env.REACT_APP_SECRET_KEY;

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
                `${URLS.BASE_URL}/auth/login`,
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
                `${URLS.BASE_URL}/auth/register`,
                credentials,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
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
            const encryptedUser = secureLocalStorage.getItem('user', secretKey);
            if (token && encryptedUser) {
                try {
                    const user = JSON.parse(encryptedUser);
                    state.token = token;
                    state.user = user;
                } catch (error) {
                    console.error('Failed to parse user from storage:', error);
                }
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
                    JSON.stringify(action.payload.user),
                    secretKey
                );
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log('error occured', action);
                state.loading = false;
                state.error = action.payload.message;
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
                    JSON.stringify(action.payload.user),
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
