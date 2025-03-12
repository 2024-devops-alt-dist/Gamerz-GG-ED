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
import AuthService from "@/services/AuthService";
import AuthContext from "@/context/AuthContext";

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
      if (authContext === undefined) return <p>Erreur contexte ...</p>;
      const { setUser } = authContext;

      const resp = await authService.login(values);

      if (resp && resp.status === 200) {
        toast.success(resp.data.message);

        setTimeout(() => {
          navigate("/");
          setUser(resp.data.user);
        }, 2000);
      } else {
        toast.error("Une erreur est survenue");
      }
    } catch (error) {
      console.log(error.response);
      if (error.status === 403) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div>
      <Toaster position="top-right" richColors />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  Entrez l’adresse email associée à votre compte.
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
                  Saisissez votre mot de passe pour accéder à votre compte.
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

export default LoginForm;
