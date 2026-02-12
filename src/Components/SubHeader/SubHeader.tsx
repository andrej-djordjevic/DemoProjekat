import "./SubHeader.scss";
import { useEffect } from "react";
import {
  genderOptions,
  statusOptions,
  type FilterParams,
} from "../../modules/characters";
import { Form, Input, Select } from "antd";
import { CustomButton } from "../CustomButton/CustomButton";

export interface ISubHeaderProps {
  filters: FilterParams;
  setFilters: (f: FilterParams) => void;
}

// Todo: turn this into filters component,pass filter config to it, it should consist of primarily
// filterkey, filterType and all the other props neccessary for specific stuff lice date / select and so on
export const SubHeader = ({ filters, setFilters }: ISubHeaderProps) => {
  // Why do we set filters here as well as in the parent component can't we just reuse the filters values from the props?

  const [form] = Form.useForm();

  const onFinish = (values: FilterParams) => {
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
    // Use antd form it has all the good stuff like custom field rules, validation of form fields, helpers like set data clear data etc etc
    // for more control
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
      <Form.Item name="species">
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
    </Form>
  );
};
