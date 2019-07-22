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
    count: number;
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
        }>;
      }>;
    }>;
  };
}

export const FEED_QUERY = gql`
  query FeedQuery($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(first: $first, skip: $skip, orderBy: $orderBy) {
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
      count
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

export const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      id
      url
      description
      createdAt
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
`;

export const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
        id
        url
        description
        createdAt
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
      user {
        id
      }
    }
  }
`;
