import React from 'react';
import { Col, Row } from 'antd';
import type { ColProps, RowProps } from 'antd';
import Button from '../../../components/Button';
import './About.scss';

const About: React.FC = () => {
  return (
    <div className='about spacing-h-sm'>
      <div className='container about__intro text-center bg-slate-300 py-4  '>
        <h2 className='about__title '>Test</h2>
        <p className='mt-8'>Some text about who we are and what we do.</p>
        <p>
          We are education organizations for helping students more grow up. With technology and modern methods, we
          confidently are able to create more things for the worlds
        </p>
      </div>
      <h3 className='about__sub-title mt-8' style={{ textAlign: 'center' }}>
        Our Team
      </h3>
    
    </div>
  );
};

export default About;
