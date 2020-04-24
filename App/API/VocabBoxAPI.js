const vocabBox = async (id) => {
    const response = await fetch(`http://10.0.2.2:3000/vocabBox`);
    const data = await response.json()
    return data;
}

export default vocabBox