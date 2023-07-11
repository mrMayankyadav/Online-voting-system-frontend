import React from 'react';
import "../styles/LayoutStyles.css";
import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { adminMenu, userMenu } from '../Data/data';
import {message} from 'antd';

const Layout = ({children}) => {
  const {user} = useSelector(state => state.user);
  const navigate = useNavigate();

  //logout function
  const handleLogout = () =>{
    localStorage.clear();
    message.success('Logout successfull');
    navigate('/login');
  };


  //rendering menu list
  const Header = user?.isAdmin ? adminMenu : userMenu;
  return (
    <div>
      <div className='main'>
        <div className='layout'>
          <div className='content'>

            <div className='header shadow'>
              {Header.map((menu) =>{
                return (
                  <>
                    <div className='menu-item'>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}

              <div className='menu-item' onClick={handleLogout}>
                <Link to ='/login'>Logout</Link>
              </div>

              <div className='menu-item'>
                {user?.name}
              </div>
            </div>

            <div className='body'>
              {children}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Layout;
