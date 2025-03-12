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
import authService from "@/services/authService";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [authS] = useState(new authService());
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
    const resp = await authS.register(values);
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
    <div>
      <Toaster position="top-right" richColors />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pseudo</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Nom" {...field} />
                </FormControl>
                <FormDescription>Choisissez un nom unique.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Email" {...field} />
                </FormControl>
                <FormDescription>
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
                <FormLabel>Motivation</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Motivation" {...field} />
                </FormControl>
                <FormDescription>
                  Dites-nous en quelques mots pourquoi vous souhaitez rejoindre
                  notre communauté.
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
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <PasswordField showPassword={false} {...field} />
                </FormControl>
                <FormDescription>
                  Créez un mot de passe sécurisé (au moins 11 caractères, avec
                  majuscules, minuscules, caratère spécial et chiffres).
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
                <FormLabel>Confirmation du mot de passe</FormLabel>
                <FormControl>
                  <PasswordField showPassword={false} {...field} />
                </FormControl>
                <FormDescription>
                  Saisissez à nouveau votre mot de passe.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
