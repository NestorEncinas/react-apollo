import React from "react";

import { TLink } from "../graphql";

interface ILinkProps {
  link: TLink;
}

const Link: React.FC<ILinkProps> = ({ link }) => {
  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  );
};

export default Link;
