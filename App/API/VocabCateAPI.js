const vocabBox = async (id) => {
    const response = await fetch(`http://10.0.2.2:3000/categorys/vocab`);
    const data = await response.json()
    console.log("vocabnon")
    console.log(data)
    console.log("vocabnon")

    return data;
}

export default vocabBox