import React from "react";
import { Query, Mutation } from "react-apollo";

import Link from "./linkList/index";

import { FEED_QUERY, IData, VOTE_MUTATION, IVoteMutation } from "./graphql";

const LinkList: React.FC = () => {
  return (
    <Query<IData> query={FEED_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        const linksToRender = data!.feed.links;
        return (
          <Mutation<IVoteMutation> mutation={VOTE_MUTATION}>
            {voteMutation => (
              <div>
                {linksToRender.map((link, index) => (
                  <Link
                    key={link.id}
                    link={link}
                    index={index}
                    //@ts-ignore
                    voteMutation={({ id }) =>
                      voteMutation({ variables: { id } })
                    }
                  />
                ))}
              </div>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default LinkList;
