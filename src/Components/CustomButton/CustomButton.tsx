import React from "react";
import { Button, type ButtonProps } from "antd";
import styles from "./CustomButton.module.scss";

export const CustomButton: React.FC<ButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <Button {...props} className={className + " " + styles["custom-btn"]} />
  );
};
