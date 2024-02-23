'use client'

import { ProductResponse } from '@/app/Models/ProductModel'
import React, { useOptimistic } from 'react'
import ProductRow from '@/app/Components/ProductRow'
import { useCartStore } from '@/app/Helpers/CartStore';
import CartModal from './CartModal'

interface ProductListProps {
  products: ProductResponse
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const isCartModalOpen = useCartStore((state) => state.isCartModalOpen);
  const toggleCartModal = useCartStore((state) => state.toggleCartModal);
  const items = useCartStore((state) => state.items);
  const [optimisticProducts, removeOptimisticProduct] = useOptimistic(
    products,
    (state, removeProductId) => {
      return state.filter((product) => product.id !== removeProductId)
    }
  )
    
  return (
    <div className='overflow-x-auto'>
        {isCartModalOpen && <CartModal onClose={toggleCartModal} />}
      <table className='table w-full'>
        <thead>
          <tr className='text-center'>
            <th></th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {optimisticProducts.length ? (
            <>
              {optimisticProducts.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  removeOptimisticProduct={removeOptimisticProduct}
                />
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={5} className='text-center'>
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList
