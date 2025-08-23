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
import axios from "axios";
import Api_confige from "@/api/apiconfige";

function SignUp() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    const response = await axios.post(`${Api_confige.API_BASE_URL}/auth/register`, data);
    console.log('response: ',  response)
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-8 py-3 rounded-full text-lg">
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl rounded-xl bg-white dark:bg-gray-900 shadow-2xl p-10">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold">
            Create an account
          </DialogTitle>
          <DialogDescription className=" text-muted-foreground  mt-2">
            Fill in your details to create a new account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 mt-8">
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
            className="w-full px-6 py-2 border rounded-sm  focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
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
              Sign Up
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SignUp;
