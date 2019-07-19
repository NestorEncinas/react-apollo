import React from "react";

import InputComponent from "components/Input/index";

type TMutationValues = {
  name?: string;
  email: string;
  password: string;
};

interface IHeaderProps {
  loginMutation: (values: TMutationValues) => Promise<any>;
  setLogin: () => void;
  login: boolean;
}

const LoginMutation: React.FC<IHeaderProps> = ({
  loginMutation,
  setLogin,
  login
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  return (
    <div>
      <h4 className="mv3"> {login ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!login && (
          <InputComponent
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        )}
        <InputComponent
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <InputComponent
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="flex mt3">
        <div
          className="pointer mr2 button"
          onClick={() => loginMutation({ email, password, name })}
        >
          {login ? "Login" : "Create account"}
        </div>
        <div className="pointer button" onClick={() => setLogin()}>
          {login ? "need to create an account" : "already have an account"}
        </div>
      </div>
    </div>
  );
};

export default LoginMutation;
