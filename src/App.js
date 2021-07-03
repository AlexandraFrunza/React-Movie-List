import { Movies } from "./Movies/Movies";
import { MovieDetails } from "./Movies/MovieDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Nav } from "./shared/Nav/Nav";
import { Auth } from "./Auth/Auth";

import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from "./Auth/AuthContext";
import { Parent } from "./Communication/Parent";
import { GlobalMessageContextProvider } from "./shared/GlobalMessage";
import { EditMovie } from "./Movies/EditMovie";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Nav />
        <div className="container">
          <GlobalMessageContextProvider>
            <Switch>
              <Route exact path="/" component={() => <h1>Homepage</h1>} />
              <Route path="/login" component={Auth} />
              <Route path="/register" component={Auth} />

              <Route exact path="/movies" component={Movies} />
              <Route path="/movies/edit/:id" component={EditMovie} />
              <Route path="/movies/:id" component={MovieDetails} />
              <Route path="/component-com" component={Parent} />

              <Route path="*" component={() => <h1>404</h1>} />
            </Switch>
          </GlobalMessageContextProvider>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;

// function add(a, b) {
//     return a + b;
// }

// function createAdder(a) {
//   return (b) => a + b;
// }

// const addTwo = createAdder(2);
// addTwo(4);
// addTwo(7);
// const addFive = createAdder(5);
// addFive(7);

// createAdder(9)(3);
