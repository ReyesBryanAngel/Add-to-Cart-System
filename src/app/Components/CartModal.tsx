import React from 'react';
import Image from 'next/image';
import { FaTrashAlt } from "react-icons/fa";
import { useCartStore } from '@/app/Helpers/CartStore';

type CartModalProps = {
  onClose: () => void;
};

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    items.forEach(item => {
      totalPrice += item.price + item.quantity - item.quantity;
    });
    return totalPrice;
  };

  const totalPrice = calculateTotalPrice();

  return (
    <>
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gray-700 bg-opacity-70 transition-opacity" onClick={onClose}></div>
          <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl overflow-auto scrollbar-hide">
                <div className="flex-1">
                  <div className="px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Lazapee Cart</h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button onClick={onClose} className="bg-white rounded-md text-gray-900 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                          <span className="sr-only">Close panel</span>
                          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      {items.map((item) => (
                        <div key={item.id} className="flex flex-col justify-between">
                          {item.quantity > 0 &&(
                            <>
                              <div className='mt-12'>
                                <Image
                                  src={item.image}
                                  alt={item.image}
                                  width={500}
                                  height={300}
                                  style={{ borderRadius:"20px" }}
                                />
                                <p className='mt-5'>{item.name}</p>
                              </div>
                              <div className='flex items-center justify-between'>
                                  <div className='flex flex-col mt-5'>
                                    <div className='flex gap-5 items-center'>
                                      <button
                                        onClick={() => decreaseQuantity(item.id, item.quantity)}
                                        className="px-3 py-1 border border-gray-300 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
                                      >
                                        -
                                      </button>
                                      <span>{item.quantity}</span>
                                      <button
                                        onClick={() => increaseQuantity(item.id)}
                                        className="px-3 py-1 border border-gray-300 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
                                      >
                                        +
                                      </button>
                                    </div>
                                    <span className='mt-3'>Price: ${item.price}</span>
                                  </div>
                                  <div>
                                    <button className='px-3 py-1 border-gray-300' onClick={() => removeFromCart(item.id)}>
                                      <FaTrashAlt />
                                    </button>
                                  </div>
                                </div>
                              </>
                          )}
                          
                        </div>
                      ))}
                      <p className='mt-12'>{totalPrice == 0 ? `Please add an item.` : `Estimated Total: $${totalPrice}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CartModal;
