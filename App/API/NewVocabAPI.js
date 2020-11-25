const NewVocab = async (id) => {
    const response = await fetch(`https://readalright-backend.khanysorn.me/newVocab`);
    const data = await response.json()
    return data;
}

export default NewVocab