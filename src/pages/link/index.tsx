import React from "react";
import { Query, Mutation } from "react-apollo";
// generic mutation typescript
// import { MutationFn } from "react-apollo"

import Link from "./linkList/index";

import { SubscribeToMoreOptions } from "apollo-client";
import {
  FEED_QUERY,
  VOTE_MUTATION,
  NEW_LINKS_SUBSCRIPTION,
  NEW_VOTES_SUBSCRIPTION,
  IData,
  IVoteMutation,
  TLink
} from "./graphql";

import { LINKS_PER_PAGE } from "utils/constants";
import { RouteComponentProps } from 'react-router-dom';

interface MatchParams {
  page?: string | undefined;
}

interface ILinkList extends RouteComponentProps<MatchParams> {

}
const LinkList: React.FC<ILinkList>= () => {
  const _subscribeToNewLinks = async (
    subscribeToMore: (options: SubscribeToMoreOptions) => () => void
  ) => {
    subscribeToMore({
      document: NEW_LINKS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newLink = subscriptionData.data.newLink;
        const exists = prev.feed.links.find(({ id }: any) => id === newLink.id);

        if (exists) return prev;

        return Object.assign({}, prev, {
          feed: {
            links: [newLink, ...prev.feed.links],
            count: prev.feed.links.length + 1,
            __typename: prev.feed.__typename
          }
        });
      }
    });
  };

  const _subscribeToNewVotes = async (
    subscribeToMore: (options: SubscribeToMoreOptions) => () => void
  ) => {
    subscribeToMore({
      document: NEW_VOTES_SUBSCRIPTION
    });
  };

  const _getQueryVariables = () => {
    const isNewPage = window.location.pathname.includes("new");    
    
    const page = parseInt(page, 10);

    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const first = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy = isNewPage ? "createdAt_DESC" : null;

    return { first, skip, orderBy };
  };

  const _getLinksToRender = (data: IData | undefined) => {
    const isNewPage = window.location.pathname.includes("new");
    if (isNewPage) {
      return data!.feed.links;
    }
    const rankedLinks = data!.feed.links.slice();
    rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
    return rankedLinks;
  };

  const _nextPage = (data: IData | undefined) => {
    //@ts-ignore
    const page = parseInt(this.props.match.params.page, 10)
    if (page <= data!.feed.count / LINKS_PER_PAGE) {
      const nextPage = page + 1
      //@ts-ignore
      this.props.history.push(`/new/${nextPage}`)
    }
  }
  
  const _previousPage = () => {
    //@ts-ignore
    const page = parseInt(this.props.match.params.page, 10)
    if (page > 1) {
      const previousPage = page - 1
      //@ts-ignore
      this.props.history.push(`/new/${previousPage}`)
    }
  }
  return (
    <Query<IData> query={FEED_QUERY} variables={_getQueryVariables()}>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        _subscribeToNewLinks(subscribeToMore);
        _subscribeToNewVotes(subscribeToMore);

        // const linksToRender = data!.feed.links;
        const linksToRender = _getLinksToRender(data);

        const isNewPage = window.location.pathname.includes("new");
        //@ts-ignore
        const pageIndex = match.params.page
          ? 
          //@ts-ignore
          (this.props.match.params.page - 1) * LINKS_PER_PAGE
          : 0;

        return linksToRender.map((link, index) => {
          return (
            // generic mutation typescript
            // <Mutation<MutationFn>
            //@ts-ignore
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
                    index={index + pageIndex}
                    voteMutation={({ linkId }) =>
                      voteMutation({ variables: { linkId } })
                    }
                  />
                </div>                
              )}
              {isNewPage && (
              <div className="flex ml4 mv3 gray">
                <div className="pointer mr2" onClick={() => _previousPage()}>
                  Previous
                </div>
                <div className="pointer" onClick={() => _nextPage(data)}>
                  Next
                </div>
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
