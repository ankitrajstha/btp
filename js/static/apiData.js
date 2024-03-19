// Chart data
// Task type chart data 
async function getData() {
    try {
        let res = await fetch("https://run.mocky.io/v3/2a8c32f5-7774-489c-8c93-eada1e6442c2");
        let data = await res.json();
        return data;
    } 
    catch (err) {
        console.log(err);
    }
}

export default getData;
