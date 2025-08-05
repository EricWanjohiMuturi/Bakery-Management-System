import CartIcon from '../../assets/cart.png'

export const CartBtn = () => {
  return (
    <>
    <button className="group relative">
        <div className="absolute -right-2 -top-2 z-10">
            <div className="flex h-5 w-5 items-center justify-center">
            <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"
            ></span>
            <span
                className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
                >3</span
            >
            </div>
        </div>
        <div className="px-2">
            <img src={CartIcon} width={30} alt="" />
        </div>
        
    </button>
    </>
  )
}
