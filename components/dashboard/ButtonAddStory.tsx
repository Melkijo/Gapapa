"use client";
import { PlusIcon } from "@/components/icon";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import promptProcess from "@/lib/promptProcess";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "standar",
    label: "standar",
  },
  {
    value: "pemarah",
    label: "pemarah",
  },
  {
    value: "tidak peduli",
    label: "tidak peduli",
  },
  {
    value: "lebay",
    label: "lebay",
  },
];

const formSchema = z.object({
  storyDate: z.string(),
  storyTime: z.string(),
  feel: z.string(),
  story: z.string(),
  photo: z.any(),
  recommendation: z.string(),
  email: z.string(),
  model: z.string(),
});

async function addStory(data: z.infer<typeof formSchema>) {
  try {
    const docRef = await addDoc(collection(db, data.email), {
      storyDate: data.storyDate,
      StoryItem: data.storyTime,
      feel: data.feel,
      story: data.story,
      email: data.email,
      photo: data.photo,
      model: data.model,
      recommendation: data.recommendation,
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
  const [promptResult, setPromptResult] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storyDate: new Date().toDateString(),
      storyTime: new Date().toTimeString(),
      recommendation: "",
      feel: "netral",
      story: "",
      photo: "",
      email: email,
      model: "standar",
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
    setLoading(true);
    // console.log("masuk", value);
    values.photo = imageUrl;
    values.model = value;
    promptProcess(values).then((result) => {
      values.recommendation = result;
      setPromptResult(result);
      addStory(values);
      setLoading(false);
    });
    // setLoading(false);
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
          <div className="w-full h-full bg-blue-50  rounded-lg flex justify-center items-center mt-2 mr-2 overflow-hidden px-6">
            {promptResult ? (
              <ScrollArea className="h-[300px] w-full rounded-md">
                <Markdown>{promptResult}</Markdown>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-blue-400 rounded-full"></div>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {value
                        ? frameworks.find(
                            (framework) => framework.value === value
                          )?.label
                        : frameworks[0].value}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          {frameworks.map((framework) => (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? "" : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              {framework.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
