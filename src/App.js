import "./App.css";

import { Home } from "./Home";
import { Customer } from "./Customer";
import { Admin } from "./Admin";
import { Navigation } from "./Navigation";

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">ESHOP</h3>
        <Navigation />

        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/admin" component={Admin} />
          <Route path="/customer" component={Customer} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
