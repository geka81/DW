import axios from "axios";

const getVideo = async (id) => {
    const url = `/api/${id}`
    const response = await axios(
        {
            method: "get",
            url: url,
        }
    ).then(response => {
        return response.data
    })
    return response
}

const like = async (id) => {
    const url = `/api/${id}`
    const response = await axios(
        {
            method: "get",
            url: url,
        }
    ).then(response => {
        return response.data
    })
    return response
}

export default {like, getVideo};