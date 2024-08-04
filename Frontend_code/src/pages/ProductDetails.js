import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar } from 'react-icons/fa';
import displayPKRCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    productImage: [],
    description: '',
    price: '',
    sellingPrice: '',
    averageRating: 0,
    stock: 0
  });
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const { userId } = useContext(Context);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();

  const [customOrderText, setCustomOrderText] = useState('');

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ productId: params.id })
    });
    setLoading(false);
    const dataResponse = await response.json();
    setData(dataResponse.data || {});
    setActiveImage(dataResponse.data.productImage[0] || '');
  };

  const fetchReviews = async () => {
    try {
      console.log(`Fetching reviews for productId: ${params.id}`);
      const response = await fetch(`${SummaryApi.getReviews.url}/${params.id}`, {
        method: SummaryApi.getReviews.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const dataResponse = await response.json();
      console.log('Fetched reviews:', dataResponse);
      setReviews(dataResponse.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
    fetchReviews();
  }, [params]);

  useEffect(() => {
    if (reviews.length > 0) {
      const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
      setData(prevData => ({ ...prevData, averageRating }));
    }
  }, [reviews]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  }, [zoomImageCoordinate]);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id, customOrderText);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id, customOrderText);
    fetchUserAddToCart();
    navigate('/cart');
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) {
      alert('Comment is required.');
      return;
    }
    try {
      const response = await fetch(SummaryApi.addReview.url, {
        method: SummaryApi.addReview.method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newReview, productId: params.id, userId })
      });
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Error: ${response.status} ${response.statusText}, ${errorDetails}`);
      }
      const result = await response.json();
      if (result.success) {
        setReviews([...reviews, result.data]);
        setNewReview({ rating: 0, comment: '' });
        setShowModal(false);
        fetchReviews(); // Fetch reviews again to update the list
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* Product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative'>
            <img src={activeImage} className='h-full w-full object-cover mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />
            {zoomImage && (
              <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                <div
                  className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className='h-full'>
            {loading ? (
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {productImageListLoading.map((el, index) => (
                  <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={'loadingImage' + index}></div>
                ))}
              </div>
            ) : (
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {data.productImage && data.productImage.map((imgURL, index) => (
                  <div className='h-20 w-20 bg-slate-200 rounded' key={imgURL}>
                    <img src={imgURL} className='w-full h-full object-cover mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Product details */}
        {loading ? (
          <div className='h-full flex flex-1 flex-col gap-2 animate-pulse'>
            <div className='w-full min-h-[50px] bg-slate-200 rounded'></div>
            <div className='w-full min-h-[50px] bg-slate-200 rounded'></div>
            <div className='w-full min-h-[50px] bg-slate-200 rounded'></div>
          </div>
        ) : (
          <div className='flex-1 flex flex-col gap-4 justify-between'>
            <div className='flex flex-col gap-2'>
              <p className='text-2xl font-medium capitalize'>{data.productName}</p>
              <p className='text-sm font-medium text-slate-500'>Category: <span className='font-semibold text-slate-700'>{data.category}</span></p>
              <div className='flex items-center gap-2'>
                <p className='text-lg font-medium text-slate-700'>
                  {displayPKRCurrency(data.sellingPrice)}
                </p>
                {data.sellingPrice !== data.price && <p className='text-sm text-slate-400 line-through'>{displayPKRCurrency(data.price)}</p>}
              </div>
              {data.averageRating > 0 && (
                <div className='flex items-center gap-1 text-slate-700'>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FaStar key={i} size={15} className={data.averageRating >= i ? 'text-yellow-500' : 'text-slate-300'} />
                  ))}
                  <p className='text-sm text-slate-500 font-medium'>({reviews.length})</p>
                </div>
              )}
              <p className='text-slate-600 font-medium my-1'>
                Status: <span style={{ color: data.stock > 0 ? 'green' : 'red' }}>
                  {data.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <div className='flex gap-2 items-center'>
                <button onClick={(e) => handleAddToCart(e, params.id)} className='px-2 py-2 w-32 text-center rounded-md bg-goldenrod hover:bg-goldenrod-darker text-white'>
                  Add to Cart
                </button>
                <button onClick={(e) => handleBuyProduct(e, params.id)} className='px-2 py-2 w-32 text-center rounded-md bg-red-500 hover:bg-red-700 text-white'>
                  Buy Now
                </button>
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='customOrder' className='text-sm font-medium text-slate-700'>Custom Order Details:</label>
                <textarea
                  id='customOrder'
                  value={customOrderText}
                  onChange={(e) => setCustomOrderText(e.target.value)}
                  placeholder='Enter your custom order details here...'
                  className='border border-slate-300 rounded-md p-2'
                  rows={4}
                />
              </div>
              <p className='text-slate-500'>{data.description}</p>
            </div>
            <button onClick={() => setShowModal(true)} className='mt-4 px-4 py-2 w-32 bg-goldenrod hover:bg-goldenrod-darker text-white rounded-md'>
              Add a Review
            </button>
          </div>
        )}
      </div>

      {/* Reviews */}
      <div className='flex flex-col mt-8'>
        <p className='text-xl font-medium'>Reviews</p>
        {reviews.length > 0 ? (
          <div className='flex flex-col gap-4 mt-4'>
            {reviews.map((review) => (
              <div key={review._id} className='flex flex-col gap-1 bg-white p-4 rounded-md shadow'>
                <div className='flex items-center gap-2'>
                  <p className='text-sm font-medium text-slate-500'>{review.userId.name}</p>
                  <div className='flex items-center gap-1 text-slate-700'>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FaStar key={i} size={15} className={review.rating >= i ? 'text-yellow-500' : 'text-slate-300'} />
                    ))}
                  </div>
                </div>
                <p className='text-slate-500'>{review.comment}</p>
                <p className='text-xs text-slate-400'>{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-sm text-slate-500 mt-2'>No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* Add Review Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-4 rounded-md shadow-lg'>
            <h2 className='text-xl font-medium mb-4'>Add a Review</h2>
            <form onSubmit={handleAddReview} className='flex flex-col gap-4'>
              <div className='flex items-center gap-1 text-slate-700'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <FaStar key={i} size={25} className={newReview.rating >= i ? 'text-yellow-500' : 'text-slate-300'} onClick={() => setNewReview({ ...newReview, rating: i })} />
                ))}
              </div>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder='Write your review here...'
                className='border border-slate-300 rounded-md p-2'
                rows={4}
              />
              <div className='flex gap-2'>
                <button type='submit' className='flex-1 px-4 py-2 bg-goldenrod hover:bg-goldenrod-darker text-white rounded-md'>
                  Submit
                </button>
                <button onClick={() => setShowModal(false)} className='flex-1 px-4 py-2 bg-red-500 text-white rounded-md'>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {data.category && (
        <CategoryWiseProductDisplay category={data.category} heading={'Recommended Product'} />
      )}
    </div>
  );
};

export default ProductDetails;