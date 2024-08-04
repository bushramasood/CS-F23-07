import React from 'react';
import { useParams } from 'react-router-dom';
import productdata from './PagesData';

const Pagesdetail = () => {
  const { pageTitle } = useParams();
  // Find the product by matching pageTitle with the pageTitle property
  const thisProduct = productdata.find(
    prod => prod.pageTitle.toLowerCase().replace(/\s+/g, '-') === pageTitle
  );
  // Handle case where product is not found
  if (!thisProduct) {
    return <div className="text-center text-red-500 text-xl mt-10">Page not found.</div>;
  }
  return (
    <div className="container mx-auto p-5">
      <div className="max-w-2xl mx-auto flex flex-col items-center mt-10 bg-white shadow-md rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4">{thisProduct.pageTitle}</h3>
        <p className="text-gray-700 text-center leading-relaxed">{thisProduct.description}</p>
      </div>
    </div>
  );
}

export default Pagesdetail;
