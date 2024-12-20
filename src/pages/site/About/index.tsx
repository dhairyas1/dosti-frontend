import React from 'react';
import './About.scss';

const About = () => {
  return (
    <div className='about spacing-h-sm'>
      <div className='container about__intro text-center' style={{ backgroundColor: '#132f4c', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        <h2 className='about__title' style={{ color: '#78aafa', marginBottom: '1.5rem', fontSize: '2.8rem' }}>About Us</h2>
        <div style={{ textAlign: 'left', color: '#f5f6fa' }}>
          <p style={{ fontSize: '1.6rem', marginBottom: '2rem', lineHeight: '1.6' }}>
            <strong style={{ color: '#78aafa' }}>Project Dosti</strong> is a non-profit initiative that focuses on bridging the digital divide by providing <strong style={{ color: '#78aafa' }}>digital literacy</strong> and <strong style={{ color: '#78aafa' }}>access to devices</strong> to underprivileged communities. The project aims to empower individuals by enabling them to use technology effectively for education, employment, and personal growth.
          </p>

          <h3 style={{ color: '#78aafa', fontSize: '2rem', marginBottom: '1.5rem', marginTop: '2.5rem' }}>Our Approach</h3>
          
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#78aafa', fontSize: '1.8rem', marginBottom: '1rem' }}>1. Digital Literacy Programs</h4>
            <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
              <li style={{ fontSize: '1.4rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#78aafa', marginRight: '1rem' }}>•</span>
                Conduct workshops and training sessions to teach basic and advanced digital skills.
              </li>
              <li style={{ fontSize: '1.4rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#78aafa', marginRight: '1rem' }}>•</span>
                Include topics like using productivity software, internet safety, and cybercrime prevention.
              </li>
              <li style={{ fontSize: '1.4rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#78aafa', marginRight: '1rem' }}>•</span>
                Develop custom syllabi tailored to different age groups and needs.
              </li>
            </ul>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#78aafa', fontSize: '1.8rem', marginBottom: '1rem' }}>2. Hardware Implementation Drives</h4>
            <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
              <li style={{ fontSize: '1.4rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#78aafa', marginRight: '1rem' }}>•</span>
                Collect, refurbish, and distribute devices like laptops, tablets, and smartphones to underserved communities.
              </li>
              <li style={{ fontSize: '1.4rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#78aafa', marginRight: '1rem' }}>•</span>
                Partner with donors and organizations to source the necessary hardware.
              </li>
              <li style={{ fontSize: '1.4rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#78aafa', marginRight: '1rem' }}>•</span>
                Ensure the devices are functional and preloaded with essential tools and software.
              </li>
            </ul>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#78aafa', fontSize: '1.8rem', marginBottom: '1rem' }}>3. Programming and Coding Courses</h4>
            <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
              <li style={{ fontSize: '1.4rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#78aafa', marginRight: '1rem' }}>•</span>
                Provide beginner-friendly coding courses to spark interest in technology.
              </li>
              <li style={{ fontSize: '1.4rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#78aafa', marginRight: '1rem' }}>•</span>
                Focus on languages and platforms that can help participants become job-ready.
              </li>
              <li style={{ fontSize: '1.4rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#78aafa', marginRight: '1rem' }}>•</span>
                Organize advanced workshops for participants interested in software development and IT careers.
              </li>
            </ul>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a 
              href="https://www.projectdosti.net" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-block',
                padding: '1rem 2rem',
                backgroundColor: '#78aafa',
                color: '#0A1929',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '1.6rem',
                fontWeight: 'bold',
                transition: 'transform 0.2s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Visit Project Dosti Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
