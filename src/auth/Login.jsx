import React, { useState } from 'react';
import BackButton from 'components/frontendComponents/BackButton';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from 'hooks/useAuth';
import Title from 'components/Title';

function Login() {
  Title('Mvoies Quotes | login');
  const { setAuth } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errMessage, setErrMessage] = useState();

  const onSubmit = async (data) => {
    try {
      await axios
        .post('login', {
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          console.log(JSON.stringify(res?.data));
          const checkUser = res?.data.user;
          if (checkUser) {
            localStorage.setItem('token', res.data.token);
            const token = res?.data.token;
            setAuth({ token });
            navigate('/adminPanel/dashboard');
          } else {
            setErrMessage(res.data.status);
            console.log(res.data.status);
          }
        })
        .catch((err) => {
          console.log(err);
          setErrMessage('404');
        });
    } catch (err) {
      console.error(err);
    }
  };
  const emptyValueMessage = `${t('Value is required')}`;
  const passwordIncorrect = `${t('The password is incorrect')}`;
  const userNotExist = `${t('This user does not exist')}`;
  return (
    <div>
      <BackButton />
      <div className='flex justify-center py-24'>
        <main className='container max-w-lg p-16 mx-auto mt-10 bg-gray-300 border border-gray-200 rounded-xl'>
          <h1 className='text-center front-bold-text-xl'>
            {t('Authorization')}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-6'>
              <label
                className='block mb-2 text-xs font-bold text-gray-700 uppercase'
                htmlFor='email'
              >
                {t('email')}
              </label>
              <input
                className='w-full p-2 border border-gray-400'
                type='email'
                name='email'
                id='email'
                {...register('email', { required: emptyValueMessage })}
              />
              {errors.email && (
                <span className='mt-2 text-xs text-red-500'>
                  {errors.email.message}
                </span>
              )}
              {errors.email ? (
                ''
              ) : (
                <span className='mt-2 text-xs text-red-500'>
                  {errMessage === '404' ? userNotExist : ''}
                </span>
              )}
            </div>
            <div className='mb-6'>
              <label
                className='block mb-2 text-xs font-bold text-gray-700 uppercase'
                htmlFor='password'
              >
                {t('password')}
              </label>
              <input
                className='w-full p-2 border border-gray-400'
                type='password'
                name='password'
                id='password'
                {...register('password', { required: emptyValueMessage })}
              />
              {errors.password && (
                <span className='mt-2 text-xs text-red-500'>
                  {errors.password.message}
                </span>
              )}
              {errors.password ? (
                ''
              ) : (
                <span className='mt-2 text-xs text-red-500'>
                  {errMessage === '401' ? passwordIncorrect : ''}
                </span>
              )}
            </div>
            <div className='flex mb-6'>
              <button
                type='submit'
                className='px-4 py-2 text-white bg-gray-400 rounderd hover:bg-gray-500'
              >
                {t('Log In')}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Login;
