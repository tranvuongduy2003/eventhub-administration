import { CreateRoleDialog } from "@/components/roles/create-role-dialog";
import { RolesTable } from "@/components/roles/roles-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import { Search, SearchIcon } from "lucide-react";
import { useState } from "react";

export default function RolesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-6 space-y-0">
        <div>
          <CardTitle className="text-2xl font-bold">Roles</CardTitle>
          <CardDescription>Manage user roles and permissions</CardDescription>
        </div>
        <CreateRoleDialog />
      </CardHeader>
      <CardContent>
        <div className="flex items-center pb-4 space-x-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={debounce((e) => setSearchTerm(e.target.value), 500)}
            />
          </div>
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        <RolesTable searchTerm={searchTerm} />
      </CardContent>
    </Card>
  );
}
