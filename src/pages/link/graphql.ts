import gql from "graphql-tag";

export type TLink = {
  id: string;
  createdAt: Date;
  url: string;
  description: string;
};

export interface IData {
  feed: {
    links: TLink[];
  };
}

export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;
