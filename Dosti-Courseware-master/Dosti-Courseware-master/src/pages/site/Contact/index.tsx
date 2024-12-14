import { Button, Checkbox, Form, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import React from 'react';
import './Contact.scss';

const { TextArea } = Input;

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
  remember: boolean;
}

const Contact: React.FC = () => {
  const [form] = Form.useForm<ContactFormValues>();

  const handleSubmit = (values: ContactFormValues) => {
    console.log('Form values:', values);
    // Add your form submission logic here
  };

  return (
    <div className='contact'>
      <div className='container my-24 mx-auto md:px-6 spacing-h-sm'>
        <section className='mb-32 text-center'>
          <div className='mx-auto max-w-[700px] md:px-3'>
            <h2 className='contact__title mb-12 text-3xl font-bold'>Contact us</h2>
            
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input 
                  placeholder='Enter your name'
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input 
                  placeholder='Enter your email'
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <TextArea 
                  placeholder='Your message'
                  rows={4}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  icon={<SendOutlined />}
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
