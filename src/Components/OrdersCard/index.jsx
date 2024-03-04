import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { CalendarIcon } from '@heroicons/react/24/solid'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'

const OrdersCard = props => {
    const { totalPrice, totalProducts } = props

    return (
        <div className='flex justify-between items-center mb-3 border rounded-lg p-4 w-80 shadow-lg'>
            <div className='flex justify-between w-full'>
                <div className='flex flex-col'>
                    <div className='flex gap-2 items-center'>
                        <CalendarIcon className='w-4 h-4' />
                        <span className='font-light'>01.02.24</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <ShoppingBagIcon className='w-4 h-4' />
                        <span className='font-light'>{totalProducts} articles</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='font-medium text-2xl'>${totalPrice}</span>
                    <ChevronRightIcon className='w-6 h-6 cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default OrdersCard