import axios from "axios"

const baseUrl = '/persons/'

const getAllPersons = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}
const addPerson = (person) => {
  const request = axios.post(baseUrl, person)
  return request.then((response) => response.data)

}

const deletePerson = (id) => {
  const request = axios.delete(baseUrl + id)
  return request.then((response) => response.data)
}

const updatePerson = (id, person) => {
  const request = axios.put(baseUrl + id, person)
  return request.then((response) => response.data).catch((err) => err.response)
}
const PhonebookService = {getAllPersons, addPerson, deletePerson, updatePerson}
export default PhonebookService