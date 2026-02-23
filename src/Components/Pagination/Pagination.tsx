import React from "react";
import { Pagination as AntdPagination } from "antd";
import styles from "./Pagination.module.scss";

export interface IPaginationProps {
  page: number;
  totalPages?: number;
  onChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<IPaginationProps> = ({
  page,
  totalPages = 1,
  onChange,
  className,
}) => {
  return (
    <div className={className ?? styles.pagination}>
      <AntdPagination
        current={page}
        total={totalPages}
        pageSize={1}
        onChange={onChange}
        showSizeChanger={false}
        hideOnSinglePage={true}
        showQuickJumper
        showTotal={() => `Page ${page} of ${totalPages}`}
        className={`${styles["custom-pagination-antd"]}`}
      />
    </div>
  );
};
