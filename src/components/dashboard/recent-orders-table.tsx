import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function RecentOrdersTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>#ORD-1234</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>
                <Badge variant="success">Delivered</Badge>
              </TableCell>
              <TableCell>$234.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>#ORD-1235</TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>
                <Badge variant="warning">Processing</Badge>
              </TableCell>
              <TableCell>$178.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>#ORD-1236</TableCell>
              <TableCell>Bob Wilson</TableCell>
              <TableCell>
                <Badge>Pending</Badge>
              </TableCell>
              <TableCell>$425.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
