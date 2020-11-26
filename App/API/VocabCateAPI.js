const vocabBox = async (id) => {
    const response = await fetch(`https://readalright-backend.khanysorn.me/categorys/vocab`);
    const data = await response.json()
    console.log("vocabnon")
    console.log(data)
    console.log("vocabnon")

    return data;
}

export default vocabBox