import React from "react";
import { Query, Mutation } from "react-apollo";
// generic mutation typescript
// import { MutationFn } from "react-apollo"

import Link from "./linkList/index";

import {
  FEED_QUERY,
  IData,
  VOTE_MUTATION,
  IVoteMutation,
  TLink
} from "./graphql";

const LinkList: React.FC = () => {
  return (
    <Query<IData> query={FEED_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        const linksToRender = data!.feed.links;

        return linksToRender.map((link, index) => {
          return (
            // generic mutation typescript
            // <Mutation<MutationFn>
            <Mutation<IVoteMutation>
              mutation={VOTE_MUTATION}
              //@ts-ignore TODO: find out how to typed data
              update={(store, { data: { vote } }) => {
                const data = store.readQuery<IData>({ query: FEED_QUERY });
                const votedLink = data!.feed.links.find(
                  (l: TLink) => l.id === link.id
                );
                votedLink!.votes = vote.link.votes;

                store.writeQuery({ query: FEED_QUERY, data });
              }}
            >
              {voteMutation => (
                <div>
                  <Link
                    link={link}
                    index={index}
                    voteMutation={({ linkId }) =>
                      voteMutation({ variables: { linkId } })
                    }
                  />
                </div>
              )}
            </Mutation>
          );
        });
      }}
    </Query>
  );
};

export default LinkList;
