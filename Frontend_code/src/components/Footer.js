import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assest/logo.png';

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white mt-1 pt-5 overflow-x-hidden">
        <div className="container mx-auto px-4 pt-5">
          <div className="flex flex-wrap justify-center text-center">
            <div className="w-full md:w-1/4 mb-6 md:mb-0 flex justify-center">
              <Link to={"/"}>
                <img src={logoImage} alt='Logo' width={150} />
              </Link>
            </div>

            <div className="w-1/2 md:w-1/6 mb-6 md:mb-0">
              <h5 className="text-gray-400">About Us</h5>
              <ul className="list-none text-sm">
                <li><Link to="/pages-detail/who-we-are" className="text-white">Who we are</Link></li>
                <li><Link to="/pages-detail/what-we-do" className="text-white">What we do</Link></li>
                <li><Link to="/pages-detail/vision" className="text-white">Vision</Link></li>
                <li><Link to="/pages-detail/team" className="text-white">Team</Link></li>
              </ul>
            </div>

            <div className="w-1/2 md:w-1/6 mb-6 md:mb-0">
              <h5 className="text-gray-400">Services</h5>
              <ul className="list-none text-sm">
                <li><Link to="/pages-detail/how-to-buy" className="text-white">How to buy</Link></li>
                <li><Link to="/pages-detail/payment-method" className="text-white">Payment method</Link></li>
                <li><Link to="/pages-detail/contact-us" className="text-white">Contact Us</Link></li>
                <li><Link to="/pages-detail/customer-services" className="text-white">Customer Services</Link></li>
              </ul>
            </div>

            <div className="w-full md:w-1/4">
              <h5 className="text-gray-400">Other</h5>
              <ul className="list-none text-sm">
                <li><Link to="/pages-detail/terms-and-conditions" className="text-white">Terms and Conditions</Link></li>
                <li><Link to="/pages-detail/privacy-policy" className="text-white">Privacy Policy</Link></li>
                <li><Link to="/pages-detail/blogs" className="text-white">Blogs</Link></li>
                <li><Link to="/pages-detail/help" className="text-white">Help</Link></li>
              </ul>
            </div>
          </div>

          <div className="p-5">
          </div>

          <div className="flex justify-center mt-5">
            <div className="text-center text-yellow-300 w-full">
              <p>Contact us: localorgano@gmail.com || Phone: (123) 456-7890</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4 pt-3 bg-gray-800">
          <div className="text-center w-full">
            <p className="mb-5 text-sm">&copy; 2024 LocalOrgano. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
