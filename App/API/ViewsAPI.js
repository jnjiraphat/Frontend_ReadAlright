const views = e => {
  e.preventDefault();
  fetch(`http://10.0.2.2:3000/views`, {
    method: "POST",
    body: JSON.stringify({ catagory_id, numOfView })
      .then(() => setIsSent(true))
      .catch(() => alert("There was an error, please try again"))
  });
};

export default views;
