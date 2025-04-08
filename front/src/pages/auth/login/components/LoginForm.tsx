import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordField from "../../components/PasswordField";
import schema from "../../utils/formSchema";
import { useContext, useState } from "react";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/authService";
import AuthContext from "@/context/AuthContext";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const LoginForm = () => {
  const navigate = useNavigate();
  const [authService] = useState(new AuthService());
  const authContext = useContext(AuthContext);
  const form = useForm<z.infer<typeof schema.formSchemaLogin>>({
    resolver: zodResolver(schema.formSchemaLogin),
    defaultValues: {
      email: "admin@example.com",
      password: "Admin123!!!",
    },
  });

  async function onSubmit(values: z.infer<typeof schema.formSchemaLogin>) {
    try {
      if (authContext === null) return <p>Erreur contexte ...</p>;
      const { setUser } = authContext;

      const resp = await authService.login(values);

      if (resp && resp.status === 200) {
        toast.success(resp.data.message);
        setUser(resp.data.user);
        if (resp.data.user.role === "admin") navigate("/admin");
      } else {
        toast.error("Une erreur est survenue");
      }
    } catch (error) {
      if (error.status === 403) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <Card className="p-10 w-[400px] mx-auto mt-20 shadow-lg bg-[#2C2F33] text-white rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold text-[#ffffff]">
            Connexion
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Votre email"
                      {...field}
                      className="w-full bg-[#23272A] text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md px-4 py-2 transition-all"
                    />
                  </FormControl>
                  <FormDescription className="text-gray-400 text-sm">
                    Entrez l'adresse email associée à votre compte.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Mot de passe</FormLabel>
                  <FormControl>
                    <PasswordField
                      showPassword={false}
                      {...field}
                      className="w-full bg-[#23272A] text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md px-4 py-2 transition-all"
                    />
                  </FormControl>
                  <FormDescription className="text-gray-400 text-sm">
                    Saisissez votre mot de passe pour accéder à votre compte.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between text-sm">
              <a
                href="/register"
                className="inline-block text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200"
              >
                Pas encore de compte ?{" "}
                <span className="underline">S'inscrire</span>
              </a>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-2 rounded-md text-white font-semibold">
              Se connecter
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default LoginForm;
