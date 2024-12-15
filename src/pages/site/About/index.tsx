import React from 'react';
import { Row, Col } from 'antd';
import type { ColProps, RowProps } from 'antd';
import './styles.scss';

const About: React.FC = () => {
  const rowProps: RowProps = {
    gutter: [16, 16],
    justify: 'center',
  };

  const colProps: ColProps = {
    xs: 24,
    sm: 12,
    md: 8,
  };

  return (
    <div className="about">
      <Row {...rowProps}>
        <Col {...colProps}>
          <div className="about-content">
            {/* About content */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default About;
