import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ShoppingorderDetailsView from "./order-details";


function Shoppingorders() {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow></TableRow>
            <TableCell>123456</TableCell>
            <TableCell>23/04/2020</TableCell>
            <TableCell>InProcess</TableCell>
            <TableCell>$1000</TableCell>
            <TableCell>
              <Dialog
                open={openDetailsDialog}
                onOpenChange={setOpenDetailsDialog}
              >
                <Button onClick={() => setOpenDetailsDialog(true)}>
                  View Details
                </Button>
                <ShoppingorderDetailsView />
              </Dialog>
            </TableCell>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Shoppingorders;
