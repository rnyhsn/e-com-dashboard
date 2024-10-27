import { getCategories } from '@/utils/actions/category';

import CategoryRow from './CategoryRow';


const CategoryTable = async () => {

    const result = await getCategories();

  return (
    <div className="p-5 bg-bgLightSecondary dark:bg-bgDarkSecondary rounded-md text-sm">
    <table className="w-full text-left">
      <thead>
        <tr>
          <th>S.N.</th>
          <th>Name</th>
          <th>Description</th>
          <th>Slug</th>
          <th>Items</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {
        result.success && result?.payload && result.payload.map((category, index) => (
            <CategoryRow category={category} index={index} />
        )) 
      }
        
      </tbody>
    </table>
</div>
  )
}

export default CategoryTable
