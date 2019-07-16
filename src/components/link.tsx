import React from "react";

const Link = (props: any) => {
  return (
    <div>
      <div>
        {props.link.description} ({props.link.url})
      </div>
    </div>
  );
};

export default Link;
