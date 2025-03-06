import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { Button } from "../ui/button";
import { LoginForm } from "./LoginForm";

const FormDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        Login
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Login</DialogTitle>
              </DialogHeader>
              
              <LoginForm />
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
