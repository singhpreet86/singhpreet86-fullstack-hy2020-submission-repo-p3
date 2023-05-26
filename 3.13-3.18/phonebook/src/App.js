import React, {useState, useEffect} from 'react'
import SearchFilter from "./components/Searchfilter";
import Persons from "./components/Persons";
import PersonForm from "./components/Personform";
import personService from "./services/personService";
import './index.css'


const App = () => {
    const [persons, setPersons] = useState([{name: "", phone_number: "", _id: ""}])
    const [filter, setFilter] = useState('')
    const [filterResult, setFilterResult] = useState([])
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)


    useEffect(() => {
        personService.getAll()
            .then(initialPersons => {
                setFilterResult(initialPersons)
                setPersons(initialPersons)
            })
    }, [])

    const handleFilter = (event) => {
        setFilter(event.target.value)
        if (event.target.value === "" || event.target.value === null) {
            setFilterResult([...persons])
        } else {
            let result = persons.filter((user) => user.name.toLowerCase().includes(event.target.value.toLowerCase()));
            setFilterResult(result)
        }
    }

    const NotificationMessage = ({ message }) => {
        if (message === null) {
            return null
        }

        return (
            <div className='message'>
                {message}
            </div>
        )
    }
    const NotificationError = ({ errorMessage }) => {
        if (errorMessage === null) {
            return null
        }

        return (
            <div className='error'>
                {errorMessage}
            </div>
        )
    }

    setTimeout(() => {
        setMessage(null)
        setErrorMessage(null)
    }, 5000)

    return (
        <div>
            <NotificationMessage message={message}/>
            <NotificationError errorMessage={errorMessage}/>

            <SearchFilter filter={filter} handleFilter={handleFilter}/>

            <PersonForm
                persons={persons}
                setPersons={setPersons}
                filterResult={filterResult}
                setFilterResult={setFilterResult}
                message={message}
                setMessage={setMessage}
                setErrorMessage={setErrorMessage}
            />

            <Persons
                persons={persons}
                setPersons={setPersons}
                filterResult={filterResult}
                setFilterResult={setFilterResult}
                setMessage={setMessage}
                setErrorMessage={setErrorMessage}
            />
        </div>
    )
}

export default App