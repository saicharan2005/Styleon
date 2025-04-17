import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";


function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.cartProducts);
   const totalCartAmount =
     cartItems && cartItems.length > 0
       ? cartItems.reduce(
           (sum, currItem) =>
             sum + (currItem.salePrice || currItem.price) * currItem.quantity,
           0
         )
       : 0;

  
  return (
    <div className="flex flex-col">
      {/* <div className="relative h-[350px] w-full overflow-hidden bg-gray-200">
        <img src={img}  className="h-full w-full object-center object-cover"/>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems && cartItems.length > 0
            ? cartItems.map((item) => (
                <UserCartItemsContent cartItem={item} key={item._id} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>

          <div className="mt-4 ">
            <Button className="w-full">checkout with PayPal</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
