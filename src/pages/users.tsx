import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CreateUserDialog } from "@/components/users/create-user-dialog";
import { UserExcelOperationsDialog } from "@/components/users/user-excel-operations-dialog";
import { UsersTable } from "@/components/users/users-table";
import { Search, SearchIcon } from "lucide-react";
import { useState } from "react";
import { debounce } from "lodash";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-6 space-y-0">
        <div>
          <CardTitle className="text-2xl font-bold">Users</CardTitle>
          <CardDescription>
            Manage user accounts and permissions
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <UserExcelOperationsDialog />
          <CreateUserDialog />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center pb-4 space-x-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              onChange={debounce((e) => setSearchTerm(e.target.value), 500)}
            />
          </div>
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        <UsersTable searchTerm={searchTerm} />
      </CardContent>
    </Card>
  );
}
