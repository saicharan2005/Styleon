import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function StripeReturnPage() {

    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const stripeSessionId = searchParams.get("session_id");

    useEffect(() => {

        if (stripeSessionId) {
            const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
            dispatch(capturePayment({ stripeSessionId: stripeSessionId, orderId: orderId })
            ).then((data) => {
                if (data?.payload?.success) {
                    sessionStorage.removeItem("currentOrderId");
                    window.location.href = "/shop/payment-success";
                }
            })
                
        }
    },[dispatch, stripeSessionId]);

    return (    
        <Card>
            <CardHeader>
                <CardTitle>Processing Payment ...Plese Wait</CardTitle>
            </CardHeader>
        </Card>
    );
}

export default StripeReturnPage;