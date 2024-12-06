import Image from 'next/image';
import { Restaurant } from '../models/models';
import { FaTrash } from 'react-icons/fa';
import Link from 'next/link';

const RestaurantCard = ({
  restaurant,
  onDelete,
}: {
  restaurant: Restaurant;
  onDelete: (id: string, filename: string) => void;
}) => {
  const deleteRestaurant = () => {
    onDelete(restaurant.id, restaurant.image);
  };

  return (
    <div
      className='restaurant-card border rounded shadow-md p-4'
      style={{ margin: '10px', backgroundColor: '#ececec' }}
    >
      <Link href='/restaurant/[id].js' as={`/restaurant/${restaurant.id}`}>
        <Image
          src={'/assets/images/' + restaurant.image}
          alt={`${restaurant.name}`}
          className=' object-cover rounded-t'
          height={300}
          width={320}
        />
        <div className='p-2'>
          <h3 className='text-lg font-semibold'>{restaurant.name}</h3>
          <p className='text-sm text-gray-900'>{restaurant.category}</p>
          <p className='text-sm text-gray-600'>
            {restaurant.location.length > 20
              ? `${restaurant.location.slice(0, 20)}...`
              : restaurant.location}
          </p>

          <span style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className='text-sm text-yellow-600 font-medium'>
              ⭐ {restaurant.rating}
            </p>
            <button>
              <FaTrash onClick={deleteRestaurant} />
            </button>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
