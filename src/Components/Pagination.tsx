import React from "react";

type Props = {
  page: number;
  totalPages?: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
};

export const Pagination: React.FC<Props> = ({
  page,
  totalPages,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  className,
}) => {
  return (
    <div className={className ?? "pagination"}>
      {/* Todo: Nice simple custom pagination, for practice, implement ANTD pagination as well,
       you will often use it alognside, or as a part of the Table component, which is also very very commonly used  */}
      <button onClick={onPrev} disabled={!hasPrev}>
        Prev
      </button>

      <span>
        Page {page} {totalPages ? `of ${totalPages}` : ""}
      </span>

      <button onClick={onNext} disabled={!hasNext}>
        Next
      </button>
    </div>
  );
};
