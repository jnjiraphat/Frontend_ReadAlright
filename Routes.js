import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Article from './App/Screens/Article.js'
import About from './App/Screens/About.js'
import InterestScreen from './App/Screens/InterestScreen.js'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "home" component = {InterestScreen} title = "Home" initial = {true} />
         <Scene key = "about" component = {About} title = "About" />
      </Scene>
   </Router>
)
export default Routes