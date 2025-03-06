import Pagination from 'react-bootstrap/Pagination';
import React from 'react';
import classNames from 'classnames';


/**
 * Read more for styling
 * https://getbootstrap.com/docs/5.3/components/pagination/#sass-variables
 */

interface PaginationProps {
  count: number;          // Total number of pages
  current: number;        // Current active page
  displayCount?: number;   // Number of page items to display in the middle
  onPageChange: (page: number) => void;  // Callback for page change
  className?: string;
}

/**
 * 
 * @param count Total pages available in results
 * @param current Current Page number 
 * @param displayCount Number of active pages to show as a sequence
 * @param onPageChange useState function to capture the result
 * @param className Custom classes
 * @returns Returns Pagination Component
 * 
 * @example <Pagination current={page} count={applicationListData?.total_pages ? applicationListData?.total_pages : 1} onPageChange={setPage}></Pagination>
 */
const CustomPagination: React.FC<PaginationProps> = ({
  count,
  current,
  displayCount = 5,
  onPageChange,
  className
}) => {
  // Do not render pagination if total count is less than 2
  if (count <= 1) return null;

  // Calculate the range of page numbers to display
  const startPage = Math.max(1, current - Math.floor(displayCount / 2));
  const endPage = Math.min(count, startPage + displayCount - 1);

  // Adjust startPage if we are too close to the end
  const adjustedStartPage = Math.max(1, endPage - displayCount + 1);

  const pages = [];
  for (let i = adjustedStartPage; i <= endPage; i++) {
    pages.push(
      <Pagination.Item
        key={i}
        active={i === current}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className={classNames(
      className
    )}>
      {count > displayCount && (
        <>
          <Pagination.First onClick={() => onPageChange(1)} disabled={current === 1} />
          <Pagination.Prev onClick={() => onPageChange(current - 1)} disabled={current === 1} />
          {current - 2 > 1 && <>
            <Pagination.Item onClick={() => onPageChange(1)}>{1}</Pagination.Item>
            <Pagination.Ellipsis onClick={() => onPageChange(Math.max(1, current - displayCount))} />
          </>}

        </>
      )
      }

      {pages}

      {count > displayCount && (
        <>
          <Pagination.Ellipsis onClick={() => onPageChange(Math.max(1, current + displayCount))} />
          <Pagination.Item onClick={() => onPageChange(count)}>{count}</Pagination.Item>
          <Pagination.Next onClick={() => onPageChange(current + 1)} disabled={current === count} />
          <Pagination.Last onClick={() => onPageChange(count)} disabled={current === count} />
        </>
      )}
    </Pagination>
  );
};

export default CustomPagination;
