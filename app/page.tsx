'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from './modal';
import { Discs } from '@/app/lib/definitions-test'; // Import the Discs type
import GolfLogo from '@/app/ui/golf-logo';

const products = require('@/app/lib/placeholder-data-test');

export default function Page() {
  const [productsList, setProductsList] = useState<Discs[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Discs[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    discType: '',
    weight: '',
    speed: '',
    color: '',
    sort: ''
  });

  const initialFilters = {
    name: '',
    discType: '',
    weight: '',
    speed: '',
    color: '',
    sort: ''
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addNewListing = (newListing: Discs) => {
    setProductsList([...productsList, newListing]);
    closeModal();
  };

  const handleAddToCart = (listing: Discs) => {
    alert(listing.name + ' has been purchased successfully!');
  };

  useEffect(() => {
    setProductsList(products);
    setFilteredProducts(products);
  }, []);

  useEffect(() => {
    const filtered = productsList.filter(product => {
      return (
        product.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        product.discType.toLowerCase().includes(filters.discType.toLowerCase()) &&
        product.weight.toLowerCase().includes(filters.weight.toLowerCase()) &&
        product.speed.toLowerCase().includes(filters.speed.toLowerCase()) &&
        product.color.toLowerCase().includes(filters.color.toLowerCase())
      );
    });
    if (filters.sort === 'speed') {
      filtered.sort((a, b) => parseFloat(a.speed) - parseFloat(b.speed));
    } else if (filters.sort === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'weight') {
      filtered.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));
    }
    setFilteredProducts(filtered);
  }, [filters, productsList]); // Added productsList to the dependency array


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  const handleSortChange = (sortValue: string) => {
    // Toggle the sort state if the same sort value is selected again
    const newSort = filters.sort === sortValue ? '' : sortValue;
    setFilters({ ...filters, sort: newSort });
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
  };
  const uniqueColors = Array.from(new Set(productsList.map(product => product.color)));

  return (
    <main className="md:flex lg:flex xl:flex sm:flex flex-col ">
      <div className="md:flex lg:flex xl:flex sm:flex justify-center items-center h-18 bg-blue-500 p-4 md:h-50">
        <GolfLogo />
      </div>
      <div className="w-full flex md:flex lg:flex xl:flex sm:flex flex-col p-4">
        <button
          onClick={openModal}
          className="mx-auto rounded-lg bg-blue-500 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-400 p-4 w-3/5"
          style={{ width: '50%', maxWidth: '400px' }}
        >
          <span>Create New Listing</span>
        </button>
        {isModalOpen && <Modal onClose={closeModal} onAdd={addNewListing} />}
      </div>
      <div className="flex md:flex lg:flex xl:flex sm:flex bg-gray-300 grid-rows-2">
        <div className="flex md:flex lg:flex xl:flex sm:flex">
          <div className='p-6'>
            <div className="flex flex-col">
              <p className="text-lg font-bold mb-4">Filters:</p>
              <div className="flex justify-center mt-4">
                <select name="discType" value={filters.discType} onChange={handleChange} className="p-2 mr-2">
                  <option value="">Disc Type</option>
                  <option value="putter">Putter</option>
                  <option value="driver">Driver</option>
                  <option value="mid-range">Mid-range</option>
                </select>
              </div>
              <div className="flex mt-4">
                <select name="color" value={filters.color} onChange={handleChange} className="p-2">
                  <option value=""> Color</option>
                  {uniqueColors.map((color, index) => (
                    <option key={index} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-lg font-bold mb-4">Sort:</p>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="sort1"
                  name="sort"
                  value="speed"
                  checked={filters.sort === 'speed'}
                  onChange={() => handleSortChange('speed')}
                />
                <label htmlFor="sort1">Speed</label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="sort2"
                  name="sort"
                  value="price"
                  checked={filters.sort === 'price'}
                  onChange={() => handleSortChange('price')}
                />
                <label htmlFor="sort2">Price</label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="sort3"
                  name="sort"
                  value="weight"
                  checked={filters.sort === 'weight'}
                  onChange={() => handleSortChange('weight')}
                />
                <label htmlFor="sort3">Weight</label>
              </div>
            </div>
            <div className="flex justify-center mt-4 bg-blue-500 rounded-lg">
              <button onClick={handleClearFilters} className="text-black-800 px-4 py-2 rounded-md ">Clear Filters</button>
            </div>
          </div>
        </div>
        <div className="flex md:flex lg:flex xl:flex sm:flex bg-gray-300 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex gap-5 p-5 mx-auto">
            {filteredProducts.length === 0 ? (
              <div className="text-center">No items found. Please reload page.</div>
            ) : (
              filteredProducts.map((product, index) => (
                <div key={index} className="grid rounded-lg relative bg-white">
                  <img src={product.image} width={250} height={130} className="md:hidden object-cover h-auto w-full rounded-t-lg p-2" alt={product.name} />
                  <div className="hidden md:block">
                    <img src={product.image} width={250} height={130} className="object-cover h-auto w-full rounded-b-lg p-2" alt={product.name} />
                  </div>
                  <p className="ml-2 text-sm">
                    <strong className="w-full flex grow justify-center">{product.name}</strong>
                  </p>
                  <div className="p-3 bg-gray-100">
                    <p className="ml-2 mt-2 text-xs">Disc Type: {product.discType}</p>
                    <p className="ml-2 text-xs">Weight: {product.weight}</p>
                    <p className="ml-2 text-xs">Speed: {product.speed}</p>
                    <p className="ml-2 text-xs">Color: {product.color}</p>
                  </div>
                  <button onClick={() => handleAddToCart(product)} className="bg-blue-500 text-white rounded-md text-sm p-2 mx-2 my-2 hover:bg-gray-400">
                    USD {product.price}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>


      </div>
    </main>
  );
}
