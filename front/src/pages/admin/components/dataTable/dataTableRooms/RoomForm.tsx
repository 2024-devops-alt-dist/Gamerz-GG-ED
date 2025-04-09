import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import roomFormShema from "../utils/roomFormShema";
import RoomService from "@/services/roomService";
import { useState } from "react";

interface RoomFormProps {
  refresh: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

const RoomForm = ({ refresh, setIsOpen }: RoomFormProps) => {
  const [roomService] = useState(new RoomService());

  const form = useForm<z.infer<typeof roomFormShema.roomFormShema>>({
    resolver: zodResolver(roomFormShema.roomFormShema),
    defaultValues: {
      game: "",
    },
  });

  async function onSubmit(value: z.infer<typeof roomFormShema.roomFormShema>) {
    try {
      const resp = await roomService.create(value);

      if (resp && resp.status === 201) {
        toast.success(resp.data.message);
        refresh();
        setIsOpen(false);
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
            Ajouter un salon
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="game"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Nom du salon</FormLabel>
                  <FormControl>
                    <Input
                      type="game"
                      placeholder="Nom du salon"
                      {...field}
                      className="w-full bg-[#23272A] text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md px-4 py-2 transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
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
            /> */}

            <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-2 rounded-md text-white font-semibold">
              Créer
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default RoomForm;
