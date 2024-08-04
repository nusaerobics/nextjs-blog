"use server";

import { redirect } from "next/navigation";
import { getSession } from "../../lib";
import UsersPage from "../../components/pages/UsersPage";

export default async function Page() {
  let user;
  try {
    const session = await getSession();
    if (!session) {
      redirect("/");
    }
    user = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      permission: session.user.permission,
      balance: session.user.balance,
    }
    if (user.permission == "normal") {
      redirect("/dashboard");
    }
  } catch (error) {
    console.log(error);
    redirect("/");
  }
  return <UsersPage />;
}
