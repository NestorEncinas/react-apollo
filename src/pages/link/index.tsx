import React from "react";
import Link from "./linkList/index";

import { FEED_QUERY, IData } from "./graphql";
import { Query } from "react-apollo";

const LinkList: React.FC = () => {
  return (
    <Query<IData> query={FEED_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        const linksToRender = data!.feed.links;
        return (
          <div>
            {linksToRender.map(link => (
              <Link key={link.id} link={link} />
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default LinkList;
