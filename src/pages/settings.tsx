import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth";
import userService from "@/services/user.service";
import { UpdateUserDto } from "@/types/user.type";
import { Gender } from "@/enums/gender.enum";
import { ApiError } from "@/lib/api-service";

const profileFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  fullName: z
    .string()
    .min(1, { message: "Full name is required" })
    .max(100, { message: "Full name cannot exceed 100 characters" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  userName: z
    .string()
    .max(50, { message: "Username cannot exceed 50 characters" }),
  bio: z
    .string()
    .max(500, { message: "Bio cannot exceed 500 characters" })
    .optional(),
  gender: z.nativeEnum(Gender).optional(),
  dob: z
    .date()
    .refine((date) => !date || date < new Date(), {
      message: "Date of birth cannot be in the future",
    })
    .optional(),
  avatar: z.instanceof(File).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function Settings() {
  const { profile, setProfile } = useAuthStore();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      email: profile?.email || "",
      fullName: profile?.fullName || "",
      phoneNumber: profile?.phoneNumber || "",
      userName: profile?.userName || "",
      bio: profile?.bio || "",
      gender: profile?.gender,
      dob: profile?.dob,
      avatar: profile?.avatar
        ? new File([profile.avatar], "avatar.jpg")
        : undefined,
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      const updateData: UpdateUserDto = {
        ...data,
        id: profile?.id || "",
      };
      await userService.updateUser(updateData);
      if (profile) {
        setProfile({
          ...profile,
          ...data,
          avatar: data.avatar
            ? URL.createObjectURL(data.avatar)
            : profile.avatar,
        });
      }
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          (error as ApiError).message ||
          "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader className="space-y-2 border-b pb-6">
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 text-primary" />
            <CardTitle>Profile Settings</CardTitle>
          </div>
          <CardDescription>
            Update your personal information and manage your account settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative w-32 h-32">
                          {field.value ? (
                            <img
                              src={URL.createObjectURL(field.value)}
                              alt="Avatar"
                              className="w-32 h-32 rounded-full object-cover border-2 border-primary/20"
                            />
                          ) : (
                            <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center border-2 border-primary/20">
                              <span className="text-muted-foreground">
                                No avatar
                              </span>
                            </div>
                          )}
                        </div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(file);
                            }
                          }}
                          {...field}
                          value={undefined}
                          className="focus:ring-2 focus:ring-primary/20 max-w-[250px]"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Upload a profile picture in JPG, PNG or GIF format.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          disabled
                          className="bg-muted/50"
                        />
                      </FormControl>
                      <FormDescription>
                        Your email address cannot be changed.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Choose a unique username"
                          {...field}
                          className="focus:ring-2 focus:ring-primary/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          {...field}
                          className="focus:ring-2 focus:ring-primary/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+1 (555) 000-0000"
                          {...field}
                          className="focus:ring-2 focus:ring-primary/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        className="w-full min-h-[100px] p-3 rounded-md border focus:ring-2 focus:ring-primary/20 focus:outline-none resize-y"
                        placeholder="Tell us a little about yourself..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full p-2 rounded-md border focus:ring-2 focus:ring-primary/20 focus:outline-none bg-background"
                          value={field.value || ""}
                        >
                          <option value="">Select gender</option>
                          {Object.values(Gender).map((gender) => (
                            <option key={gender} value={gender}>
                              {gender.charAt(0).toUpperCase() +
                                gender.slice(1).toLowerCase()}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="focus:ring-2 focus:ring-primary/20"
                          value={
                            field.value
                              ? new Date(field.value)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? new Date(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button
                  type="submit"
                  className="min-w-[200px] bg-primary hover:bg-primary/90"
                >
                  Update Profile
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
