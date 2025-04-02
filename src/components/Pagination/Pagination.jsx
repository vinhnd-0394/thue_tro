/* eslint-disable react/prop-types */
import { Link, createSearchParams } from "react-router-dom";
import classNames from "classnames";
import useQueryParams from "../../hooks/useQueryParams";

export default function Pagination({ totalCounts, siblings = 2 }) {
  const { queryParams, pathname } = useQueryParams();
  const currentPage = +queryParams.page || 1;
  const limit = +queryParams.limit || 20;
  const pageSize = Math.ceil(totalCounts / limit);

  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;

    const renderDotBefore = (index) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <span
            key={index}
            className="w-10 h-10 p-2 text-center bg-white border rounded shadow-sm"
          >
            ...
          </span>
        );
      }
      return null;
    };

    const renderDotAfter = (index) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <span
            key={index}
            className="w-10 h-10 p-2 text-center bg-white border rounded shadow-sm"
          >
            ...
          </span>
        );
      }
      return null;
    };
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;

        if (
          currentPage <= siblings * 2 + 1 &&
          pageNumber > currentPage + siblings &&
          pageNumber < pageSize - siblings + 1
        ) {
          return renderDotAfter(index);
        } else if (
          currentPage > siblings * 2 + 1 &&
          currentPage < pageSize - siblings * 2
        ) {
          if (pageNumber < currentPage - siblings && pageNumber > siblings) {
            return renderDotBefore(index);
          } else if (
            pageNumber > currentPage + siblings &&
            pageNumber < pageSize - siblings + 1
          ) {
            return renderDotAfter(index);
          }
        } else if (
          currentPage >= pageSize - siblings * 2 &&
          pageNumber > siblings &&
          pageNumber < currentPage - siblings
        ) {
          return renderDotBefore(index);
        }

        return (
          <Link
            to={{
              pathname: pathname,
              search: createSearchParams({
                ...queryParams,
                page: pageNumber.toString(),
              }).toString(),
            }}
            key={index}
            className={classNames(
              "cursor-pointer rounded border p-2 w-10 h-10 shadow-sm text-center",
              {
                "bg-red-500 text-white font-bold": pageNumber === currentPage,
                "border-gray-300 bg-white": pageNumber !== currentPage,
              }
            )}
          >
            {pageNumber}
          </Link>
        );
      });
  };
  return (
    <div className="flex items-center justify-center gap-1">
      {currentPage === 1 ? (
        <span className="h-10 p-2 text-sm bg-gray-300 border rounded shadow-md cursor-not-allowed">
          Trước
        </span>
      ) : (
        <Link
          to={{
            pathname: pathname,
            search: createSearchParams({
              ...queryParams,
              page: (currentPage - 1).toString(),
            }).toString(),
          }}
          className="h-10 p-2 text-sm font-medium bg-white border rounded shadow-md cursor-pointer"
        >
          Trước
        </Link>
      )}

      {renderPagination()}
      {currentPage === pageSize ? (
        <span className="h-10 p-2 text-sm bg-gray-300 border rounded shadow-md cursor-not-allowed">
          Sau
        </span>
      ) : (
        <Link
          to={{
            pathname: pathname,
            search: createSearchParams({
              ...queryParams,
              page: (currentPage + 1).toString(),
            }).toString(),
          }}
          className="h-10 p-2 text-sm font-medium bg-white border rounded shadow-md cursor-pointer"
        >
          Sau
        </Link>
      )}
    </div>
  );
}
