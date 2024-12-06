'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Restaurant {
  id: string;
  name: string;
  category: string;
  location: string;
  image: string;
  description: string;
  rating: number;
}

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`http://localhost:3000/restaurants/${id}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener el restaurante');
        }
        const data = await response.json();
        setRestaurant(data);
      } catch (err) {
        setError('Error al cargar los datos del restaurante: ' + err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRestaurant();
    }
  }, [id]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <span className='text-xl'>Cargando...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <span className='text-xl text-red-600'>{error}</span>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <span className='text-xl'>Restaurante no encontrado</span>
      </div>
    );
  }

  return (
    <div>
      {/* Banner de fondo */}
      <div
        className='relative h-80 bg-cover bg-center'
        style={{ backgroundImage: `url('/assets/images/${restaurant.image}')` }}
      >
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='absolute inset-0 flex items-center justify-center text-white text-5xl font-bold'>
          {restaurant.name}
        </div>
      </div>

      {/* Cards con información del restaurante */}
      <div className='m-3'>
        <div className='grid grid-cols-1 sm:grid-cols-4 gap-6 mb-3'>
          <div className='bg-gray-50 p-4 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-2'>Descripción</h2>
            <p className='text-gray-700'>{restaurant.description}</p>
          </div>
          <div className='bg-gray-50 p-4 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-2'>Categoría</h2>
            <p className='text-gray-700'>{restaurant.category}</p>
          </div>
          <div className='bg-gray-50 p-4 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-2'>Ubicación</h2>
            <p className='text-gray-700'>{restaurant.location}</p>
          </div>
          <div className='bg-gray-50 p-4 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-2'>Calificación</h2>
            <p className='text-gray-700'>⭐ {restaurant.rating} / 5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
