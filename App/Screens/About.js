import { TouchableOpacity, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import React, { useEffect } from "react";

const About = (props) => {
   const goToHome = () => {
      Actions.home()
   }

   console.log("about page" + props.text[0])
   console.log("about page length" + props.text.length)
   const getReadaingByCateId = async () => {
      for (let index = 0; index < props.text.length; index++) {
         await axios.get("http://10.0.2.2:3000/reading/categorys/" + props.text[index]).then(
            response => {
               console.log("---------------" + [index] + "---------------------")
               console.log(response.data)
               console.log("---------------------------------------------------")

            })

      }
   }
   useEffect(() => {
      getReadaingByCateId();
   }, []);
   return (
      <TouchableOpacity style={{ margin: 50 }} onPress={goToHome}>
         <Text>This is ABOUT</Text>
      </TouchableOpacity>
   )
}
export default About