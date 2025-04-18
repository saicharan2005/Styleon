import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createOrder } from "@/store/shop/order-slice";


import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";



function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.cartProducts);
  const { user } = useSelector((state) => state.auth);
  const [currentSeletedAddress, setCurrentSeletedAddress] = useState(null);
  const dispatch = useDispatch();
  const [isPaymentStart, setIsPaymentStart ] = useState(false);
  const { approvedUrl } = useSelector((state) => state.shopOrder);
  const { toast } = useToast()
  

  // console.log("address",currentSeletedAddress);
  

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currItem) =>
            sum + (currItem.salePrice || currItem.price) * currItem.quantity,
          0
        )
      : 0;

  

  function handleInitiatePaypalPayment() {


      if (cartItems.length === 0) {
        toast({
          title: " Your cart is empty",
          variant: "destructive",
        });
        return;
      }

    if(currentSeletedAddress===null) {
      toast({
        title: "Please select an address",    
        variant: "destructive", 
      });
      return; 

    }
  
    
  
  const orderData = {
    userId: user?.id,
    cartId: cartItems?._id,
    cartItems: cartItems.items.map((item) => ({
      productId: item?.productId,
      title: item?.title,
      price: item?.salePrice > 0 ? item?.salePrice : item?.price,
      quantity: item?.quantity,
    })),
    addressInfo: {
      addressId: currentSeletedAddress?._id,

      address: currentSeletedAddress?.address,
      city: currentSeletedAddress?.city,
      pincode: currentSeletedAddress?.pincode,
      phone: currentSeletedAddress?.phone,
      notes: currentSeletedAddress?.notes,
    },
    orderStatus: "pending",
    paymentMethod: "stripe",
    paymentStatus: "pending",
    totalAmount: totalCartAmount,
    orderDate: new Date(),
    orderUpdateDate: new Date(),
    stripeSessionId: "",
    paymentId: "",
    customerId: "",
  };
    
    // console.log("orderData",orderData);

    dispatch(createOrder(orderData)).then((data) => {
      console.log(data, " ");


      if(data?.payload?.success) {
        setIsPaymentStart(true);
      
          
      }
      else {
        setIsPaymentStart(false);
      }
      

    })
    
  }
  
 
  if (approvedUrl) {
    window.location.href = approvedUrl;
  }
    return (
      <div className="flex flex-col">
        {/* <div className="relative h-[350px] w-full overflow-hidden bg-gray-200">
        <img src={img}  className="h-full w-full object-center object-cover"/>
      </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
          <Address setCurrentSeletedAddress={setCurrentSeletedAddress} />
          <div className="flex flex-col gap-4">
            {cartItems && cartItems.items  && cartItems.items.length > 0
              ? cartItems.items.map((item) => (
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
              <Button onClick={handleInitiatePaypalPayment} className="w-full">
                checkout with PayPal
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ShoppingCheckout;
