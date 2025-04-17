import Address from "@/components/shopping-view/address";
import Shoppingorders from "@/components/shopping-view/orders";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";




function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      {/* <div className="relative h-[350px] w-full overflow-hidden bg-gray-200">
  
      </div> */}
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8" >

        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>

            </TabsList>

            <TabsContent value="orders"> 
              <Shoppingorders/>
            </TabsContent>
            <TabsContent value="address">
              <Address/>
             </TabsContent>

          </Tabs>

        </div>


      </div>



    </div>
  )
  
}

export default ShoppingAccount;
