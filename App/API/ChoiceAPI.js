const ChoiceAPI = async (id) => {
    const response = await fetch(`https://readalright-backend.khanysorn.me/quizs/`+id);
    const data = await response.json()
    return data;
}

export default ChoiceAPI
