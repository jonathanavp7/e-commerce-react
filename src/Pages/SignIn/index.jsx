import React from 'react';
import Layout from '../../Components/Layout';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import './styles.css'

function SignIn() {
  return (
    <Layout>
      <div className='flex flex-col justify-center items-center w-80 relative mb-8'>
        <h2 className='m-10 font-semibold text-xl'>Sign in to your account</h2>
        <UserCircleIcon className='w-12 h-12' />
      </div>

      <form className="form">
          <div className="input-container">
            <input type="email" placeholder="Enter email" />
            <span>
            </span>
        </div>
        <div className="input-container">
            <input type="password" placeholder="Enter password" />
          </div>
          <button type="submit" className="submit bg-black">
          Sign in
        </button>

        <p className="signup-link">
          No account?
          <a className='ml-2' href="">Sign up</a>
        </p>
      </form>

    </Layout>
  )
}

export default SignIn