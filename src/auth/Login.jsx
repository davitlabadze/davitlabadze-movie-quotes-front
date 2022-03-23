import React from 'react';
import BackButton from '../components/forFrontend/BackButton';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post('login', {
        email: data.email,
        password: data.password,
      })

      .then((res) => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <BackButton />
      <div className='flex justify-center py-24'>
        <main className='container max-w-lg p-16 mx-auto mt-10 bg-gray-300 border border-gray-200 rounded-xl'>
          <h1 className='text-center front-bold-text-xl'>Log In</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-6'>
              <label
                className='block mb-2 text-xs font-bold text-gray-700 uppercase'
                htmlFor='email'
              >
                email
              </label>
              <input
                className='w-full p-2 border border-gray-400'
                type='email'
                name='email'
                id='email'
                {...register('email', { required: 'Value is field' })}
              />
              {errors.email && (
                <span className='mt-2 text-xs text-red-500'>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className='mb-6'>
              <label
                className='block mb-2 text-xs font-bold text-gray-700 uppercase'
                htmlFor='password'
              >
                password
              </label>
              <input
                className='w-full p-2 border border-gray-400'
                type='password'
                name='password'
                id='password'
                {...register('password', { required: 'Value is field' })}
              />
              {errors.password && (
                <span className='mt-2 text-xs text-red-500'>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className='mb-6'>
              <button
                type='submit'
                className='px-4 py-2 text-white bg-gray-400 rounderd hover:bg-gray-500'
              >
                Log In
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Login;
