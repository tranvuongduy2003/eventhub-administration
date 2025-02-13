import { PermissionsTable } from "@/components/permissions/permissions-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PermissionsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-6 space-y-0">
        <div>
          <CardTitle className="text-2xl font-bold">Permissions</CardTitle>
          <CardDescription>
            Manage system permissions and access control
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <PermissionsTable />
      </CardContent>
    </Card>
  );
}
