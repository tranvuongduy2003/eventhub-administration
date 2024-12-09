import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const mockRoles: Role[] = [
  {
    id: "1",
    name: "ADMIN",
    displayName: "Administrator",
    description: "Full system access and management capabilities",
  },
  {
    id: "2",
    name: "USER",
    displayName: "User",
    description: "Standard user access",
  },
  {
    id: "3",
    name: "MODERATOR",
    displayName: "Moderator",
    description: "Content moderation capabilities",
  },
  {
    id: "4",
    name: "EVENT_MANAGER",
    displayName: "Event Manager",
    description: "Can create and manage events",
  },
];

interface Role {
  id: string;
  name: string;
  displayName: string;
  description?: string;
}

const roleFormSchema = z.object({
  roles: z.array(z.string()).min(1, "At least one role must be selected"),
});

type RoleFormValues = z.infer<typeof roleFormSchema>;

interface UpdateUserRolesTabProps {
  user: User;
}

export function UpdateUserRolesTab({ user }: UpdateUserRolesTabProps) {
  const { toast } = useToast();
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setRoles(mockRoles);
  }, []);

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      roles: user.roles?.length ? user.roles : [],
    },
  });

  const onSubmit = async (data: RoleFormValues) => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call
      await fetch(`/api/users/${user.id}/roles`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      toast({
        title: "Success",
        description: "User roles updated successfully",
      });
      setHasChanges(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to update user roles",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>User Roles</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              <FormField
                control={form.control}
                name="roles"
                render={() => (
                  <FormItem>
                    {roles.map((role) => (
                      <FormField
                        key={role.id}
                        control={form.control}
                        name="roles"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={role.id}
                              className="flex flex-row items-start space-x-3 space-y-0 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(role.id)}
                                  onCheckedChange={(checked) => {
                                    const newValue = checked
                                      ? [...field.value, role.id]
                                      : field.value?.filter(
                                          (value) => value !== role.id
                                        );
                                    field.onChange(newValue);
                                    setHasChanges(true);
                                  }}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none flex-1">
                                <FormLabel className="text-base">
                                  {role.displayName}
                                </FormLabel>
                                {role.description && (
                                  <p className="text-sm text-muted-foreground">
                                    {role.description}
                                  </p>
                                )}
                              </div>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t">
              <Button
                type="submit"
                disabled={!hasChanges || isLoading}
                className="min-w-[120px]"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
