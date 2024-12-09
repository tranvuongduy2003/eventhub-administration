import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Role } from "@/types/role.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

interface UpdateRoleInformationTabProps {
  selectedRole: Role | null;
}

const updateRoleSchema = z.object({
  name: z.string().min(1, "Role name is required"),
  displayName: z.string().min(1, "Display name is required"),
  description: z.string().optional(),
});

type RoleFormValues = z.infer<typeof updateRoleSchema>;

export function UpdateRoleInformationTab({
  selectedRole,
}: UpdateRoleInformationTabProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleFormValues>({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: {
      name: selectedRole?.name || "",
      displayName: selectedRole?.displayName || "",
      description: selectedRole?.description || "",
    },
  });

  const onSubmit = (data: RoleFormValues) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Role Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="displayName">Display Name</Label>
        <Input id="displayName" {...register("displayName")} />
        {errors.displayName && (
          <p className="text-sm text-red-500">{errors.displayName.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
      <Button type="submit">Update Role</Button>
    </form>
  );
}
