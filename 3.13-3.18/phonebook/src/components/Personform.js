import React, {useState} from "react";
import personService from "../services/personService";

const PersonForm = (props) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addPhone = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            phone_number: newNumber
        }
        const found = props.persons.some(el => el.name.toLowerCase() === newName.toLowerCase());
        if (!found) {
                personService
                    .create(personObject)
                    .then(returnedPerson => {
                        props.setPersons(props.persons.concat(returnedPerson))
                        props.setFilterResult(props.persons.concat(returnedPerson))
                        props.setMessage("Added " + personObject.name)
                    })
                    .catch(error => {
                        console.log(error.response.data.error)
                        props.setErrorMessage(error.response.data.error)
                    })


        } else {
            const item = props.persons?.find(
                (item) => item.name.toLowerCase() === newName.toLowerCase()
            );
             { window.confirm( newName + " is already added to phonebook, replace old number with new one", ) &&
            personService
                .update(item._id, personObject)
                .then(returnedPerson => {
                    props.setPersons(returnedPerson)
                    props.setFilterResult(props.persons)
                    refreshResults(props.setFilterResult, props.setPersons)
                    props.setMessage("Updated " + personObject.name)
                })
            }
        }
        setNewName('')
        setNewNumber('')
    }

    const refreshResults = (setFilterResult, setPersons) => {
        personService.getAll()
            .then(initialPersons => {
                setFilterResult(initialPersons)
                setPersons(initialPersons)
            })
    }

        return(
        <div>
            <h2> add a new </h2>
            <form>
                <div> name: <input value={newName} onChange={handleNameChange}/></div>
                <div> number: <input value={newNumber} onChange={handleNumberChange}/></div>
                <div>
                    <button type="submit" onClick={addPhone}>add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm

