import React, { useEffect, useState } from 'react';
import BackButton from '../components/forFrontend/BackButton';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Login() {
  const [login, setLogin] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .post('login')
      .then((res) => {
        setLogin(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

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
                // defaultValue='test@test.com'
                {...register('email', {
                  required: true,
                  validate: {
                    positive: (v) =>
                      parseInt(v) > 0 || 'should be greater than 0',
                    lessThanTen: (v) =>
                      parseInt(v) < 10 || 'should be lower than 10',
                    // you can do asynchronous validation as well
                    checkUrl: async () =>
                      (await fetch('/login')) || 'error message', // JS only: <p>error message</p> TS only support string
                    messages: (v) => !v && 'email',
                  },
                })}
              />
              {/* <ErrorMessage errors={errors} name='singleErrorInput' /> */}
              {/* {errors.exampleRequired && (
                <span className='mt-2 text-xs text-red-500'>shecdoma</span>
              )} */}
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
                // defaultValue=''
                {...register('password', { required: true })}
              />
              {errors.message && errors.message.message}
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
