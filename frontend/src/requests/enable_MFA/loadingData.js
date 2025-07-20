/**
 * Request for all needed data for the layout
 */
async function loadData(){
    const url = "http://localhost:3001/api"
    const response = await fetch(url,{
        method: "GET"
    });
}