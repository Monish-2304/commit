import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
const LoginPage = ({ isLogin }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        criteriaMode: 'all',
    });
    const onSubmit = (data) => console.log(data);
    return (
        <div>
            <h2 className="text-center text-3xl mt-8">
                {isLogin ? 'Signup' : 'Login'}
            </h2>
            <div className="flex justify-between">
                <div className=" w-1/2"></div>
                <div className="flex justify-center pt-24  w-1/2">
                    <form
                        className="flex items-center flex-col gap-y-4"
                        method="post"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {isLogin && (
                            <input
                                className=" border-solid border-[1px] p-2 border-black rounded-md w-64"
                                placeholder="Username"
                                type="text"
                                {...register('multipleErrorInput', {
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
                            name="multipleErrorInput"
                            render={({ messages }) => {
                                console.log('messages', messages);
                                return messages
                                    ? Object.entries(messages).map(
                                          ([type, message]) => (
                                              <p key={type}>{message}</p>
                                          )
                                      )
                                    : null;
                            }}
                        />

                        <input
                            className=" border-solid border-[1px] p-2 border-black rounded-md w-64"
                            placeholder="Email"
                            type="email"
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'This field is required',
                                },
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ messages }) => {
                                console.log('messages', messages);
                                return messages
                                    ? Object.entries(messages).map(
                                          ([type, message]) => (
                                              <p key={type}>{message}</p>
                                          )
                                      )
                                    : null;
                            }}
                        />
                        <input
                            className=" border-solid border-[1px] p-2 border-black rounded-md w-64"
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
                                console.log('messages', messages);
                                return messages
                                    ? Object.entries(messages).map(
                                          ([type, message]) => (
                                              <p key={type}>{message}</p>
                                          )
                                      )
                                    : null;
                            }}
                        />
                        <input
                            className="w-1/2 flex justify-center py-1 bg-[#BACAE8] border-l-4 border-r-4 border-[#E1AFD1] rounded-xl capitalize"
                            value={isLogin ? 'Sign up' : 'Login'}
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

LoginPage.propTypes = {
    isLogin: PropTypes.bool.isRequired,
};
export default LoginPage;
