import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit } from "lucide-react";
import { useState } from "react";
import { UpdateRoleInformationTab } from "./update-role-information-tab";
import { UpdateRolePermissionsTab } from "./update-role-permissions-tab";
import { Role } from "@/types/role.type";

interface EditRoleDialogProps {
  role: Role;
}

export function EditRoleDialog({ role }: EditRoleDialogProps) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSelectedRole(role)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Role</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Role Information</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="space-y-4">
            <UpdateRoleInformationTab selectedRole={selectedRole} />
          </TabsContent>
          <TabsContent value="permissions" className="space-y-4">
            <UpdateRolePermissionsTab selectedRole={selectedRole} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
