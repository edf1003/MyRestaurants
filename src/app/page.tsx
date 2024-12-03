'use client';
import RestaurantCard from './components/restaurant-card';
import { Restaurant } from './models/models';
import restaurantsData from './../resources/data/restaurants.json';
import './globals.css';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

export default function Home() {
  const restaurants = restaurantsData.map(
    (data) =>
      new Restaurant(
        data.id,
        data.name,
        data.category,
        data.location,
        data.image,
        data.description,
        data.priceRange,
        data.rating,
        data.hours
      )
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  const filter = () => {
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRestaurants(filtered);
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
        <button className='bg-green-800 text-white p-2 rounded h-10 ml-auto'>
          Nuevo
        </button>
      </div>

      <div>
        {filteredRestaurants
          .reduce<Restaurant[][]>((rows, restaurant, index) => {
            if (index % 3 === 0) rows.push([]);
            rows[rows.length - 1].push(restaurant);
            return rows;
          }, [])
          .map((row, index) => (
            <div key={index} className='flex flex-wrap gap-4 mx-4'>
              {row.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

