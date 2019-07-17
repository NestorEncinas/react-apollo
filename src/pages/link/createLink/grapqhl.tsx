import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import CreateLink from "./index";

import { RouteComponentProps } from "react-router-dom";

type ICreateLink = {
  post: {
    id: string;
    createdAt: Date;
    url: string;
    description: string;
  };
};

interface ICreateLinkMutationGQLProps extends RouteComponentProps<any> {}

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const CreateLinkMutationGQL: React.FC<ICreateLinkMutationGQLProps> = ({
  history
}) => {
  return (
    <div>
      <Mutation<ICreateLink>
        mutation={POST_MUTATION}
        onCompleted={() => history.push("/")}
      >
        {postMutation => (
          <CreateLink
            postMutation={({ description, url }) =>
              postMutation({ variables: { description, url } })
            }
          />
        )}
      </Mutation>
    </div>
  );
};

export default CreateLinkMutationGQL;
