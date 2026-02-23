import styles from "./SubHeader.module.scss";
import { useEffect } from "react";
import {
  genderOptions,
  statusOptions,
  type IFilterParams,
} from "../../modules/characters/characters.types";
import { Form, Input, Select } from "antd";
import { CustomButton } from "../CustomButton/CustomButton";
import buttonStyles from "../CustomButton/CustomButton.module.scss";

export interface ISubHeaderProps {
  filters: IFilterParams;
  setFilters: (f: IFilterParams) => void;
}

// Todo: turn this into filters component,pass filter config to it, it should consist of primarily
// filterkey, filterType and all the other props neccessary for specific stuff lice date / select and so on
export const SubHeader = ({ filters, setFilters }: ISubHeaderProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: IFilterParams) => {
    setFilters({
      name: (values.name || "").trim(),
      species: (values.species || "").trim(),
      status: values.status || undefined,
      gender: values.gender || undefined,
    });
  };

  useEffect(() => {
    form.setFieldsValue(filters);
  }, [filters, form]);

  return (
    <Form
      className={styles.subHeader}
      form={form}
      layout="inline"
      onFinish={onFinish}
      initialValues={filters}
    >
      <Form.Item name="name">
        <Input placeholder="NAME" allowClear />
      </Form.Item>
      <Form.Item name="species" rules={[{ min: 3 }]}>
        <Input placeholder="SPECIES" allowClear />
      </Form.Item>
      <Form.Item name="status">
        <Select placeholder="STATUS" allowClear options={statusOptions} />
      </Form.Item>
      <Form.Item name="gender">
        <Select placeholder="GENDER" allowClear options={genderOptions} />
      </Form.Item>
      <Form.Item>
        <CustomButton className={buttonStyles.searchBtn} htmlType="submit">
          SEARCH
        </CustomButton>
      </Form.Item>
      <Form.Item>
        <CustomButton
          className={buttonStyles.clearBtn}
          htmlType="button"
          onClick={() => {
            form.resetFields();
          }}
        >
          CLEAR
        </CustomButton>
      </Form.Item>
    </Form>
  );
};
