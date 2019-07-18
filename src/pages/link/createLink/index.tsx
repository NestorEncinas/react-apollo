import React from "react";

import InputComponent from "components/Input/index";

type TPostMutationValues = {
  description: string;
  url: string;
};

interface ICreateLinkProps {
  postMutation: (values: TPostMutationValues) => Promise<any>;
}

// eslint-disable-next-line
const CreateLink: React.FC<ICreateLinkProps> = ({ postMutation }) => {
  const [description, setDescription] = React.useState("");
  const [url, setUrl] = React.useState("");

  return (
    <div className="flex flex-column mt3">
      {/* // <form className={classes.container} noValidate> */}
      <InputComponent
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <InputComponent
        label="Url"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <button
        onClick={() => {
          postMutation({ description, url });
        }}
      >
        Submit
      </button>
      {/* // </form> */}
    </div>
  );
};

export default CreateLink;
