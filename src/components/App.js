import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../components/Routing/index";
import LinkList from "../pages/link/index";
import CreateLinkMutationGQL from "../pages/link/createLink/grapqhl";

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route exact path="/create" component={CreateLinkMutationGQL} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
