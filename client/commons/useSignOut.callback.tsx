import { useCallback } from "react";
import Router from "next/router";
import { useApolloClient } from "@apollo/react-hooks";
import { resetToken } from "client/lib/token";

export function useSignOutCallback() {
  const client = useApolloClient();

  return useCallback(() => {
    resetToken(client);
    Router.push("/signin");
  }, []);
}
