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

export function LowStockTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Low Stock Items</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Wireless Earbuds</TableCell>
              <TableCell>5</TableCell>
              <TableCell>
                <Badge variant="destructive">Critical</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Smart Watch</TableCell>
              <TableCell>12</TableCell>
              <TableCell>
                <Badge variant="warning">Low</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phone Case</TableCell>
              <TableCell>15</TableCell>
              <TableCell>
                <Badge variant="warning">Low</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
