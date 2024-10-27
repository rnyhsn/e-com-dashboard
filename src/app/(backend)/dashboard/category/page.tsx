import CategoryTable from '@/components/backend/mainBody/category/CategoryTable';
import PageTitle from '@/components/backend/mainBody/PageTitle';


const CategoryPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Category List" btn={true} path="category/add" />
      <CategoryTable />
    </div>
  )
}

export default CategoryPage
