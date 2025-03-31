import axios from "axios";


interface createBusinessAccount {
    // TODO: add correct fields
    form_data: string;
}

export async function createBusinessAccount(data: createBusinessAccount){
    // TODO: add needed values here
    //const url = BACKEND_URL + "/create-busniness-account";
    const url = "/create"
    const response = await axios.post(url, data, { withCredentials: true });
    return response.data;
}