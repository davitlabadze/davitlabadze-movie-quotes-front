import React from 'react';
import BackButton from '../components/forFrontend/BackButton';

function Login() {
  return (
    <div>
      <BackButton />
      <div class='flex justify-center py-24'>
        <main class='container max-w-lg p-16 mx-auto mt-10 bg-gray-300 border border-gray-200 rounded-xl'>
          <h1 class='text-center front-bold-text-xl'>Log In</h1>
          <form method='POST' class='mt-10'>
            <div class='mb-6'>
              <label
                class='block mb-2 text-xs font-bold text-gray-700 uppercase'
                for='email'
              >
                email
              </label>
              <input
                class='w-full p-2 border border-gray-400'
                type='email'
                name='email'
                id=''
              />

              <p class='mt-2 text-xs text-red-500'>shecdoma</p>
            </div>
            <div class='mb-6'>
              <label
                class='block mb-2 text-xs font-bold text-gray-700 uppercase'
                for='password'
              >
                password
              </label>
              <input
                class='w-full p-2 border border-gray-400'
                type='password'
                name='password'
                id=''
              />

              <p class='mt-2 text-xs text-red-500'>shecdoma</p>
            </div>
            <div class='mb-6'>
              <button
                type='submit'
                class='px-4 py-2 text-white bg-gray-400 rounderd hover:bg-gray-500'
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
