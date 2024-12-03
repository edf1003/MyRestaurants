import Image from 'next/image';
import { Restaurant } from '../models/models';

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <div
      className='restaurant-card border rounded shadow-md p-4'
      style={{ margin: '10px', backgroundColor: '#ececec' }}
    >
      <Image
        src={restaurant.image}
        alt={`${restaurant.name}`}
        className=' object-cover rounded-t'
        height={300}
        width={320}
      />
      <div className='p-2'>
        <h3 className='text-lg font-semibold'>{restaurant.name}</h3>
        <p className='text-sm text-gray-900'>{restaurant.category}</p>
        <p className='text-sm text-gray-600'>{restaurant.location}</p>
        <p className='text-sm text-yellow-600 font-medium'>
          ⭐ {restaurant.rating}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
