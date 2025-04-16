import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/images/banner01.avif";
import bannerTwo from "../../assets/images/banner02.avif";
import bannerThree from "../../assets/images/banner03.avif";
import bannerFour from "../../assets/images/banner04.avif";
import { Airplay, BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightningIcon, Heater, Images, Section, Shirt, ShirtIcon, ShoppingBasket, UmbrellaIcon, WashingMachine, WatchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { use, useEffect, useState } from "react";
import { fetchAllFilteredProducts, fetchProductsDetails } from "@/store/shop/products-slice";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

 const categoriesWithIcon=[
      { id: "men", label: "Men" ,icon:ShirtIcon},
      { id: "women", label: "Women" ,icon:CloudLightningIcon},
      { id: "kids", label: "Kids" ,icon:BabyIcon},
      { id: "accessories", label: "Accessories",icon:WatchIcon },
      { id: "footwear", label: "Footwear" ,icon:UmbrellaIcon},
 ]
  
const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];
  


function ShoppingHome() {
  const slides = [bannerOne, bannerFour, bannerTwo, bannerThree];
  const { productList ,productDetails} = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);


  function handleNavigateToListingPage(getCurrentOption, section) {
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section]:[getCurrentOption.id]
    }
    sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    navigate(`/shop/listing`);

  }


    function handleGetProductDetails(getCurrentProductId) {
      //  console.log(getCurrentProductId);
       dispatch(fetchProductsDetails(getCurrentProductId ));
    }
  
  
  
   function handleAddtoCart(getCurrentProductId) {
      console.log(getCurrentProductId);
      dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then(data => {
        if(data?.payload?.success) {
          dispatch(fetchCartItems({ userId: user?.id }))
          toast({
            title: "Product Added to Cart",
          });
          
        }
      }
      );
      
        
    }
  
    
 


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [slides.length]);


  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams:[], sortParams:'price-lowtohigh' }));
  }, [dispatch])
  

   useEffect(() => {
     if (productDetails != null) {
       setOpenDetailsDialog(true);
     }
   }, [productDetails]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${
              index === currentSlide ? `opacity-100` : `opacity-0`
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30"
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section className="py-12 bg-gray-40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={categoryItem.id}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 text-primary mb-4" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={brandItem.id}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 text-primary mb-4" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem.id}
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;