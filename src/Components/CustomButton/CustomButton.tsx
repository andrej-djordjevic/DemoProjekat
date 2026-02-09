import React from "react";
import { Button, type ButtonProps } from "antd";
import "./CustomButton.scss";

export const CustomButton: React.FC<ButtonProps> = ({
  className,
  ...props
}) => {
  return <Button {...props} className={`custom-btn ${className} `} />;
};
