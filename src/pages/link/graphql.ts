import gql from "graphql-tag";

type TPostedBy = {
  id: string;
  name: string;
};

type TVotes = {
  id: string;
  user: {
    id: string;
  };
};

export type TLink = {
  id: string;
  createdAt: Date;
  url: string;
  description: string;
  postedBy: TPostedBy;
  votes: TVotes[];
};

export interface IData {
  feed: {
    links: TLink[];
  };
}

export interface IVoteMutation {
  vote: {
    id: string;
    link: Array<{
      votes: Array<{
        id: string;
        user: Array<{
          id: string;
        }>
      }>
    }>
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
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

export const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;
