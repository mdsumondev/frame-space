import { signOut } from "@/lib/auth-client";
import { toast } from "react-toastify";

export const handleLogOut = async (onSuccess?: () => void) => {
  try {
    const { data, error } = await signOut();

    if (error) {
      toast.error(error.message || "Logout failed");
      return;
    }

    toast.success("Logout Success");
    onSuccess?.();
  } catch (err) {
    console.error(err);
    toast.error("An unexpected error occurred");
  }
};
