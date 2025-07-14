"use client"

import { useState, useMemo } from "react"

interface UsePaginationProps {
  totalItems: number
  itemsPerPage: number
}

export const usePagination = ({ totalItems, itemsPerPage }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const paginatedData = useMemo(() => {
    return { startIndex, endIndex }
  }, [startIndex, endIndex])

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const resetPage = () => {
    setCurrentPage(1)
  }

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    prevPage,
    resetPage,
    paginatedData,
  }
}
