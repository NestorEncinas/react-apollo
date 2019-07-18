import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import LoginMutation from "./index";

import { AUTH_TOKEN } from "utils/constants";
import { RouteComponentProps } from "react-router-dom";

interface ILoginMutationGQLProps extends RouteComponentProps<any> {}

interface IAuthenticationMutations {
  token: string;
}
export type TSignup = {
  signup: IAuthenticationMutations;
};

export type TLogin = {
  login: IAuthenticationMutations;
};

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const LoginMutationGQL: React.FC<ILoginMutationGQLProps> = ({ history }) => {
  const [login, setLogin] = React.useState(true);

  const saveUserData = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  type TToken = {
    token: string;
  };

  const confirm = async (data: { login?: TToken; signup?: TToken }) => {
    const { token } = login ? data.login! : data.signup!;
    saveUserData(token);
    history.push("/");
  };

  const handleUserLogin = () => {
    setLogin(!login);
  };

  return (
    <div>
      <Mutation<TSignup | TLogin>
        mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
        onCompleted={data => confirm(data)}
      >
        {loginMutation => (
          <LoginMutation
            login={login}
            setLogin={handleUserLogin}
            loginMutation={({ email, password, name }) =>
              loginMutation({ variables: { email, password, name } })
            }
          />
        )}
      </Mutation>
    </div>
  );
};

export default LoginMutationGQL;
