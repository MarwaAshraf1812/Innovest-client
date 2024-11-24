import { useLocation } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';
import { useContext, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import { AppContext } from '@/contexts/AppContext';

interface TableProps {
  columns: Array<{ label: string; field: string }>
  rowKey: string
  data: Array<any>
  loading: boolean
  updateData?: (data: any) => void
  deleteData?: (data: any) => void
}

const Table: React.FC<TableProps> = ({ columns = [], rowKey, data = [], loading, updateData, deleteData }) => {
  const location = useLocation();
  const { isModerating } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  const slicedData = location.pathname === '/admin-dashboard' ? (data || []).slice(0, 4) : data.slice(startIndex, endIndex);
  const isAdminDashboard = location.pathname === '/admin-dashboard';

  const columnsToDisplay = isAdminDashboard ? columns : [...columns, { label: 'Actions', field: 'actions' }];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            {columnsToDisplay.map((column, index) => (
              <th key={index} className="p-3 text-left bg-gray-100">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columnsToDisplay.length} className="p-3 text-center">
                <ImSpinner2 className="animate-spin text-3xl" />
              </td>
            </tr>
          ) : (
            slicedData.map((row, rowIndex) => (
              <tr key={row[rowKey]}>
                {columnsToDisplay.map((column, index) => (
                  <td key={index} className="p-3 text-sm sm:text-base w-[12%]">
                    {column.field === 'actions' ? (
                      <div>
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded mr-2 my-2"
                          onClick={() => updateData && updateData(row)}
                        >
                          Update
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded"
                          onClick={() => deleteData && deleteData(row)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      row[column.field]
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {!isAdminDashboard && (
        <Pagination
          totalItems={data.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};


export default Table;
