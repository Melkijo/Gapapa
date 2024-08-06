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
import { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";

const formSchema = z.object({
  storyDate: z.string(),
  feel: z.string(),
  story: z.string(),
  photo: z.any(),
  recommendation: z.string(),
  email: z.string(),
});

async function addStory(data: z.infer<typeof formSchema>) {
  console.log(data);
  try {
    const docRef = await addDoc(collection(db, data.email), {
      storyDate: data.storyDate,
      feel: data.feel,
      story: data.story,
      email: data.email,
      photo: data.photo,
    });
    console.log("Document written with ID: ", docRef.id);
    alert("Story added!");
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Story failed to add!");
  }
}

export default function ButtonAddStory({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storyDate: new Date().toDateString(),
      recommendation: "",
      feel: "netral",
      story: "",
      photo: "",
      email: email,
    },
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setLoading(true);
      const file = event.target.files[0];
      const storageRef = ref(storage, `images/${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setImageUrl(downloadURL);
        setLoading(false);
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoading(false);
      }
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setLoading(true);
    values.photo = imageUrl;
    addStory(values);
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full md:w-[250px] h-[160px] bg-gray-200 flex justify-center items-center border border-gray-400 rounded-lg hover:bg-gray-300">
        <PlusIcon />
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col-reverse md:flex-row gap-4 overflow-hidden">
          <ScrollArea className="h-[300px] md:h-[400px] w-full rounded-md ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 "
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
                          className="flex flex-wrap md:flex-nowrap space-x-4 space-y-0"
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
                            <FormLabel className="font-normal">
                              Netral
                            </FormLabel>
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
                            <FormLabel className="font-normal">
                              senang
                            </FormLabel>
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
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt="Uploaded Image"
                          height={500}
                          width={500}
                          className="w-full h-[200px] object-cover rounded-md"
                        />
                      )}
                      <FormControl>
                        <Input
                          id="picture"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
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
          </ScrollArea>
          <div className="w-full h-full bg-blue-100  rounded-lg flex justify-center items-center mt-2 mr-2 overflow-hidden">
            <div className="w-20 h-20 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
