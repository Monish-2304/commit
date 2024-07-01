import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../redux/slices/authSlice';
const LoginPage = () => {
    const location = useLocation();
    const isLogin = location.pathname === '/login';
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        criteriaMode: 'all',
    });

    useEffect(() => {
        reset();
        if (user) {
            navigate('/home');
        }
    }, [isLogin, reset, user]);

    const onSubmit = (data) => {
        if (isLogin) {
            dispatch(loginUser(data));
        } else {
            dispatch(registerUser(data));
        }
    };
    return (
        <div>
            {loading && (
                <p className="text-4xl text-black text-center">Loading...</p>
            )}
            {!loading && (
                <div>
                    <h2 className="text-center text-3xl text-[#7C6D76] mt-8">
                        {!isLogin ? 'Signup' : 'Login'}
                    </h2>
                    <div className="flex justify-between">
                        <div className=" w-1/2"></div>
                        <div className="flex justify-center pt-24  w-1/2">
                            <form
                                className="flex items-center flex-col gap-y-4"
                                method="post"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                {!isLogin && (
                                    <input
                                        className={classNames(
                                            'border p-3 rounded-lg w-64 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition duration-300 ease-in-out shadow-lg bg-gray-100',
                                            {
                                                'border-red-500':
                                                    errors.username,
                                            }
                                        )}
                                        placeholder="Username"
                                        type="text"
                                        {...register('username', {
                                            required: {
                                                value: true,
                                                message:
                                                    'This field is required',
                                            },
                                            minLength: {
                                                value: 2,
                                                message:
                                                    'This input must be minimum 2 characters',
                                            },
                                            maxLength: {
                                                value: 30,
                                                message:
                                                    'This input must not exceed 30 characters',
                                            },
                                        })}
                                    />
                                )}

                                <ErrorMessage
                                    errors={errors}
                                    name="username"
                                    render={({ messages }) => {
                                        return messages
                                            ? Object.entries(messages).map(
                                                  ([type, message]) => (
                                                      <p
                                                          key={type}
                                                          className="text-red-500 text-sm"
                                                      >
                                                          {message}
                                                      </p>
                                                  )
                                              )
                                            : null;
                                    }}
                                />

                                <input
                                    className={classNames(
                                        'border p-3 rounded-lg w-64 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition duration-300 ease-in-out shadow-lg bg-gray-100',
                                        { 'border-red-500': errors.email }
                                    )}
                                    placeholder="Email"
                                    type="email"
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: 'This field is required',
                                        },
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="email"
                                    render={({ messages }) => {
                                        return messages
                                            ? Object.entries(messages).map(
                                                  ([type, message]) => (
                                                      <p
                                                          key={type}
                                                          className="text-red-500 text-sm"
                                                      >
                                                          {message}
                                                      </p>
                                                  )
                                              )
                                            : null;
                                    }}
                                />
                                <input
                                    className={classNames(
                                        'border p-3 rounded-lg w-64 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition duration-300 ease-in-out shadow-lg bg-gray-100',
                                        { 'border-red-500': errors.password }
                                    )}
                                    placeholder="Password"
                                    type="password"
                                    {...register('password', {
                                        required: {
                                            value: true,
                                            message: 'This field is required',
                                        },
                                        minLength: {
                                            value: 2,
                                            message:
                                                'This input must be minimum 2 characters',
                                        },
                                        maxLength: {
                                            value: 30,
                                            message:
                                                'This input must not exceed 30 characters',
                                        },
                                    })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="password"
                                    render={({ messages }) => {
                                        return messages
                                            ? Object.entries(messages).map(
                                                  ([type, message]) => (
                                                      <p
                                                          key={type}
                                                          className="text-red-500 text-sm"
                                                      >
                                                          {message}
                                                      </p>
                                                  )
                                              )
                                            : null;
                                    }}
                                />
                                <input
                                    className="w-1/2 flex justify-center py-1 bg-[#BACAE8] border-l-4 border-r-4 border-[#E1AFD1] rounded-xl text-[#7C6D76] capitalize cursor-pointer"
                                    value={!isLogin ? 'Sign up' : 'Login'}
                                    type="submit"
                                />
                                {isLogin && (
                                    <h3 className="text-[#7C6D76]">
                                        New Here?{' '}
                                        <Link
                                            to="/signup"
                                            className=" text-blue-700 font-semibold"
                                        >
                                            SignUp
                                        </Link>
                                    </h3>
                                )}
                                {!isLogin && (
                                    <h3 className="text-[#7C6D76]">
                                        Already have an account?{' '}
                                        <Link
                                            to="/login"
                                            className=" text-blue-700 font-semibold"
                                        >
                                            Login
                                        </Link>
                                    </h3>
                                )}
                                {error && (
                                    <p className=" text-center">
                                        Oops! Some Error Occured, Try Again.
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// LoginPage.propTypes = {
//     isLogin: PropTypes.bool.isRequired,
// };

export default LoginPage;
