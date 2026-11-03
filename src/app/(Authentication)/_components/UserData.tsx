import { useSession } from "@/lib/auth-client";
import React from "react";

const UserData = () => {
  const { data: user } = useSession();

  return user?.user?.email;
};

export default UserData;
