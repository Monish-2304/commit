import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
const LoginPage = () => {
    const location = useLocation();
    const isLogin = location.pathname === '/login';
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
    }, [isLogin, reset]);

    const onSubmit = (data) => console.log(data);
    return (
        <div>
            <h2 className="text-center text-3xl mt-8">
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
                                    { 'border-red-500': errors.username }
                                )}
                                placeholder="Username"
                                type="text"
                                {...register('username', {
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
                            className="w-1/2 flex justify-center py-1 bg-[#BACAE8] border-l-4 border-r-4 border-[#E1AFD1] rounded-xl capitalize cursor-pointer"
                            value={!isLogin ? 'Sign up' : 'Login'}
                            type="submit"
                        />
                       {isLogin && <h3>New Here? <Link to="/signup" className=' text-blue-700 font-semibold'>SignUp</Link></h3>}
                       {!isLogin && <h3>Already have an account? <Link to="/login" className=' text-blue-700 font-semibold'>Login</Link></h3>}
                    </form>
                    
                </div>
            </div>
        </div>
    );
};

// LoginPage.propTypes = {
//     isLogin: PropTypes.bool.isRequired,
// };

export default LoginPage;
