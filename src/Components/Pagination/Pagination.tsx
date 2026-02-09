import React from "react";
import { Pagination as AntdPagination } from "antd";
import "./Pagination.scss";

interface Props {
  page: number;
  totalPages?: number;
  onChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<Props> = ({
  page,
  totalPages = 1,
  onChange,
  className,
}) => {
  return (
    <div className={className ?? "pagination"}>
      <AntdPagination
        current={page}
        total={totalPages}
        pageSize={1}
        onChange={onChange}
        showSizeChanger={false}
        hideOnSinglePage={true}
        showQuickJumper
        showTotal={() => `Page ${page} of ${totalPages}`}
        className={"custom-pagination-antd"}
      />
    </div>
  );
};
