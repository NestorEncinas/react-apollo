import React from "react";
import { withApollo, WithApolloClient } from "react-apollo";

import Link from "../link/linkList/index";
import { FEED_SEARCH_QUERY } from "./grapqhl";

const Search: React.FC<WithApolloClient<{}>> = ({ client }) => {
  const [links, setLinks] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  const executeSearch = async () => {
    const result = await client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter }
    });
    const links = result.data.feed.links;

    setLinks(links);
  };

  return (
    <div>
      <div>
        Search
        <input type="text" onChange={e => setFilter(e.target.value)} />
        <button onClick={() => executeSearch()}>OK</button>
      </div>
      {links.map((link, index) => (
        <Link link={link} index={index} />
      ))}
    </div>
  );
};

export default withApollo(Search);
