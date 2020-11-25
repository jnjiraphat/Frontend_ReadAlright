const views = e => {
  e.preventDefault();
  fetch(`https://readalright-backend.khanysorn.me/views`, {
    method: "POST",
    body: JSON.stringify({ catagory_id, numOfView })
      .then(() => setIsSent(true))
      .catch(() => alert("There was an error, please try again"))
  });
};

export default views;
