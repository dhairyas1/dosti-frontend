import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { RootState } from '../../../store/store';
import { openAuthModal } from '../../auth.slice';
import './Home.scss';
import bannerImage from '../../../assets/images/banner.jpg';
import { EditOutlined, ApartmentOutlined, DingtalkOutlined } from '@ant-design/icons';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const startNowHandler = () => {
    if (isAuth) {
      navigate('/course-home');
    } else {
      dispatch(openAuthModal());
    }
  };

  const handleDostiClick = () => {
    window.open('https://www.projectdosti.net/', '_blank');
  };

  return (
    <div>
      <div className='banner mt-sm' style={{ 
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div className='banner__wrapper'>
          <div className='banner__wrapper-left'>
            <div className='banner__cta-section'>
              <h1 className='banner__title'>Where AI meets Learning</h1>
              <p className='banner__content'>
                Where young minds learn coding in a fun, interactive way. Tailored for middle schoolers, we fuse AI and
                education, crafting a safe platform that sparks creativity and innovation.
              </p>
              <div className='banner__cta--btns'>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button onClick={startNowHandler} className='banner__cta-start-now btn btn-md btn-secondary'>
                    Read. Watch. Learn. Improve.
                  </Button>
                  {isAuth ? (
                    <Button onClick={handleDostiClick} className='btn btn-md btn-tertiary'>Dosti</Button>
                  ) : (
                    <Link to='/course-home'>
                      <Button className='btn btn-md btn-tertiary'>Explore</Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='banner__wrapper-right'></div>
        </div>
      </div>

      {!isAuth && (
        <Fragment>
          <div className='our-benefits spacing-h-md '>
            <div className='container'>
              <h2 className='our-benefits__title'>Benefits of our courses</h2>
              <p className='our-benefits__sub-tittle'>
                The most engaging and interactive courses for free, tailored for young learners.
              </p>
              <div className='our-benefits__list'>
                <div className='our-benefits__item'>
                  <div className='our-benefits__item-img'>
                    <EditOutlined className='our-benefits__item-icon' />
                  </div>
                  <h3 className='our-benefits__item-title'>Interactive AI Assistance</h3>
                  <p className='our-benefits__item-content'>
                    24/7 access to a multilingual AI coding assistance, ensuring that learners can get help whenever they
                    need it.
                  </p>
                </div>
                <div className='our-benefits__item'>
                  <div className='our-benefits__item-img'>
                    <ApartmentOutlined className='our-benefits__item-icon' />
                  </div>
                  <h3 className='our-benefits__item-title'>Engaging and Fun</h3>
                  <p className='our-benefits__item-content'>
                    Our courses are designed to be engaging and fun, ensuring that learners stay motivated and excited to learn.
                  </p>
                </div>
                <div className='our-benefits__item'>
                  <div className='our-benefits__item-img'>
                    <DingtalkOutlined className='our-benefits__item-icon' />
                  </div>
                  <h3 className='our-benefits__item-title'>Easy to understand, Hard to Forget</h3>
                  <p className='our-benefits__item-content'>
                    With course videos taught in a simple and engaging way, learners can easily understand and remember the
                    concepts taught forever, just like riding a cycle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default HomePage;
