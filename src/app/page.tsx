'use client';
import RestaurantCard from './components/restaurant-card';
import './globals.css';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import AddRestaurantModal from './modals/add-restaurant-modal';
import axios from 'axios';
import { Restaurant } from './models/models';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:3000/restaurants');
      setRestaurants(response.data);
      setFilteredRestaurants(response.data);
    } catch (error) {
      console.error('Error al obtener restaurantes:', error);
    }
  };

  const handleDeleteRestaurant = async (id: string, filename: string) => {
    try {
      await fetch(`http://localhost:3000/restaurants/${id}`, {
        method: 'DELETE',
      });
      await fetch(`http://localhost:3001/images/${filename}`, {
        method: 'DELETE',
      });
      fetchRestaurants();
    } catch (error) {
      console.error('Error al eliminar el restaurante:', error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const filter = () => {
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    fetchRestaurants();
  };

  return (
    <div>
      <h1 className='text-center text-green-800 text-3xl font-bold mt-5 mb-5'>
        MY RESTAURANTS
      </h1>
      <div className='flex justify-center items-center space-x-2 w-full'>
        <input
          type='text'
          placeholder='Buscar'
          inputMode='text'
          className='border border-gray-300 rounded p-2 w-1/2 h-10'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className='bg-green-800 text-white p-3 rounded h-10 flex items-center justify-center'
          onClick={filter}
        >
          <FaSearch />
        </button>
        <div>
          <button
            className='bg-green-800 text-white p-2 rounded h-10 ml-auto'
            onClick={toggleModal}
          >
            Nuevo
          </button>
          <AddRestaurantModal
            isOpen={isModalOpen}
            onClose={toggleModal}
            restaurants={restaurants}
          />
        </div>
      </div>

      <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-4'>
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onDelete={handleDeleteRestaurant}
          />
        ))}
      </div>
    </div>
  );
}

