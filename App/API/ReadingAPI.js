const reading = async (id) => {
    const response = await fetch(`http://ec2-3-90-114-38.compute-1.amazonaws.com:3000/categorys/reading`);
    const data = await response.json()
    return data;
}
// const postView = async => {
//     const response = axios({
//         method: 'post',
//         url: 'http://10.0.2.2:3000/views',
//         data: {
//             "views_id" : "2",
//             "numOfView" : "2",
//             "category_id" : "1",
//             "user_id" : "1",
//             "reading_id" : "1",
//             "vocabBox_id" : "1"
//         }
//     });
//     const data = await response.json()
//     return data;

// }
export default reading
// const response = await fetch(`http://localhost:3000/categorys`);
