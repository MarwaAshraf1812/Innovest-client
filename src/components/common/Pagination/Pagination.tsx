import { Button } from "@/components/ui/button"

interface PaginationProps {
  totalItems: number
  currentPage: number
  pageSize: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize)
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  return (
  <div className="flex justify-between items-center mt-4">
    <Button onClick={() => goToPage(currentPage - 1)} className="px-4 py-2 bg-main_blue text-white rounded" disabled={currentPage === 1}>
      Previous
    </Button>
    <span className="text-gray-600">
      Page {currentPage} of {totalPages}
    </span>
    <Button onClick={() => goToPage(currentPage + 1)} className="px-4 py-2 bg-main_blue text-white rounded" disabled={currentPage === totalPages}>
      Next
    </Button>
  </div>
  )
}

export default Pagination
