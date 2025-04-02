import { useMemo } from "react";

const usePagination = ({
  totalCounts = 1,
  currentPage = 1,
  siblings = 2,
  limit = 20,
}) => {
  const paginate = useMemo(() => {
    let totalPages = Math.ceil(totalCounts / limit);
    if (!currentPage || !totalPages) return null;
    let prevPage = currentPage === 1 ? null : currentPage - 1,
      nextPage = currentPage === totalPages ? null : currentPage + 1,
      paginationItems = [1];
    if (currentPage === 1 && totalPages === 1)
      return { currentPage, prevPage, nextPage, paginationItems };
    if (currentPage > siblings + 2) paginationItems.push("...");
    let siblingRange = siblings,
      startSibling = currentPage - siblingRange,
      endSibling = currentPage + siblingRange;
    for (
      let i = startSibling > 2 ? startSibling : 2;
      i <= Math.min(totalPages, endSibling);
      i++
    )
      paginationItems.push(i);
    if (endSibling + 1 < totalPages) paginationItems.push("...");
    if (endSibling < totalPages) paginationItems.push(totalPages);
    return { currentPage, prevPage, nextPage, paginationItems, totalPages };
  }, [totalCounts, currentPage, siblings, limit]);

  return paginate;
};

export default usePagination;
