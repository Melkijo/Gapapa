"use client";
import { PlusIcon } from "@/components/icon";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
const formSchema = z.object({
  storyDate: z.string(),
  feel: z.string(),
  story: z.string(),
  photo: z.any(),
  userId: z.string(),
  recommendation: z.string(),
});

async function addStory(data: z.infer<typeof formSchema>) {
  console.log(data);
  try {
    const docRef = await addDoc(collection(db, "stories"), {
      storyDate: data.storyDate,
      feel: data.feel,
      story: data.story,
      photo: data.photo,
      userId: data.userId,
    });
    console.log("Document written with ID: ", docRef.id);
    alert("Story added!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default function ButtonAddStory() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storyDate: new Date().toDateString(),
      userId: "1",
      recommendation: "tes",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setLoading(true);

    addStory(values);
  }
  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-[250px] h-[160px] bg-gray-200 flex justify-center items-center border border-gray-400 rounded-lg hover:bg-gray-300">
          <PlusIcon />
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="flex">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 pe-4"
            >
              <FormField
                control={form.control}
                name="feel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bagaimana perasaanmu</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex  space-x-4 space-y-0"
                      >
                        <FormItem className="flex items-center justify-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="sedih" />
                          </FormControl>
                          <FormLabel className="font-normal">Sedih</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center  justify-center   space-x-2 space-y-0">
                          <div>
                            <FormControl>
                              <RadioGroupItem value="sedikit sedih" />
                            </FormControl>
                          </div>
                          <FormLabel className="font-normal">
                            Sedikit sedih
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center justify-center   space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="netral" />
                          </FormControl>
                          <FormLabel className="font-normal">Netral</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center  justify-center  space-x-2 space-y-0">
                          <div>
                            <FormControl>
                              <RadioGroupItem value="sedikit senang" />
                            </FormControl>
                          </div>
                          <FormLabel className="font-normal">
                            Sedikit senang
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center justify-center   space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="senang" />
                          </FormControl>
                          <FormLabel className="font-normal">senang</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="story"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ceritakan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Pada suatu hari..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAP dulu nga si</FormLabel>
                    <FormControl>
                      <Input id="picture" type="file" accept="image/*" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                Kirim
              </Button>
            </form>
          </Form>
          <div className="w-full h-full bg-blue-100 p-4 rounded-lg flex justify-center items-center">
            <div className="w-20 h-20 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
