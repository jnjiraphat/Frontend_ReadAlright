const Test = async (id) => {
    const response = await fetch(`https://readalright-backend.khanysorn.me/quizs`);
    const data = await response.json()
    return data;
}

export default Test
