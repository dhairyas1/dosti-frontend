import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import './styles.scss';

const StartLearning: React.FC = () => {
  return (
    <div className="start-learning">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Start Learning">
            <Button type="primary">Begin Course</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StartLearning; 