import React from "react";
import { Router, Scene } from "react-native-router-flux";
import Article from "./App/Screens/Article.js";
import InterestScreen from "./App/Screens/InterestScreen.js";
import ContentScreen from "./App/Screens/ContentScreen";
import Home from "./App/Screens/Home";
// import Article from "./App/Screens/Article"

const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene
        key="Home"
        component={Home}
        title="Home"
        initial={true}
        hideNavBar={true}
      />
      <Scene
        key="Interest"
        component={InterestScreen}
        title="Interest"
        // initial={true}
        hideNavBar={true}
      />
      <Scene key="Home" component={Home} title="Home" hideNavBar={true} />
      <Scene key="Article" component={Article} title="Article" />
      <Scene
        key="ContentScreen"
        component={ContentScreen}
        title="ContentScreen"
      />
    </Scene>
  </Router>
);
export default Routes;
