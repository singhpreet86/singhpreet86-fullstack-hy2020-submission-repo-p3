import React from "react";
import personService from "../services/personService";

const deleteContact = (_id, id, name, persons, setPersons, setFilterResult, setMessage, setErrorMessage) => {
    { window.confirm( 'Delete ' + name + '?', ) &&
      personService
          .deleteObject(_id)
          .then(returnedPerson => {
              setPersons(persons.map(note => note.id !== id ? note : returnedPerson))
              setFilterResult(persons.map(note => note.id !== id ? note : returnedPerson))
              refreshResults(setFilterResult, setPersons)
              setMessage("Deleted " + name)
          })
          .catch(error => {
          setErrorMessage("Information of " + name + " is already removed from the server")
      })
    }
}

const refreshResults = (setFilterResult, setPersons) => {
    personService.getAll()
        .then(initialPersons => {
            setFilterResult(initialPersons)
            setPersons(initialPersons)
        })
}

const Persons = (props) => {
    return(
        <div>
            <h2>Numbers</h2>
            {
                props.filterResult.map((person, i) =>
                    <li key={i}> {person?.name} {person?.phone_number}
                        <button onClick={ () => deleteContact(person?._id, person?.id, person?.name, props.persons, props.setPersons, props.setFilterResult, props.setMessage, props.setErrorMessage)}> delete </button>
                    </li>
                )}
        </div>
    )
}

export default Persons

