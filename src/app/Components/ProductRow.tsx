'use client'

import { IProduct } from '@/app/Models/ProductModel'
import { BiInfoCircle, BiSolidTrash } from 'react-icons/bi'
import { deleteProduct } from '@/app/Helpers/Products'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/app/Helpers/CartStore';
import Image from 'next/image';
import React from 'react'

interface ProductRowProps {
  product: IProduct
  removeOptimisticProduct: (productId: number) => void
}

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  removeOptimisticProduct,
}) => {
  const router = useRouter()
  const addToCart = useCartStore((state) => state.addToCart);
  const items = useCartStore((state) => state.items);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
  };

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleViewProduct = (product_id) => {
    router.push(`/products/${product_id}`)
  }

  const handleDeleteProduct = async (product_id) => {
    removeOptimisticProduct(product_id)

    // Directus: Product Delete
    await deleteProduct(product_id)
  }

  return (
    <tr key={product.id}>
      <td></td>
      <td>
        <div className='avatar flex flex-col space-y-3'>
          <div className='rounded-xl'>
              <Image
                src={product.image}
                alt={product.image}
                width={500}
                height={300}
                style={{ borderRadius:"20px" }}
              />
          </div>
          <button className='btn btn-outline btn-info' onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>
        <div className='flex space-x-2'>
          <button
            className='btn btn-outline btn-info'
            onClick={() => handleViewProduct(product.id)}
          >
            <BiInfoCircle size='2rem' />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default ProductRow
