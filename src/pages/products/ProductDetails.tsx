import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '../../pages/products/Products';
import { useCart } from '../../store/CartContext';
import MainLayout from '../../layouts/MainLayout';
import React from 'react';
import FMCommerceLoader from '../../components/Loader';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: 'ADD_ITEM', product });
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
    }
  };

  if (loading) return (
    <MainLayout>
      <div className="text-center py-8" role="status"><FMCommerceLoader/></div>
    </MainLayout>
  );
  if (error) return (
    <MainLayout>
      <div className="text-center text-red-500 py-8" role="status">{error}</div>
    </MainLayout>
  );
  if (!product) return (
    <MainLayout>
      <div className="text-center py-8">Product not found.</div>
    </MainLayout>
  );

  return (
    <MainLayout>
      <div className='bg-white dark:bg-[#1a1a1a] border rounded-xl border-[#e5e5e5] dark:border-[#313131] p-4 my-10 flex flex-col'>
        <h1 className='text-lg font-bold text-[#121212] dark:text-[#F0F0F0] text-left'>Product Details</h1>
          <Link to="/products" className="text-[#FF6F61] text-left hover:underline text-xs mt-2">&larr; Back to products</Link>

      </div>
      <div className="p-6 flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="h-96 w-96 object-cover mx-auto md:mx-0 rounded-xl p-3 border border-[#e5e5e5] dark:border-[#313131] bg-white dark:bg-[#1a1a1a]"
          loading="lazy"
          width={400}
          height={400}
          srcSet={`
            ${product.image} 128w,
            ${product.image} 256w,
            ${product.image} 512w
          `}
          sizes="(min-width: 768px) 256px, 100vw"
        />
        <div className="flex-1 flex flex-col items-start">
          <div className="mb-2 text-xs text-gray-500 dark:text-gray-400 text-left uppercase">{product.category}</div>
          <h1 className="text-2xl font-bold mb-2 text-left">{product.title}</h1>
          <div className=" text-xl font-semibold my-5 text-[#121212] dark:text-[#F0F0F0] text-left">${product.price.toFixed(2)}</div>
          <p className="mb-4 text-left text-sm">{product.description}</p>
          <button
            className="bg-[#1a1a1a] text-white dark:text-black mt-3 text-sm font-semibold py-2 px-4 rounded-xl mb-2 w-full md:w-auto disabled:opacity-60 hover:opacity-80"
            onClick={handleAddToCart}
            disabled={added}
            aria-label={added ? 'Product added to cart' : 'Add product to cart'}
          >
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </MainLayout>
  );
} 