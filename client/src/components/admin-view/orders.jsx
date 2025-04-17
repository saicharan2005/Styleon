
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { useState } from "react";
import AdminorderDetailsView from "./order-details";

function AdminordersView() {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Order</CardTitle>
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
              <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                <Button onClick={() => setOpenDetailsDialog(true)}>View Details</Button>
                <AdminorderDetailsView/>
              </Dialog>
            </TableCell>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminordersView;
