import React, { useState } from 'react';
import axios from 'axios';
import { Restaurant } from '../models/models';

interface AddRestaurantModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurants: Restaurant[];
}

const AddRestaurantModal: React.FC<AddRestaurantModalProps> = ({
  isOpen,
  onClose,
  restaurants,
}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const saveRestaurant = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!image) {
      alert('Por favor, selecciona una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('category', category);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('rating', rating);

    try {
      const imageResponse = await axios.post(
        'http://localhost:3001/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const imageUrl = imageResponse.data.filename;

      const id = restaurants.length + 1;
      const data: Restaurant = {
        id: id.toString(),
        name,
        category,
        location: address,
        description,
        rating: Number(rating),
        image: imageUrl,
      };

      await axios.post('http://localhost:3000/restaurants', data);
      onClose();
    } catch (error) {
      console.error('Error al guardar el restaurante:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-4 rounded shadow-md w-96'>
        <h2 className='text-xl font-bold mb-4'>Formulario</h2>
        <form onSubmit={saveRestaurant}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Nombre
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Ingresa tu nombre'
              className='border rounded w-full py-2 px-3 text-gray-700'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Categoría
            </label>
            <input
              type='text'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder='Ingresa la categoría'
              className='border rounded w-full py-2 px-3 text-gray-700'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Dirección
            </label>
            <input
              type='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Ingresa la dirección'
              className='border rounded w-full py-2 px-3 text-gray-700'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Descripción
            </label>
            <input
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Ingresa la descripción'
              className='border rounded w-full py-2 px-3 text-gray-700'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Subir Imagen
            </label>
            <input
              type='file'
              accept='image/*'
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Valoración
            </label>
            <input
              min={0}
              max={5}
              type='number'
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder='Ingresa la valoración'
              className='border rounded w-full py-2 px-3 text-gray-700'
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='button'
              className='bg-gray-500 text-white px-4 py-2 rounded mr-2'
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='bg-green-800 text-white px-4 py-2 rounded'
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurantModal;
