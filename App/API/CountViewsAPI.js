import axios from "axios";

const countView = (category_id,user_id,reading_id,vocabBox_id) => {
  console.log("readingId in method")

  console.log(reading_id)
    axios
    .post("http://ec2-3-90-114-38.compute-1.amazonaws.com:3000/views", {
      numOfView: 1,
      category_id: category_id,
      user_id: user_id,
      reading_id: reading_id,
      vocabBox_id: vocabBox_id,
      is_Active: "1"
    })
    .then(
      (response) => {
        console.log("upload success!!!");
      },
      (error) => {
        console.log(error);
      }
    );
}
export default countView