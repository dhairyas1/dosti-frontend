import { InstagramOutlined, LinkedinFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import './Footer.scss';
import Logo from '../../../assets/images/logo.png';

const Footer = () => {
  return (
    <div className='footer spacing-h-md'>
      <div className='container'>
        <Row className='footer__row'>
          <Col md={8} xs={24} sm={24}>
            <div className='footer__col'>
              <div className='footer__logo'>
                <img src={Logo} alt='Codey AI Logo' className='footer__logo-img' />
              </div>
              <p className='footer__text'>
                <a 
                  href="https://www.projectdosti.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '1.2em',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  By Project Dosti
                </a>
                <br/>
                <br/>
                Our mission is to empower remote and underserved communities through access to technology and digital literacy, fostering opportunities for economic development and personal growth.
              </p>
            </div>
          </Col>

          <Col md={8} xs={24} sm={24}>
            <div className='footer__col'>
              <h3 className='footer__title'>Featured links</h3>
              <ul className='featured-list'>
                <li className='featured-list__item'>
                  <Link className='featured-list__item-link' to='/'>
                    Home
                  </Link>
                </li>
                <li className='featured-list__item'>
                  <Link className='featured-list__item-link' to='/course-home'>
                    Courses
                  </Link>
                </li>
                <li className='featured-list__item'>
                  <Link className='featured-list__item-link' to='/about-us'>
                    About Us
                  </Link>
                </li>
                <li className='featured-list__item'>
                  <Link className='featured-list__item-link' to='/contact'>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </Col>

          <Col md={8}>
            <div className='footer__col'>
              <h3 className='footer__title'>Connect with us</h3>
              <div className='social-list'>
                <a 
                  href="https://www.linkedin.com/company/project-dosti/?originalSubdomain=in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title='LinkedIn'
                  className='social-btn'
                >
                  <LinkedinFilled className='social-icon' />
                </a>
                <a 
                  href="https://www.instagram.com/project.dosti/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title='Instagram'
                  className='social-btn'
                >
                  <InstagramOutlined className='social-icon' />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
