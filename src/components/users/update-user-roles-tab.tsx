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
import roleService from "@/services/role.service";
import userService from "@/services/user.service";
import { Role } from "@/types/role.type";
import { User } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LucideLoader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  const [isRoleLoading, setIsRoleLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    (async () => {
      setIsRoleLoading(true);
      try {
        const { items } = await roleService.getPaginatedRoles({
          page: 1,
          size: 20,
        });
        setRoles(items);
      } catch (error) {
        console.log(error);
      } finally {
        setIsRoleLoading(false);
      }
    })();
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
      await userService.changeUserRoles(user.id, data.roles);

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
        {isRoleLoading ? (
          <div className="w-full flex items-center justify-center">
            <LucideLoader className="animate-spin m-8" />
          </div>
        ) : (
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
                          key={role.name}
                          control={form.control}
                          name="roles"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={role.name}
                                className="flex flex-row items-start space-x-3 space-y-0 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(role.name)}
                                    onCheckedChange={(checked) => {
                                      const newValue = checked
                                        ? [...field.value, role.name]
                                        : field.value?.filter(
                                            (value) => value !== role.name
                                          );
                                      field.onChange(newValue);
                                      setHasChanges(true);
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none flex-1">
                                  <FormLabel className="text-base capitalize">
                                    {role.name.toLowerCase()}
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
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
