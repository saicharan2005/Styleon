import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const intialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateproductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(intialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [imageLoadingState, SetImageLoadingState] = useState(false);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  const { toast } = useToast();

  const [currentEditedId, setCurrentEditedId] = useState(null);

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setFormData(intialFormData);
            setCurrentEditedId(null);
            toast({
              title: "Product edit successfully",
            });
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadImageUrl,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(intialFormData);
            toast({
              title: "Product Added successfully",
            });
          }
        });
  }

 
  function handleDeleteProduct(getCurrentProductId) {
    console.log(getCurrentProductId, "delete");
    dispatch(
       deleteProduct(getCurrentProductId)
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        
        toast({
          title: "Product deleted successfully",
        });
      }
    });
    
 }

  function isFormValid() {
    return Object.keys(formData).map(key=> formData[key] !== '').every((item)=>item)
  }



  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(productList, "product list");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem.id} // Ensure each child has a unique key
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setFormData={setFormData}
                handleDeleteProduct={handleDeleteProduct}
              />
            ))
          : null}
      </div>

      <Sheet
        open={openCreateproductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(intialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadImageUrl={uploadImageUrl}
            setUploadImageUrl={setUploadImageUrl}
            imageLoadingState={imageLoadingState}
            SetImageLoadingState={SetImageLoadingState}
          />
          <div className="py-6 ">
            <CommonForm
              onSubmit={onSubmit}
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
