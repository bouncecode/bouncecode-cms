/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.SignUp.hooks
 */

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import Router from "next/router";

const CREATE_USER = gql`
  mutation($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      email
      isAdmin
      payload
      createdAt
      updatedAt
    }
  }
`;

export function useSignUpMutation() {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(CREATE_USER, {
    onCompleted: () => {
      enqueueSnackbar("회원가입 했습니다.", { variant: "success" });
      Router.push("/signin");
    },
    onError: (e) => {
      console.error(e);
      enqueueSnackbar(e.message, { variant: "error" });
    },
  });
}
