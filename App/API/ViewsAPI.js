const views = e => {
  e.preventDefault();
  fetch(`http://ec2-3-90-114-38.compute-1.amazonaws.com:3000/views`, {
    method: "POST",
    body: JSON.stringify({ catagory_id, numOfView })
      .then(() => setIsSent(true))
      .catch(() => alert("There was an error, please try again"))
  });
};

export default views;
