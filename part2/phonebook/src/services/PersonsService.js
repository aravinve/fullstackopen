import axios from 'axios'
const baseUrl = "/api/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const create = (data) => {
    const request = axios.post(baseUrl, data)
    return request.then(res => res.data)
}

const update = (id, data) => {
    const request = axios.put(`${baseUrl}/${id}`, data)
    return request.then(res => res.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(res => res.data)
}

const personsService = {
    getAll,
    create,
    update,
    remove}

export default personsService