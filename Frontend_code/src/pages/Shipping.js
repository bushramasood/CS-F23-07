import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShippingPage = () => {
  const [data, setData] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phoneNo: '',
    paymentMethod: ''  // New field for payment method
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phoneNo: '',
    paymentMethod: ''  // Error tracking for new field
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: value.trim() ? '' : `${name} is required`
    }));
  };

  const isFormValid = Object.values(data).every(x => x) && Object.values(formErrors).every(x => !x);

  const handleContinue = () => {
    if (isFormValid) {
      // Navigate to the ConfirmOrderPage with shippingInfo as state
      navigate('/confirm-order', { state: { shippingInfo: data } });
    }
  };

  return (
    <section id='shipping' className='mx-auto container p-4'>
      <div className='bg-white p-5 w-full max-w-sm mx-auto'>
        <form className='pt-6 flex flex-col gap-2'>
          <h1 className='text-xl font-bold mb-4'>Shipping Details</h1>
          <div className='grid'>
            {Object.keys(data).map((key) => (
              <div key={key} className='grid'>
                <label htmlFor={key} className='text-gray-700'>
                  {key.charAt(0).toUpperCase() + key.slice(1)} :
                </label>
                {key === 'paymentMethod' ? (
                  <select
                    id={key}
                    name={key}
                    className='mt-1 p-2 border w-full rounded outline-none bg-transparent'
                    value={data[key]}
                    onChange={handleOnChange}
                    required
                  >
                    <option value="">Select Payment Method</option>
                    <option value="cashOnDelivery">Cash on Delivery</option>
                    {/* Add more payment options here if necessary */}
                  </select>
                ) : (
                  <input
                    type={key === 'phoneNo' ? 'tel' : 'text'}
                    id={key}
                    name={key}
                    className='mt-1 p-2 border w-full rounded outline-none bg-transparent'
                    value={data[key]}
                    onChange={handleOnChange}
                    required
                  />
                )}
                {formErrors[key] && <p className="text-red-500">{formErrors[key]}</p>}
              </div>
            ))}
          </div>
          {isFormValid ? (
            <button className='bg-goldenrod hover:bg-goldenrod-darker text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6' onClick={handleContinue}>
              Continue
            </button>
          ) : (
            <button className='bg-gray-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full transition-all mx-auto block mt-6' disabled>
              Continue
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default ShippingPage;