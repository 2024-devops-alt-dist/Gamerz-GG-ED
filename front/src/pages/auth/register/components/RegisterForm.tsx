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
import { useState } from "react";
import AuthService from "@/services/authService";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import userI from "@/interfaces/userI";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [authService] = useState(new AuthService());
  const form = useForm<z.infer<typeof schema.formSchema>>({
    resolver: zodResolver(schema.formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      checkPassword: "",
      motivation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema.formSchema>) {
    const resp = await authService.register(values as userI);
    if (resp && resp.status === 201) {
      toast.success(
        resp.data.message +
          "Vous allez être rediriger vers la page de connexion !" ||
          "Inscription réussie ! Vous allez être rediriger vers la page de connexion !"
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      toast.error("Une erreur est survenue");
    }
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <Card className="p-10 w-[500px] mx-auto mt-5 shadow-lg dark:bg-background-dark  rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold text-foreground dark:text-foreground-dark">
            Inscription
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Pseudo</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Nom"
                      {...field}
                      className="w-full bg-backgroud border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md px-4 py-2 transition-all"
                    />
                  </FormControl>
                  <FormDescription className="text-foreground text-sm">
                    Choisissez un nom unique.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                      className="w-full bg-backgroud  border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md px-4 py-2 transition-all"
                    />
                  </FormControl>
                  <FormDescription className="text-foreground text-sm">
                    Entrez une adresse email valide.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="motivation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Motivation</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Pourquoi nous rejoindre ?"
                      {...field}
                      className="w-full bg-backgroud  border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md px-4 py-2 transition-all"
                    />
                  </FormControl>
                  <FormDescription className="text-foreground text-sm">
                    Expliquez en quelques mots votre motivation.
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
                      className="w-full bg-backgroud  border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md px-4 py-2 transition-all"
                    />
                  </FormControl>
                  <FormDescription className="text-foreground text-sm">
                    Minimum 11 caractères avec majuscule, minuscule, chiffre et
                    caractère spécial.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="checkPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">
                    Confirmation du mot de passe
                  </FormLabel>
                  <FormControl>
                    <PasswordField
                      showPassword={false}
                      {...field}
                      className="w-full bg-backgroud  border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md px-4 py-2 transition-all"
                    />
                  </FormControl>
                  <FormDescription className="text-foreground text-sm">
                    Saisissez à nouveau votre mot de passe.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full bg-green-600 hover:bg-green-700 transition-all py-2 rounded-md  font-semibold">
              S'inscrire
            </Button>

            <Button
              onClick={() => navigate("/login")}
              className="w-full mt-2 hover:bg-gray-600 transition-all py-2 rounded-md  font-semibold"
            >
              🔑 J'ai déjà un compte
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default RegisterForm;
