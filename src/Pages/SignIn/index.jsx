import { useContext, useState, useRef } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'

function SignIn() {
  const context = useContext(ShoppingCartContext)
  const [view, setView] = useState('user-info')
  const form = useRef(null)

  // Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  // Has an account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(false)
    // Redirect
    return <Navigate replace to={'/'} />
  }

  const createAnAccount = () => {
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }
    // Create account
    const stringifiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedAccount)
    context.setAccount(data)
    // Sign In
    handleSignIn()
  }

  const renderLogIn = () => {
    return (
      <form>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div class="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900">
                  Your name
                </label>
                <input defaultValue={parsedAccount?.name} placeholder="Enter your name..." class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="username" type="text" />
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input defaultValue={parsedAccount?.password} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" id="password" type="password" />
              </div>
              <Link to="/">
                <button onClick={() => handleSignIn()} disabled={!hasUserAnAccount} class="w-full mt-6 bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white" type="submit">
                  Log in
                </button>
              </Link>

              <div class="flex items-start">
                <div class="ml-3 text-sm">
                  <label className="font-light text-gray-500">
                    No account?<span className='font-medium'><a className='hover:underline' href="#"> Create now.</a></span>
                  </label>
                </div>
              </div>

              <button onClick={() => setView('create-user-info')} disabled={hasUserAnAccount} class="w-80 bg-white border border-black font-medium rounded-lg text-sm px-5 py-2.5 text-center text-black" type="submit">
                Create an account
              </button>

            </div>
          </div>
        </div>
      </form>

    )
  }

  const renderCreateUserInfo = () => {
    return (
      <form ref={form}>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div class="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
              </p>
              <div>
                <label htmlFor="name" class="block mb-2 text-sm font-medium text-gray-900">
                  Your name
                </label>
                <input 
                  placeholder="Enter your name..." 
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" 
                  id="name" 
                  type="text" 
                  name="name"
                  defaultValue={parsedAccount?.name}
                />
              </div>
              <div>
                <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input 
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" 
                  placeholder="Enter your email..." 
                  id="email" 
                  type="email" 
                  name="email"
                  defaultValue={parsedAccount?.email}
                />
              </div>
              <div>
                <label htmlFor="password" class="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input 
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" 
                  placeholder="••••••••" 
                  id="password" 
                  type="password" 
                  name="password"
                  defaultValue={parsedAccount?.password}
                />
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input class="w-4 h-4 border rounded focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800" type="checkbox" aria-describedby="terms" id="terms" />
                </div>
                <div class="ml-3 text-sm">
                  <label class="font-light text-gray-500">
                    I accept the<a href="#" class="font-medium text-primary-600 hover:underline text-primary-500"> Terms and Conditions</a>
                  </label>
                </div>
              </div>

              <Link to="/">
                <button onClick={() => createAnAccount()} class="w-80 mt-6 bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white" type="submit">
                  Create an account
                </button>
              </Link>

            </div>
          </div>
        </div>
      </form>

    )
  }

  const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogIn()

  return (
    <Layout>
      <h1 className="font-normal text-xl text-center py-4 mb-6 w-80"><span className='font-bold'>Welc<span className='text-indigo-600'>ome!</span></span> Log in to get started...</h1>
      {renderView()}
    </Layout>
  )
}

export default SignIn