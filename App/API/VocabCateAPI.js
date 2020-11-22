const vocabBox = async (id) => {
    const response = await fetch(`http://ec2-3-90-114-38.compute-1.amazonaws.com:3000/categorys/vocab`);
    const data = await response.json()
    console.log("vocabnon")
    console.log(data)
    console.log("vocabnon")

    return data;
}

export default vocabBox