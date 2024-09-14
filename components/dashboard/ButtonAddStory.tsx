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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import standar from "@/assets/model/standar.png";
import marah from "@/assets/model/marah.png";
import tidakPeduli from "@/assets/model/tidakPeduli.png";
import lebay from "@/assets/model/lebay.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const frameworks = [
  {
    value: "standar",
    label: "standar",
  },
  {
    value: "angry",
    label: "angry",
  },
  {
    value: "ignorance",
    label: "ignorance",
  },
  {
    value: "overreacting",
    label: "overreacting",
  },
];

const formSchema = z.object({
  storyDate: z.string(),
  storyTime: z.string(),
  feel: z.string(),
  story: z.string().min(10),
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
  const [model, setModel] = useState("standar");

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
    values.model = model;
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
      <DialogTrigger className="w-full md:w-[270px] h-[170px] bg-white flex justify-center items-center border border-gray-200 rounded-lg hover:bg-gray-100">
        <div className="flex gap-2 justify-center flex-col items-center">
          <div className="p-4 rounded-full bg-yellow-200">
            <PlusIcon />
          </div>
          <p className="font-semibold">Add story</p>
        </div>
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
                      <FormLabel>How you feel?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap  space-x-4 space-y-0"
                        >
                          <FormItem className="flex items-center justify-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="sad" />
                            </FormControl>
                            <FormLabel className="font-normal">sad</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center  justify-center   space-x-2 space-y-0">
                            <div>
                              <FormControl>
                                <RadioGroupItem value="little sad" />
                              </FormControl>
                            </div>
                            <FormLabel className="font-normal">
                              little sad
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
                                <RadioGroupItem value="little happy" />
                              </FormControl>
                            </div>
                            <FormLabel className="font-normal">
                              little happy
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center justify-center   space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="happy" />
                            </FormControl>
                            <FormLabel className="font-normal">happy</FormLabel>
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
                      <FormLabel>My story</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Once upon a time..."
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
                      <FormLabel>Documentation (optional)</FormLabel>
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
                  Save
                </Button>
              </form>
            </Form>
          </ScrollArea>
          <div className="w-full h-full bg-blue-50  rounded-lg flex justify-center items-center mt-2 mr-2 overflow-hidden px-6">
            {promptResult ? (
              <ScrollArea className="h-[300px] w-full rounded-md">
                <div className="flex justify-center mb-2">
                  {model === "standar" ? (
                    //   <div className="w-20 h-20 bg-blue-400 rounded-full"></div>
                    <Image
                      src={standar}
                      alt="standar"
                      width={120}
                      height={120}
                    />
                  ) : model === "angry" ? (
                    <Image src={marah} alt="marah" width={80} height={80} />
                  ) : model === "ignorance" ? (
                    <Image
                      src={tidakPeduli}
                      alt="tidak peduli"
                      width={80}
                      height={80}
                    />
                  ) : model === "overreacting" ? (
                    <Image src={lebay} alt="lebay" width={80} height={80} />
                  ) : null}
                </div>
                <Markdown>{promptResult}</Markdown>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <h1 className="text-2xl font-bold">Model AI</h1>
                {model === "standar" ? (
                  //   <div className="w-20 h-20 bg-blue-400 rounded-full"></div>
                  <Image src={standar} alt="standar" width={120} height={120} />
                ) : model === "angry" ? (
                  <Image src={marah} alt="standar" width={120} height={120} />
                ) : model === "ignorance" ? (
                  <Image
                    src={tidakPeduli}
                    alt="standar"
                    width={120}
                    height={120}
                  />
                ) : model === "overreacting" ? (
                  <Image src={lebay} alt="standar" width={120} height={120} />
                ) : null}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {model
                        ? frameworks.find(
                            (framework) => framework.value === model
                          )?.label
                        : frameworks[0].value}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[180px] p-0">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          {frameworks.map((framework) => (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setModel(
                                  currentValue === model
                                    ? "standar"
                                    : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              {framework.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  model === framework.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
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
