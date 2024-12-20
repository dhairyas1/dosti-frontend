import React from 'react';
import { Link } from 'react-router-dom';
import { LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';
import Logo from '../../../assets/images/logo.png';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__row">
        <div className="footer__col">
          <img src={Logo} alt="Codey AI Logo" className="footer__logo" />
          <p className="footer__text">
            Our mission is to empower remote and underserved communities through access to technology
            and digital literacy, fostering opportunities for economic development and personal growth.
          </p>
        </div>
        <div className="footer__col">
          <h3 className="footer__title">Featured links</h3>
          <ul className="featured-list">
            <li className="featured-list__item">
              <Link to="/" className="featured-list__item-link">Home</Link>
            </li>
            <li className="featured-list__item">
              <Link to="/course-home" className="featured-list__item-link">Courses</Link>
            </li>
            <li className="featured-list__item">
              <Link to="/about-us" className="featured-list__item-link">About Us</Link>
            </li>
            <li className="featured-list__item">
              <Link to="/contact" className="featured-list__item-link">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h3 className="footer__title">Connect with us</h3>
          <div className="social-list">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined style={{ fontSize: '24px', color: '#fff' }} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined style={{ fontSize: '24px', color: '#fff' }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
