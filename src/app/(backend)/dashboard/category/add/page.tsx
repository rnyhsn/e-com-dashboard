"use client";
import CategoryAddForm from '@/components/backend/mainBody/category/CategoryAddForm';
import PageTitle from '@/components/backend/mainBody/PageTitle';




const AddCategoryPage = () => {
    
  return (
    <div className="flex flex-col gap-5">
        <PageTitle title="Add Category" />
      <div className="w-[80%] mx-auto">
        <CategoryAddForm />
      </div>
    </div>
  )
}

export default AddCategoryPage
