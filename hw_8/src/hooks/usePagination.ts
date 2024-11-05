import { useState } from "react";

interface Props<T> {
  data?: T[];
  itemsPerPage: number;
}

export default function usePagination<T>({ data, itemsPerPage }: Props<T>) {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const startIndex = currentPage * itemsPerPage;
  const currentData = data?.slice(startIndex, startIndex + itemsPerPage) || [];
  const pageCount = Math.ceil((data?.length || 0) / itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return { currentPage, currentData, pageCount, handlePageChange };
}
