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
import { db, storage } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import doctor from "@/assets/model/doctor.png";
import { Calendar } from "../ui/calendar";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  time: z.string({
    required_error: "A time is required.",
  }),
  email: z.string(),
});

async function addStory(data: z.infer<typeof formSchema>) {
  try {
    const docRef = await addDoc(collection(db, data.email), {
      doc: data,
    });
    console.log("Document written with ID: ", docRef.id);
    alert("Story added!");
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Story failed to add!");
  }
}

export default function ButtonAddConsult({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dob: undefined,
      email: email,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full md:w-[270px] h-[170px] bg-yellow-300 flex justify-center items-center border border-gray-200 rounded-lg hover:bg-yellow-400">
        <div className="flex gap-2 justify-center flex-col items-center">
          <div className=" rounded-full ">
            <Image src={doctor} alt="doctor" width={75} height={75} />
          </div>
          <p className="font-semibold">Meet with Psycholog</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <h3 className="text-xl font-bold">Meet the Psycholog</h3>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-8 flex-col lg:flex-row">
              <ScrollArea className="w-full h-[400px] md:h-auto">
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Choose Date :</FormLabel>

                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date <= new Date()}
                        initialFocus
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="bg-yellow-100 px-4 md:px-10 py-12 w-full md:w-[300px] flex justify-center rounded-lg">
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Choose Time:</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <p>Morning session:</p>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="09:00-10:00" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                09:00 - 10:00
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="10:00-11:00" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                10:00 - 11:00
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="11:00-12:00" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                11:00 - 12:00
                              </FormLabel>
                            </FormItem>
                            <p>Afternoon session</p>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="14:00-15:00" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                14:00 - 15:00
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="15:00-16:00" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                15:00 - 16:00
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </ScrollArea>
            </div>
            <div className="w-full flex justify-end">
              <Button type="submit" className="w-full md:w-auto">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
