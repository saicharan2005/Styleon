import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { addressFormControls } from "@/config";
import CommonForm from "../common/form";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, deleteAddress, editAddress, fetchAllAddress } from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "@/hooks/use-toast";


const initialAddressFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};
function Address({ setCurrentSeletedAddress }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { addressList } = useSelector((state) => state.shopAddress);
  const [currentAddressId, setCurrentAddressId] = useState(null);
  const { toast } = useToast();

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList?.length >= 3 && currentAddressId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can only add 3 addresses",
        variant: "destructive",
      });
      return;
    }

    currentAddressId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addessId: currentAddressId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress({ userId: user?.id }));
            setCurrentAddressId(null);
            setFormData(initialAddressFormData);
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(
          addAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllAddress({ userId: user?.id }));
            setFormData(initialAddressFormData);
            toast({
              title: "Address added successfully",
            });
          }
        });
  }

  function handleDeleteAddress(getAddressInfo) {
    // console.log("Delete address:", getAddressInfo);
    dispatch(
      deleteAddress({
        userId: user?.id,
        addressId: getAddressInfo?._id,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress({ userId: user?.id }));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  }
  function handleEditAddress(getAddressInfo) {
    setCurrentAddressId(getAddressInfo?._id);
    setFormData({
      ...formData,
      address: getAddressInfo?.address,
      city: getAddressInfo?.city,
      pincode: getAddressInfo?.pincode,
      phone: getAddressInfo?.phone,
      notes: getAddressInfo?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddress({ userId: user?.id }));
  }, [dispatch, user?.id]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2   gap-4">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddress, index) => (
              <AddressCard
                key={index}
                addressInfo={singleAddress}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
                setCurrentSeletedAddress={setCurrentSeletedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        {currentAddressId !== null ? "EditAddress" : "Add New Address"}
      </CardHeader>

      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentAddressId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
