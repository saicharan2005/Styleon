/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currItem) =>
            sum + (currItem.salePrice || currItem.price) * currItem.quantity,
          0
        )
      : 0;
  return (
    <SheetContent ClassName="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {
          // eslint-disable-next-line react/prop-types
          cartItems && cartItems.length > 0 ? (
            // eslint-disable-next-line react/jsx-key, react/prop-types
            cartItems.map((item) => <UserCartItemsContent cartItem={item} />)
          ) : (
            <div className="text-center text-muted-foreground">
              Your cart is empty.
            </div>
          )
        }
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false)
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;