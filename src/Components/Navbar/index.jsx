import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom"
import { ShoppingCartContext } from "../../Context";
import ShoppingCart from "../../Components/ShoppingCart";
import { Bars3Icon } from "@heroicons/react/24/solid";

function Navbar() {
    const context = useContext(ShoppingCartContext)
    const activeStyle = 'underline underline-offset-8 text-indigo-600';

    // Sign Out
    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)
    const isUserSignOut = context.signOut || parsedSignOut

    // Account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)
    // Has an account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

    const handleSignOut = () => {
        const stringifiedSingOut = JSON.stringify(true)
        localStorage.setItem('sign-out', stringifiedSingOut)
        context.setSignOut(true)
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 0) {
                context.setIsScrolled(true);
            } else {
                context.setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const renderCategories = () => {
        if (hasUserAnAccount && !isUserSignOut) {
            return (
                <>
                    <li className="font-semibold text-xl me-3">
                        <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`}>
                            Jona<span className="text-indigo-600">Store</span>
                        </NavLink>
                    </li>
                    <li className="mt-1 max-md:hidden font-medium ms-2 text-gray-600">
                        <NavLink
                            to='/all'
                            onClick={() => context.setSearchByCategory()}
                            className={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            All
                        </NavLink>
                    </li>
                    <li className="mt-1 max-md:hidden font-medium ms-2 text-gray-600">
                        <NavLink
                            to='/clothes'
                            onClick={() => context.setSearchByCategory('clothes')}
                            className={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            Clothes
                        </NavLink>
                    </li> 
                    <li className="mt-1 max-md:hidden font-medium ms-2 text-gray-600">
                        <NavLink
                            to='/electronics'
                            onClick={() => context.setSearchByCategory('electronics')}
                            className={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            Electronics
                        </NavLink>
                    </li>
                    <li className="mt-1 max-md:hidden font-medium ms-2 text-gray-600">
                        <NavLink
                            to='/furniture'
                            onClick={() => context.setSearchByCategory('furniture')}
                            className={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            Furnitures
                        </NavLink>
                    </li>
                    <li className="mt-1 max-md:hidden font-medium ms-2 text-gray-600">
                        <NavLink
                            to='/toys'
                            onClick={() => context.setSearchByCategory('toys')}
                            className={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            Toys
                        </NavLink>
                    </li>
                    <li className="mt-1 max-md:hidden font-medium ms-2 text-gray-600">
                        <NavLink
                            to='/others'
                            onClick={() => context.setSearchByCategory('others')}
                            className={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            Others
                        </NavLink>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li className="font-semibold text-xl">
                        <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`}>
                            Jona<span className="text-indigo-600">Store</span>
                        </NavLink>
                    </li>
                </>
            )
        }
    }

    const renderView = () => {

        if (hasUserAnAccount && !isUserSignOut) {
            return (
                <>
                    <li className="text-black/60 max-md:hidden">
                        {parsedAccount?.email}
                    </li>
                    <li className="max-md:hidden ms-2 font-medium text-gray-600">
                        <NavLink
                            to='/my-orders'
                            className={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            My Orders
                        </NavLink>
                    </li>
                    <li className="max-md:hidden ms-2 font-medium text-gray-600">
                        <NavLink
                            to='/my-account'
                            className={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            My Account
                        </NavLink>
                    </li>
                    <li className="max-md:hidden ms-2 font-medium text-gray-600">
                        <NavLink
                            to='/sign-in'
                            className={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                            onClick={() => handleSignOut()}
                        >
                            Sign out
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-3 cursor-pointer md:hidden">
                        <Bars3Icon className="w-6 h-6 text-black" />
                    </li>
                    <li onClick={() => context.openCheckoutSideMenu()} className="flex ms-2 items-center gap-3 cursor-pointer">
                        <ShoppingCart />
                    </li>
                </>
            )
        } else {
            return (
                <li>
                    <NavLink
                        to='/sign-in'
                        className='bg-black text-white p-2 rounded-lg px-3'
                        onClick={() => handleSignOut()}
                    >
                        Sign in
                    </NavLink>
                </li>
            )
        }
    }

    return (
        <nav className={`${context.isScrolled ? 'shadow-lg' : ''} flex justify-between items-center fixed top-0 z-10 w-full py-5 px-14 text-sm font-normal bg-white`}>
            <ul className="flex items-center gap-5">
                {renderCategories()}
            </ul>
            <ul className="flex items-center gap-5">
                {renderView()}
            </ul>
        </nav>
    )
}

export default Navbar;