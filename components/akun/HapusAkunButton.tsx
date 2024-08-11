"use client";
import { Button, buttonVariants } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
export default function HapusAkunButton({ email }: { email: string }) {
  const [emailInput, setEmailInput] = useState("");

  const handleDeleteAccount = async (email: string) => {
    console.log(email);
    // Handle account deletion logic here
  };

  const isDeleteEnabled = emailInput === email;
  return (
    <>
      <Dialog>
        <DialogTrigger className={buttonVariants()}>Hapus Akun</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="text"
              onChange={(e) => setEmailInput(e.target.value)}
              value={emailInput}
            />
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={() => handleDeleteAccount(email)}
                variant="destructive"
                disabled={!isDeleteEnabled}
              >
                Hapus
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
