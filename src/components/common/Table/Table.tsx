import { AppContext } from "@/contexts/AppContext"
import { useContext, useEffect, useState } from "react"

interface TableProps {
  columns: Array< {label: string, field: string} >
  fetchData: Function
  rowKey: string
  updateApi: Function
  deleteApi: Function
}


const Table = ({ columns, fetchData, rowKey, updateApi, deleteApi }: TableProps) => {
  const [data, setData] = useState<any[]>([])
  const 

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await fetchData()
        setData(response)
      } catch (error) {
        console.error('Error fetching table data:', error)
      }

    }
  })
  return (

  )
}