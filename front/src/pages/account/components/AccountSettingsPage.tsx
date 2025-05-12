// 📁 src/pages/account/AccountSettingsPage.tsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthService from "@/services/authService.ts";
import { toast, Toaster } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PasswordField from "@/pages/auth/components/PasswordField.tsx";
import { AxiosError } from "axios";

const profileSchema = z.object({
  username: z.string().min(1, "Le nom d'utilisateur est requis"),
  email: z.string().email("Email invalide"),
});

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Ancien mot de passe requis"),
    newPassword: z
      .string()
      .min(11, "Minimum 11 caractères")
      .regex(/[A-Z]/, "Au moins une majuscule")
      .regex(/[a-z]/, "Au moins une minuscule")
      .regex(/[0-9]/, "Au moins un chiffre")
      .regex(/[^A-Za-z0-9]/, "Au moins un caractère spécial"),
    confirmPassword: z.string().min(1, "Confirmation requise"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

const AccountSettingsPage = () => {
  const [, setUser] = useState<{ username: string; email: string } | null>(
    null
  );

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { username: "", email: "" },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const authService = new AuthService();

  useEffect(() => {
    authService.getUserConnect().then((data) => {
      setUser({
        username: data.username,
        email: data.email,
      });
      profileForm.setValue("username", data.username);
      profileForm.setValue("email", data.email);
    });
  }, []);

  const onSubmit = async (formData: z.infer<typeof profileSchema>) => {
    try {
      await authService.updateProfile({
        username: formData.username,
        email: formData.email,
      });
      toast.success("Profil mis à jour avec succès ✅");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;

      toast.error(
        error?.response?.data?.message ||
          "Erreur lors de la mise à jour du profil ❌"
      );
    }
  };

  const onChangePassword = async (formData: z.infer<typeof passwordSchema>) => {
    try {
      await authService.changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      toast.success(
        "Mot de passe mis à jour avec succès ✅. Veuillez vous reconnecter."
      );
      passwordForm.reset();
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(
        error?.response?.data?.message ||
          "Erreur lors du changement de mot de passe ❌"
      );
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="sm:max-w-full min-w-min mx-auto w-[30%] h-full">
        <div className="md:col-span-2 space-y-6">
          <div className="w-full">
            <h2 className="text-2xl font-bold">Account Settings</h2>
            <p className="text-muted-foreground text-sm">
              View and update your account details, profile and more.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Account Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={profileForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom d'utilisateur</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom d'utilisateur" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Enregistrer</Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changer le mot de passe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(onChangePassword)}
                  className="space-y-4"
                >
                  <FormField
                    control={passwordForm.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mot de passe actuel</FormLabel>
                        <FormControl>
                          <PasswordField
                            showPassword={false}
                            {...field}
                            className="w-full  border border-gray-600 rounded-md px-4 py-2 transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nouveau mot de passe</FormLabel>
                        <FormControl>
                          <PasswordField
                            showPassword={false}
                            {...field}
                            className="w-full   border border-gray-600 rounded-md px-4 py-2 transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-muted-foreground">
                          Minimum 11 caractères avec majuscule, minuscule,
                          chiffre et caractère spécial.
                        </p>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmer le mot de passe</FormLabel>
                        <FormControl>
                          <PasswordField
                            showPassword={false}
                            {...field}
                            className="w-full   border border-gray-600 rounded-md px-4 py-2 transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Mettre à jour le mot de passe</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AccountSettingsPage;
