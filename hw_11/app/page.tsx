import { redirect } from "next/navigation";

const HomePage = () => {
  redirect("/1");
  return null;
};

export default HomePage;
