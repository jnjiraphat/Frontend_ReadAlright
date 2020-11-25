const ArticleInterest = async (id) => {
    const response = await fetch(`https://readalright-backend.khanysorn.me/reading/categorys/`);
    const data = await response.json()
    return data;
}

export default ArticleInterest