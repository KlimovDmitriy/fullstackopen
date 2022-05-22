import axios from "axios"

const baseUrl = '/api/persons/'

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
const PhonebookService = {getAllPersons, addPerson, deletePerson}
export default PhonebookService