import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeading from '../../components/PageHeading';
import { useUniversity } from '../../hooks/useUniversity';
import { Form, Input, Button, Spin } from 'antd';

const AddUniversity = () => {
  const navigate = useNavigate();

  const { useAddNewUniversity } = useUniversity();
  const universityMutate = useAddNewUniversity();

  const [form] = Form.useForm();

  useEffect(() => {
    if (universityMutate.isSuccess) {
      form.resetFields();
      navigate('/manage-others-data/university-list');
    }
  }, [navigate, form, universityMutate.isSuccess]);

  const handleSave = (values) => {
    universityMutate.mutateAsync(values);
  };

  return (
    <>
      <section className="relative">
        <div className="container mx-auto px-5 py-24">
          <div className="mb-12 flex w-full flex-col text-center">
            <PageHeading title="ເພີ່ມຂໍ້ມູນມະຫາວິທະຍາໄລ" path={'/manage-others-data/university-list'} />
          </div>
          <div className="mx-auto">
            <Form
              layout="vertical"
              labelCol={{ span: 8 }}
              labelAlign="left"
              form={form}
              onFinish={handleSave}
              initialValues={{ laoName: 'ມລ ' }}
            >
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  vertical
                  name="englishName"
                  label="English Name"
                  rules={[{ required: true, message: 'English Name is required' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="vietName"
                  label="Viet Name"
                  rules={[{ required: true, message: 'Viet Name is required' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="laoName"
                  label="Lao Name"
                  rules={[{ required: true, message: 'Lao Name is required' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="shortcut"
                  label="Shortcut"
                  rules={[{ required: true, message: 'Shortcut is required' }]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="w-full space-x-4 p-2">
                <Form.Item>
                  <Button
                    type="primary"
                    className="bg-color-1 text-white"
                    htmlType="submit"
                    disabled={universityMutate.isPending}
                  >
                    {universityMutate.isPending ? <Spin size="small" /> : 'Save'}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddUniversity;
