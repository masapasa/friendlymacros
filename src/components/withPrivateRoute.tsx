import { redirect, usePathname } from "next/navigation";
import { env } from "~/env.mjs";
import { useUser } from "~/providers/AuthContextProvider/AuthContextProvider";
import { api } from "~/utils/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WithPrivateRoute = (Component: React.FunctionComponent<any>) => {
  const NewComponent = () => {
    const { user, isLoading } = useUser();
    if (!user) redirect("/login");

    return <Component />;
  };

  return NewComponent;
};
