import React, { ReactNode } from 'react';
import { Col, Row } from 'antd';
import type { ColProps, RowProps } from 'antd/es/grid';
import './About.scss';
import dhairyaPhoto from '../../../assets/images/dhairyaphoto.jpg';
import priyalPhoto from '../../../assets/images/Priyalphoto.jpeg';
import karanPhoto from '../../../assets/images/karanphoto.jpeg';
import suhaanPhoto from '../../../assets/images/suhaanphoto.avif';
import ronitPhoto from '../../../assets/images/ronitphoto.jpg';
import abhijayPhoto from '../../../assets/images/abhijayphoto.jpg';

const About = () => {
  interface ExtendedRowProps extends RowProps {
    children?: ReactNode;
  }

  interface ExtendedColProps extends ColProps {
    children?: ReactNode;
  }

  return (
    <div className='about spacing-h-sm'>
      <div className='container about__intro text-center' style={{ backgroundColor: '#78aafa', padding: '1rem 0' }}>
        <h2 className='about__title'>About Us</h2>
        <p className='mt-8'>Dosti is a platform for learning and teaching digital skills utilizing AI.</p>
        <p>
          We are a student-led education organization for helping underpriveledged students learn digital skills.
        </p>
      </div>
      <div className='about__wrapper container'>
        <h3 className='about__sub-title mt-8' style={{ textAlign: 'center' }}>
          Our Team
        </h3>
        <Row gutter={[16, 24]} {...({} as ExtendedRowProps)}>
          <Col lg={6} {...({} as ExtendedColProps)}>
            <div className='column text-center about__member-item' style={{ backgroundColor: '#78aafa' }}>
              <div className='card'>
                <img
                  src={dhairyaPhoto}
                  alt='Dhairya Sibal'
                  style={{ width: '100%' }}
                  className='about__member-img'
                />
                <div className='container about__member-desc'>
                  <h2 className='mb-4 about__member-name text-3xl'>Dhairya Sibal</h2>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} {...({} as ExtendedColProps)}>
            <div className='column text-center about__member-item' style={{ backgroundColor: '#78aafa' }}>
              <div className='card'>
                <img
                  src={priyalPhoto}
                  alt='Priyal Mathur'
                  style={{ width: '100%' }}
                  className='about__member-img'
                />
                <div className='container about__member-desc'>
                  <h2 className='mb-4 about__member-name text-3xl'>Priyal Mathur</h2>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} {...({} as ExtendedColProps)}>
            <div className='column text-center about__member-item' style={{ backgroundColor: '#78aafa' }}>
              <div className='card'>
                <img
                  src={suhaanPhoto}
                  alt='Suhaan Khurana'
                  style={{ width: '100%' }}
                  className='about__member-img'
                />
                <div className='container about__member-desc'>
                  <h2 className='mb-4 about__member-name text-3xl'>Suhaan Khurana</h2>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} {...({} as ExtendedColProps)}>
            <div className='column text-center about__member-item' style={{ backgroundColor: '#78aafa' }}>
              <div className='card'>
                <img
                  src={karanPhoto}
                  alt='Karan Sachdeva'
                  style={{ width: '100%' }}
                  className='about__member-img'
                />
                <div className='container about__member-desc'>
                  <h2 className='mb-4 about__member-name text-3xl'>Karan Sachdeva</h2>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} {...({} as ExtendedColProps)}>
            <div className='column text-center about__member-item' style={{ backgroundColor: '#78aafa' }}>
              <div className='card'>
                <img
                  src={ronitPhoto}
                  alt='Ronit'
                  style={{ width: '100%' }}
                  className='about__member-img'
                />
                <div className='container about__member-desc'>
                  <h2 className='mb-4 about__member-name text-3xl'>Ronit</h2>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} {...({} as ExtendedColProps)}>
            <div className='column text-center about__member-item' style={{ backgroundColor: '#78aafa' }}>
              <div className='card'>
                <img
                  src={abhijayPhoto}
                  alt='Abhijay'
                  style={{ width: '100%' }}
                  className='about__member-img'
                />
                <div className='container about__member-desc'>
                  <h2 className='mb-4 about__member-name text-3xl'>Abhijay</h2>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default About;
