
import ProductCard from '../ui/Card'
import CategoryFilters from '../ui/CategoryFilters'
import SearchInput from '../ui/SearchInput'

const Home = () => {
  return (
    <div className='px-4'>
        <div className='flex items-center justify-center my-5'>
            <SearchInput />
        </div>
        <div className="my-5">
            <CategoryFilters />
        </div>
        <ProductCard />
    </div>
  )
}

export default Home