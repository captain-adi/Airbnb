"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { useLogin } from "@/hooks/query";
import { toast } from "sonner";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";


function Login() {
  const {setUser} = useAuth()
  const { register, handleSubmit, reset } = useForm();
  const [open, setOpen] = useState<boolean>(false);
  const { mutate , isPending } = useLogin();
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
      mutate(data, {
        onSuccess: (response) => {
          toast.success(response.message);
          localStorage.setItem("user_id", response.user._id);
          setUser(response.user._id);
          reset();
          setOpen(false);
          navigate("/");
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
         Login
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl rounded-xl bg-white dark:bg-gray-900 shadow-2xl p-10">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold">
           Log In
          </DialogTitle>
          <DialogDescription className=" text-muted-foreground  mt-2">
            Fill in your details to log in to your account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 mt-8">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-6 py-2 border rounded-sm  focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-6 py-2 border rounded-sm  focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <DialogFooter className="mt-4">
            <Button type="submit" className="px-6 py-4">
             {isPending ? "Logging in..." : "Log In"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
