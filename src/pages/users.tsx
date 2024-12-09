import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UsersTable } from "@/components/users/users-table";
import { Gender } from "@/enums/gender.enum";
import { UserStatus } from "@/enums/user-status.enum";
import { User } from "@/types/user.type";
import { PlusIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

const mockUsers: User[] = [
  {
    id: "1",
    fullName: "John Doe",
    email: "john.doe@example.com",
    userName: "johndoe",
    phoneNumber: "+1234567890",
    status: UserStatus.Active,
    bio: "Software Engineer",
    gender: Gender.Male,
    dob: new Date("1990-01-01"),
    avatar: "",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
    roles: ["USER"],
  },
  {
    id: "2",
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    userName: "janesmith",
    phoneNumber: "+1987654321",
    status: UserStatus.Active,
    bio: "Product Manager",
    gender: Gender.Female,
    dob: new Date("1992-05-15"),
    avatar: "",
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
    roles: ["USER", "ADMIN"],
  },
  {
    id: "3",
    fullName: "Mike Johnson",
    email: "mike.j@example.com",
    userName: "mikej",
    phoneNumber: "+1122334455",
    status: UserStatus.Inactive,
    bio: "UI/UX Designer",
    gender: Gender.Male,
    dob: new Date("1988-12-25"),
    avatar: "",
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03"),
    roles: ["USER"],
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <div>
          <CardTitle className="text-2xl font-bold">Users</CardTitle>
          <CardDescription>
            Manage user accounts and permissions
          </CardDescription>
        </div>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create User
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 pb-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <UsersTable users={users} />
      </CardContent>
    </Card>
  );
}
