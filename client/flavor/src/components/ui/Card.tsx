import ProductImage from '../../assets/cupcake.jpg'

const ProductCard = () => {
  return (
    <>

    <div className="sm:w-32 md:w-60 h-80 bg-white shadow-sm rounded-3xl text-black p-4 flex flex-col items-start justify-center gap-3 hover:bg-red-50 hover:shadow-2xl hover:shadow-red-400 transition-shadow">
        <div className="sm:w-full md:w-52 h-60 bg-sky-300 rounded-2xl overflow-hidden">
            <img 
                src={ProductImage} 
                alt="Product" 
                className="sm:w-full h-full object-cover object-center"
            />
        </div>
        <div className="text-center">
            <p className="font-bold text-2xl text-center text-indigo-900">Cupcake</p>
            <p className="font-bold text-center text-gray-500 mt-2">Ksh. 40</p>
        </div>
        <button className="w-auto bg-red-500 font-extrabold p-2 px-6 rounded-xl hover:bg-red-700 transition-colors text-white">Place Order</button>
    </div>
    
    </>
  )
}

export default ProductCard