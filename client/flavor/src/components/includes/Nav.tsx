import { CartBtn } from "../ui/Buttons"
import ProductsIcon from '../../assets/products.png'
import OrderHistroyIcon from '../../assets/orders.png'
import logo from '../../assets/flavor.png'

const Nav = () => {
  return (
    <>
    <div className="p-5 mb-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
            <div>
                <img src={logo} width={80} alt="" />
            </div>
            <div className="flex flex-wrap justify-between items-center gap-10 border border-gray-200 px-5 p-3 rounded-full shadow-xl">
                <a href="#">
                    <img src={ProductsIcon} width={40} alt="" />
                </a>
                <CartBtn />
            </div>
            <div>
                <a href="#">
                    <img src={OrderHistroyIcon} width={40} alt="" />
                </a>
            </div>

        </div>
    </div>
    </>
  )
}

export default Nav