const articles = async (id) => {
    const response = await fetch(`https://readalright-backend.khanysorn.me/reading`);
    const data = await response.json()
    return data;
}

export default articles

