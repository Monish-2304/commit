import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import Cookies from 'js-cookie';
import { URLS } from '../../constants/common';
const secretKey = process.env.REACT_APP_SECRET_KEY;

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    isLoggingOut: false,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${URLS.BASE_API_URL}/auth/login`,
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
                `${URLS.BASE_API_URL}/auth/register`,
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
    async (_, { getState, rejectWithValue }) => {
        const state = getState();
        if (state.auth.isLoggingOut) {
            return rejectWithValue('Logout in progress');
        }
        try {
            const token = Cookies.get('jwtToken');
            const response = await axios.get(
                `${URLS.BASE_API_URL}/auth/validate`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
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
export const logoutUser = createAsyncThunk(
    'auth/logOut',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${URLS.BASE_AUTH_URL}/logout`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error(
                'Error while logging out',
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
            const encryptedUser = secureLocalStorage.getItem('user', secretKey);
            if (encryptedUser) {
                try {
                    const user = JSON.parse(encryptedUser);
                    state.token = token;
                    state.user = user;
                } catch (error) {
                    console.error('Failed to parse user from storage:', error);
                }
            }
        },
        setLoggingOut: (state, action) => {
            state.isLoggingOut = action.payload;
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
                    JSON.stringify(action.payload.user),
                    secretKey
                );
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Registration failed';
            })
            .addCase(validateToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(validateToken.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const encryptedUser = secureLocalStorage.getItem(
                    'user',
                    secretKey
                );
                if (!encryptedUser) {
                    secureLocalStorage.setItem(
                        'user',
                        JSON.stringify(action.payload.user),
                        secretKey
                    );
                }
                state.user = action.payload.user;
            })
            .addCase(validateToken.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.error = action.payload?.message || 'Validation failed';
                secureLocalStorage.removeItem('token', secretKey);
                secureLocalStorage.removeItem('user', secretKey);
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                console.log('Logout successful, clearing state');
                state.loading = false;
                state.user = null;
                state.token = null;
                state.error = null;
                state.isLoggingOut = false;
                secureLocalStorage.removeItem('token', secretKey);
                secureLocalStorage.removeItem('user', secretKey);
            })
            .addCase(logoutUser.rejected, (state) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to log out';
            });
    },
});

export const { logout, loadUserFromStorage, setLoggingOut } = authSlice.actions;

export default authSlice.reducer;
