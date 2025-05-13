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
import roomFormShema from "../shema/roomFormShema";
import RoomService from "@/services/roomService";
import { useState } from "react";
import { AxiosError } from "axios";

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
    } catch (err: unknown) {
      const error = err as AxiosError<{
        message: string;
      }>;
      if (error.status === 403) {
        toast.error(error?.response?.data.message);
      }
    }
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <Card className="w-full max-w-sm mx-auto p-6 sm:p-10 mt-20 shadow-lg bg-sidebar rounded-lg">
      <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold text-foreground dark:text-foreground-dark">
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
                      className="w-full bg-backgroud  border border-gray-600 rounded-md px-4 py-2 transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full transition-all py-2 rounded-md  font-semibold">
              Créer
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default RoomForm;
