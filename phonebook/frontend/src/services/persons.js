import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    console.log(id)
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const del = (person) => {
    return axios.delete(`${baseUrl}/${person.id}`)
}

const obj = {getAll, create, update, del}
export default obj