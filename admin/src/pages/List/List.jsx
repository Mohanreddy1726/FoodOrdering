import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import './List.css'

const List = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      if (response.data.success) {
        setList(response.data.foods)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Error fetching list')
      console.error(error)
    }
  }
  
  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id:foodId })
    if (response.data.success) {
      toast.success(response.data.message)
      fetchList() // Refresh the list after deletion
    } else {
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {Array.isArray(list) && list.map((item, index) => (
          <div className="list-table-format" key={index}>
            <img src={`${url}/images/`+item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={()=> removeFood(item._id)} className='cursor'>X</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
