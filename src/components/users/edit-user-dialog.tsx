import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChangeUserPasswordTab } from "@/components/users/change-user-password-tab";
import { UpdateUserInformationTab } from "@/components/users/update-user-information-tab";
import { UpdateUserRolesTab } from "@/components/users/update-user-roles-tab";
import userService from "@/services/user.service";
import { User } from "@/types/user.type";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface EditUserDialogProps {
  userId: string;
}

export function EditUserDialog({ userId }: EditUserDialogProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => {
      try {
        const user = await userService.getUserById(userId);
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      {user && (
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit User: {user.fullName}</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="userInfo" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="userInfo">User Information</TabsTrigger>
              <TabsTrigger value="changePassword">Change Password</TabsTrigger>
              <TabsTrigger value="roles">Roles</TabsTrigger>
            </TabsList>
            <TabsContent value="userInfo" className="space-y-4">
              <UpdateUserInformationTab user={user} />
            </TabsContent>
            <TabsContent value="changePassword" className="space-y-4">
              <ChangeUserPasswordTab user={user} />
            </TabsContent>
            <TabsContent value="roles" className="space-y-4">
              <UpdateUserRolesTab user={user} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      )}
    </Dialog>
  );
}
