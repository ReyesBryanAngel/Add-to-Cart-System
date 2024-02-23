'use client'
import { IoCartOutline } from "react-icons/io5";
import { useCartStore } from '@/app/Helpers/CartStore';
import React from 'react';

export function ViewCartButton(props: { name: string }) {
    const cartItemCount = useCartStore((state) => 
      state.items.reduce((acc, item) => 
      acc + item.quantity, 0
    ));
    const [isClient, setIsClient] = React.useState(false)
    const toggleCartModal = useCartStore((state) => state.toggleCartModal);
 
    React.useEffect(() => {
      setIsClient(true)
    }, [])

    return (
      (isClient && (
        <button onClick={toggleCartModal} className='btn btn-info'>
          <IoCartOutline size='2rem' />
          {props.name} ({cartItemCount})
        </button>
      ))
    )
}
