import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Radio, Row, Space, notification } from '../../../../../../../../../components/antd';
import type { RadioChangeEvent } from '../../../../../../../../../components/antd';
import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/store';
import { ILesson } from '../../../../../../../types/lesson.type';
import { useAddLessonMutation } from '../../../../course.service';

type ActivityType = 'media' | 'quiz' | 'assignment' | 'text' | 'survey' | 'scorm';
type AccessType = 'DRAFT' | 'FREE' | 'PAID';

interface AddLessonProps {
  courseId: string;
  activityType?: ActivityType;
  sectionId?: string;
  onSuccess?: () => void;
}

interface LessonFormData {
  name: string;
  content: string;
  access: AccessType;
  description: string;
}

const AddLesson: React.FC<AddLessonProps> = ({ courseId, activityType = 'media', sectionId, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const playerRef = useRef<ReactPlayer | null>(null);
  const [contentLink, setContentLink] = useState('');
  const [form] = Form.useForm<LessonFormData>();
  const [addLesson] = useAddLessonMutation();
  const [access, setAccess] = useState<AccessType>('FREE');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields();
    setContentLink('');
  };

  const onAccessChange = (e: RadioChangeEvent) => {
    setAccess(e.target.value as AccessType);
  };

  const onContentLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContentLink(e.target.value);
  };

  const onFinish = async (formData: LessonFormData) => {
    if (!sectionId) {
      notification.error({
        message: 'Section Required',
        description: 'Please select a section first'
      });
      return;
    }

    try {
      const lessonData: Omit<ILesson, '_id'> = {
        name: formData.name,
        content: formData.content,
        access: formData.access || 'PRIVATE',
        sectionId: sectionId,
        type: activityType,
        description: formData.description,
        videoLength: activityType === 'media' ? playerRef.current?.getDuration() || 0 : undefined,
        courseId: courseId,
        videoUrl: activityType === 'media' ? formData.content : undefined,
        order: 0
      };

      await addLesson(lessonData).unwrap();
      
      notification.success({
        message: 'Success',
        description: `${activityType} lesson added successfully`,
        duration: 2
      });

      setOpen(false);
      form.resetFields();
      setContentLink('');
      onSuccess?.();
    } catch (error: any) {
      notification.error({
        message: 'Failed to add lesson',
        description: error.data?.message || 'An error occurred while adding the lesson'
      });
    }
  };

  const getButtonText = () => {
    const typeMap: Record<ActivityType, string> = {
      media: 'Add Media',
      quiz: 'Add Quiz',
      assignment: 'Add Assignment',
      text: 'Add Text',
      survey: 'Add Survey',
      scorm: 'Add SCORM'
    };
    return typeMap[activityType];
  };

  return (
    <>
      <Button type='primary' onClick={showDrawer} icon={<PlusOutlined />}>
        {getButtonText()}
      </Button>
      <Drawer
        title={`Add ${activityType.charAt(0).toUpperCase() + activityType.slice(1)}`}
        width={812}
        onClose={onClose}
        open={open}
        destroyOnClose
      >
        <Row>
          <Col md={16}>
            <Form<LessonFormData> 
              form={form} 
              layout='vertical' 
              onFinish={onFinish}
              initialValues={{
                access: 'FREE' as AccessType
              }}
            >
              <Form.Item
                name='name'
                label='Name'
                rules={[{ required: true, message: 'Please enter a name' }]}
              >
                <Input placeholder={`Enter ${activityType} name`} />
              </Form.Item>

              {activityType === 'media' && (
                <Form.Item
                  name='content'
                  label='Media URL'
                  rules={[{ required: true, message: 'Please enter media URL' }]}
                >
                  <Input
                    onChange={onContentLinkChange}
                    placeholder='Enter media URL (YouTube, Vimeo, etc.)'
                  />
                </Form.Item>
              )}

              {activityType === 'text' && (
                <Form.Item
                  name='content'
                  label='Content'
                  rules={[{ required: true, message: 'Please enter content' }]}
                >
                  <Input.TextArea rows={4} placeholder='Enter text content' />
                </Form.Item>
              )}

              <Form.Item
                name='access'
                label='Access'
                rules={[{ required: true, message: 'Please select access level' }]}
              >
                <Radio.Group onChange={onAccessChange} value={access}>
                  <Space direction='vertical'>
                    <Radio value='DRAFT'>Draft</Radio>
                    <Radio value='FREE'>Free</Radio>
                    <Radio value='PAID'>Paid</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name='description'
                label='Description'
                rules={[{ required: true, message: 'Please enter a description' }]}
              >
                <Input.TextArea rows={4} placeholder='Enter description' />
              </Form.Item>

              {activityType === 'media' && contentLink && (
                <ReactPlayer
                  ref={playerRef}
                  url={contentLink}
                  width={0}
                  height={0}
                  config={{
                    youtube: {
                      playerVars: {
                        controls: 0,
                        modestbranding: 1,
                        showinfo: 0,
                        fs: 0
                      }
                    }
                  }}
                />
              )}

              <Form.Item>
                <Space>
                  <Button type='primary' htmlType='submit'>
                    Add {activityType.charAt(0).toUpperCase() + activityType.slice(1)}
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default AddLesson;
