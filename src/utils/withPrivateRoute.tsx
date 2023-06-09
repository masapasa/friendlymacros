import { redirect, usePathname } from "next/navigation";
import { useUser } from "~/providers/AuthContextProvider/AuthContextProvider";
import { api } from "~/utils/api";
import { Spinner } from "~/components/ui/spinner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WithPrivateRoute = (Component: React.FunctionComponent<any>) => {
  const NewComponent = () => {
    const { user, isLoading } = useUser();

    if (isLoading) return <Spinner />;
    if (!user) redirect("/unauthorized");

    return <Component />;
  };

  return NewComponent;
};
