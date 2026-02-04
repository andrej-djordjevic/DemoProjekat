import React from 'react';

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
    <div className={className ?? 'pagination'}>
      <button onClick={onPrev} disabled={!hasPrev}>
        Prev
      </button>

      <span>
        Page {page} {totalPages ? `of ${totalPages}` : ''}
      </span>

      <button onClick={onNext} disabled={!hasNext}>
        Next
      </button>
    </div>
  );
};
