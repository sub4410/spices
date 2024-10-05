import nutmegt from '../assets/products/nutmeg.png';

export default function ProductTile({ id, name, price, category, rating, brandName }) {
    return (
        <div className="relative group m-5 bg-gray-50 shadow-md rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105">
            <a href={`/productpage/${id}`}>
            <div className="overflow-hidden aspect-w-1 aspect-h-1">
                <img
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    src={nutmegt}
                    alt={name}
                />
            </div>
            <div className="flex flex-col justify-between p-4 h-full">
                <div>
                    <h3 className="text-base font-semibold text-gray-900">
                        <a  title={name} className='hover:text-orange-400'>
                            {name}
                        </a>
                    </h3>
                    <div className='font-light text-sm'>{brandName}</div>
                    <div className='flex items-center mt-2'>
                        <span className='font-light text-sm'>Rating:</span>
                        <div className='font-light ml-2 text-sm'>{rating}</div>
                    </div>
                    <div className='mt-2'>
                        <span className='rounded-2xl px-2 text-xs bg-yellow-400'>{category}</span>
                    </div>
                </div>

                <div className="text-right mt-4">
                    <div className="text-sm">Price per Unit</div>
                    <p className="text-2xl font-bold text-gray-900">${price}</p>
                </div>
            </div></a>
        </div>
    );
}
