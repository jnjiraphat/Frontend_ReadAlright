import React from "react";
import { Router, Scene } from "react-native-router-flux";
import Article from "./App/Screens/Article.js";
import MaybeYouLike from "./App/Screens/MaybeYouLike";
import InterestScreen from "./App/Screens/InterestScreen.js";
// import Article from "./App/Screens/Article"

const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene
        key="home"
        component={InterestScreen}
        title="Home"
        initial={true}
      />
      <Scene key="MaybeYouLike" component={MaybeYouLike} title="MaybeYouLike" />
      <Scene key="Article" component={Article} title="Article" />
    </Scene>
  </Router>
);
export default Routes;
