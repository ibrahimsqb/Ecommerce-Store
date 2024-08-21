import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import {useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery} from '../../redux/api/categoryApiSlice'
import categoryForm from '../../components/categoryForm'

const CategoryList = () => {

    const {data: categories} = useFetchCategoriesQuery();
    const [name, setName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [updateName, setUpdateName] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    
    const [createCAtegory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()

  return <div className='ml-[10rem] flex flex-col md:flex-row'>
    {/*Admin Menu */}
      <div className='md:w-3/4 p-3'>
          <div className='h-12'>Manage Categories</div>
          <categoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />
          <br />
          <hr />
      </div>

  </div>
}

export default CategoryList