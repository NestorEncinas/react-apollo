import React from "react";

import { TLink } from "../graphql";
import { AUTH_TOKEN } from "utils/constants";
import { timeDifferenceForDate } from "utils/timeDifference";

type TVoteMutationValues = {
  id: string;
};

interface ILinkProps {
  link: TLink;
  index: number;
  voteMutation: (values: TVoteMutationValues) => Promise<any>;
}

const VoteMutationLink: React.FC<ILinkProps> = ({
  link,
  index,
  voteMutation
}) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          // <Mutation<IVoteMutation>
          //   mutation={VOTE_MUTATION}
          //   variables={{ linkId: link.id }}
          // >
          // {voteMutation => (
          //@ts-ignore
          <div className="ml1 gray f11" onClick={() => voteMutation(link.id)}>
            ▲
          </div>
          // )}
          // </Mutation>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        <div className="f6 lh-copy gray">
          {link.votes.length} votes | by{" "}
          {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
          {timeDifferenceForDate(link.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default VoteMutationLink;
