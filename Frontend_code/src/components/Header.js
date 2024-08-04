import React, { useContext, useState } from 'react';
import { GrSearch, GrMicrophone } from "react-icons/gr";
import { FaUserCircle, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import logoImage from '../assest/logo.png';
import GoogleTranslate from "../components/Translator";

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSpokenText(transcript);
      navigate(`/search?q=${transcript}`);
    };

    recognition.start();
  };

  return (
    <header className='h-16 shadow-md fixed w-full z-40' style={{ backgroundColor: '#232F3E' }}>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
            <img src={logoImage} alt='Logo' width={70} />
          </Link>
        </div>
        
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm focus-within:shadow pl-2 relative bg-white rounded-full'>
          <input type='text' placeholder='Search product here...' className='w-full pl-9 bg-white outline-none' onChange={handleSearch} value={search}/>
          <button onClick={handleVoiceSearch} className="text-xl pr-2" style={{ fontSize: '18px' }}>
            <GrMicrophone />
          </button>
          <div className='text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-full text-white' style={{ backgroundColor: '#C49F09' }}>
            <GrSearch />
          </div>
        </div>
       

        <div className='flex items-center gap-7'>
           <GoogleTranslate className='text-white flex items-center overflow-hidden h-8 pt-5' />
           
          
          <div className='relative flex justify-center'>
            {user?._id && (
              <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
                {user?.profilePic ? (
                  <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                ) : (
                  <FaUserCircle className="text-white" />
                )}
              </div>
            )}
            {menuDisplay && (
              <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link to={"/admin-panel/profile"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Admin Dashboard</Link>
                  )}
                  {user?.role === ROLE.GENERAL && (
                    <Link to={"/general-panel/profile"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>User Dashboard</Link>
                  )}
                  {user?.role === ROLE.VENDER && (
                    <Link to={"/vendor-panel/profile"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Vendor Dashboard</Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className='text-2xl relative'>
              <span><FaShoppingCart className="text-white" /></span>
              <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3' style={{ backgroundColor: '#C49F09' }}>
                <p className='text-sm'>{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div className="flex items-center">
            {user?._id ? (
              <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700' style={{ backgroundColor: '#C49F09' }}>Logout</button>
            ) : (
              <>
                <Link to={"/login"} className='px-2 py-1 rounded-full text-white flex items-center hover:no-underline'>
                  <FaSignInAlt/>
                  Login
                </Link>
                <span className="mx-3 text-white">||</span>
                <Link to={"/sign-up"} className='px-2 py-1 rounded-full text-white flex items-center hover:no-underline'>
                  <FaUserPlus />
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
