import { useContext, useState, useRef } from 'react'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'

function MyAccount() {
  const context = useContext(ShoppingCartContext)
  const [view, setView] = useState('user-info')
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  const form = useRef(null)

  const editAccount = () => {
    const formData = new FormData(form.current)
		const data = {
			name: formData.get('name'),
			email: formData.get('email'),
			password: formData.get('password')
		}

    // Update account
    const stringifiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedAccount) 
    context.setAccount(data)
  }

  const renderUserInfo = () => {
    return (
      <div className='flex flex-col gap-y-2 w-80 justify-center items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 mb-2 mt-10"><path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" /></svg>
        <p className='text-xl font-bold'>
          <span>{parsedAccount?.name}</span>
        </p>
        <p className='text-sm font-medium text-gray-400'>
          <span>{parsedAccount?.email}</span>
        </p>
        <button
          className='w-80 py-4 mt-4 bg-white border border-black font-medium rounded-lg text-sm px-5 text-center text-black'
          onClick={() => setView('edit-user-info')}>
          Edit
        </button>
      </div>
    )
  }

  const renderEditUserInfo = () => {
    return (
      <form ref={form}>
        <div clasNames="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl">
                Edit your information
              </p>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                  Your name
                </label>
                <input 
                  placeholder="Enter your name..." 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" 
                  id="name" 
                  type="text" 
                  name="name"
                  defaultValue={parsedAccount?.name}
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" 
                  placeholder="Enter your email..." 
                  id="email" 
                  type="email" 
                  name="email"
                  defaultValue={parsedAccount?.email}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" 
                  placeholder="••••••••" 
                  id="password" 
                  type="password" 
                  name="password"
                  defaultValue={parsedAccount?.password}
                />
              </div>

              <button
                className='w-80 mt-6 bg-black font-medium rounded-lg text-sm px-5 py-3 text-center text-white'
                onClick={() => {setView('user-info'), editAccount()}}>
                Edit
              </button>

            </div>
          </div>
        </div>
      </form>
    )
  }

  const renderView = () => view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo()

  return (
    <Layout>
      <h1 className="font-medium text-xl text-center mt-10 mb-6 w-80">My account</h1>
      {renderView()}
    </Layout>
  )
}

export default MyAccount