const reading = async (id) =>{
    const response = await fetch(`http://10.0.2.2:3000/categorys/reading`);
    const data = await response.json() 
    return data;
}

export default reading
// const response = await fetch(`http://localhost:3000/categorys`);
