import "./SubHeader.scss";
import { useEffect } from "react";
import {
  genderOptions,
  statusOptions,
  type IFilterParams,
} from "../../modules/characters/characters.types";
import { Form, Input, Select } from "antd";
import { CustomButton } from "../CustomButton/CustomButton";

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
      className="subHeader"
      form={form}
      layout="inline"
      onFinish={onFinish}
      initialValues={filters}
    >
      <Form.Item name="name">
        <Input className="filterInput" placeholder="NAME" allowClear />
      </Form.Item>
      <Form.Item name="species" rules={[{ min: 3 }]}>
        <Input className="filterInput" placeholder="SPECIES" allowClear />
      </Form.Item>
      <Form.Item name="status">
        <Select
          className="filterInput"
          placeholder="STATUS"
          allowClear
          options={statusOptions}
        />
      </Form.Item>
      <Form.Item name="gender">
        <Select
          className="filterInput"
          placeholder="GENDER"
          allowClear
          options={genderOptions}
        />
      </Form.Item>
      <Form.Item>
        <CustomButton className="search-Btn" htmlType="submit">
          SEARCH
        </CustomButton>
      </Form.Item>
      <Form.Item>
        <CustomButton
          className="clear-Btn"
          htmlType="button"
          onClick={() => {
            form.resetFields();
          }}
        >
          CLEAR ALL FILTERS
        </CustomButton>
      </Form.Item>
    </Form>
  );
};
