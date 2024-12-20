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
      <div className='container about__intro text-center' style={{ backgroundColor: '#132f4c', padding: '2.5rem', borderRadius: '8px', marginBottom: '3rem' }}>
        <h2 className='about__title' style={{ color: '#78aafa', marginBottom: '1.5rem', fontSize: '2.8rem' }}>About Us</h2>
        <p className='mt-8' style={{ fontSize: '1.8rem', color: '#f5f6fa', marginBottom: '1.5rem' }}>Dosti is a platform for learning and teaching digital skills utilizing AI.</p>
        <p style={{ fontSize: '1.6rem', color: '#f5f6fa', opacity: '0.9' }}>
          We are a student-led education organization for helping underpriveledged students learn digital skills.
        </p>
      </div>
      <div className='about__wrapper container'>
        <h3 className='about__sub-title' style={{ textAlign: 'center', color: '#78aafa', marginBottom: '3rem', fontSize: '2.4rem' }}>
          Our Team
        </h3>
        <Row gutter={[24, 32]} {...({} as ExtendedRowProps)}>
          <Col lg={8} sm={12} xs={24} {...({} as ExtendedColProps)}>
            <div className='column text-center about__member-item' style={{ backgroundColor: '#132f4c', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', height: '100%' }}>
              <div className='card'>
                <img
                  src={dhairyaPhoto}
                  alt='Dhairya Sibal'
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  className='about__member-img'
                />
                <div className='container about__member-desc' style={{ padding: '1.5rem' }}>
                  <h2 className='mb-4 about__member-name' style={{ color: '#78aafa', fontSize: '1.8rem' }}>Dhairya Sibal</h2>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={8} sm={12} xs={24} {...({} as ExtendedColProps)}>
            <div className='column text-center about__member-item' style={{ backgroundColor: '#132f4c', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', height: '100%' }}>
              <div className='card'>
                <img
                  src={priyalPhoto}
                  alt='Priyal Mathur'
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  className='about__member-img'
                />
                <div className='container about__member-desc' style={{ padding: '1.5rem' }}>
                  <h2 className='mb-4 about__member-name' style={{ color: '#78aafa', fontSize: '1.8rem' }}>Priyal Mathur</h2>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={8} sm={12} xs={24} {...({} as ExtendedColProps)}>
            <div className='column text-center about__member-item' style={{ backgroundColor: '#132f4c', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', height: '100%' }}>
              <div className='card'>
                <img
                  src={suhaanPhoto}
                  alt='Suhaan Khurana'
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  className='about__member-img'
                />
                <div className='container about__member-desc' style={{ padding: '1.5rem' }}>
                  <h2 className='mb-4 about__member-name' style={{ color: '#78aafa', fontSize: '1.8rem' }}>Suhaan Khurana</h2>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={8} sm={12} xs={24} {...({} as ExtendedColProps)}>
            <div className='column text-center about__member-item' style={{ backgroundColor: '#132f4c', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', height: '100%' }}>
              <div className='card'>
                <img
                  src={karanPhoto}
                  alt='Karan Sachdeva'
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  className='about__member-img'
                />
                <div className='container about__member-desc' style={{ padding: '1.5rem' }}>
                  <h2 className='mb-4 about__member-name' style={{ color: '#78aafa', fontSize: '1.8rem' }}>Karan Sachdeva</h2>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={8} sm={12} xs={24} {...({} as ExtendedColProps)}>
            <div className='column text-center about__member-item' style={{ backgroundColor: '#132f4c', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', height: '100%' }}>
              <div className='card'>
                <img
                  src={ronitPhoto}
                  alt='Ronit'
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  className='about__member-img'
                />
                <div className='container about__member-desc' style={{ padding: '1.5rem' }}>
                  <h2 className='mb-4 about__member-name' style={{ color: '#78aafa', fontSize: '1.8rem' }}>Ronit</h2>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={8} sm={12} xs={24} {...({} as ExtendedColProps)}>
            <div className='column text-center about__member-item' style={{ backgroundColor: '#132f4c', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', height: '100%' }}>
              <div className='card'>
                <img
                  src={abhijayPhoto}
                  alt='Abhijay'
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  className='about__member-img'
                />
                <div className='container about__member-desc' style={{ padding: '1.5rem' }}>
                  <h2 className='mb-4 about__member-name' style={{ color: '#78aafa', fontSize: '1.8rem' }}>Abhijay</h2>
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
