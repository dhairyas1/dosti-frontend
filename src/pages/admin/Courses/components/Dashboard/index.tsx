import React, { useState } from 'react';
import { Button, Card, Table, Space, Statistic, Row, Col, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { useGetCoursesQuery, useDeleteCourseMutation } from '../../course.service';
import CreateCourse from '../CreateCourse';
import './Dashboard.scss';

const CourseDetailDashboard = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const adminId = useSelector((state: RootState) => state.auth.adminId);
  const { data: coursesData, isLoading } = useGetCoursesQuery({
    _q: '',
    _author: adminId,
    _page: 1,
    _limit: 10
  });
  const [deleteCourse] = useDeleteCourseMutation();

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: ['categoryId', 'name'],
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price}`,
    },
    {
      title: 'Access',
      dataIndex: 'access',
      key: 'access',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button 
            icon={<DeleteOutlined />} 
            danger
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleAddCourse = () => {
    setIsCreateModalVisible(true);
  };

  const handleEdit = (course: any) => {
    // TODO: Implement edit functionality
    console.log('Edit course:', course);
  };

  const handleDelete = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="course-dashboard">
      <Row gutter={[16, 16]} className="dashboard-stats">
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Courses"
              value={coursesData?.totalDocs || 0}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Courses"
              value={coursesData?.docs?.filter((course: any) => course.access === 'PUBLIC').length || 0}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Draft Courses"
              value={coursesData?.docs?.filter((course: any) => course.access === 'DRAFT').length || 0}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Students"
              value={0} // TODO: Implement student count
            />
          </Card>
        </Col>
      </Row>

      <Card 
        title="Course Management" 
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAddCourse}
          >
            Add Course
          </Button>
        }
        className="course-table-card"
      >
        <Table
          columns={columns}
          dataSource={coursesData?.docs}
          loading={isLoading}
          rowKey="_id"
          pagination={{
            total: coursesData?.totalDocs,
            pageSize: 10,
            showSizeChanger: false,
          }}
        />
      </Card>

      <CreateCourse />
    </div>
  );
};

export default CourseDetailDashboard;
