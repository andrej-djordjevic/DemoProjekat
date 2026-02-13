import { Form, type FormItemProps, Input, Select } from "antd";
import type { ReactNode } from "react";

export interface FieldRenderProps extends FormItemProps {
  editing: boolean;
  renderDisplay: () => ReactNode;
  fieldType?: "input" | "select";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export function FieldRender({
  editing,
  renderDisplay,
  fieldType = "input",
  options = [],
  name,
  className,
  placeholder,
}: FieldRenderProps) {
  if (!editing) return renderDisplay();

  return (
    <Form.Item noStyle name={name}>
      {fieldType === "select" ? (
        <Select
          options={options}
          placeholder={placeholder}
          className={className}
        />
      ) : (
        <Input placeholder={placeholder} className={className} />
      )}
    </Form.Item>
  );
}
