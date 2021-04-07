import React from 'react'

const Person = ({person, delPerson}) => {
    return (
      <div>
        {person.name} {person.number} &nbsp;
        <button onClick={() => delPerson(person)}>delete</button>
      </div>    
    )
  }

const Persons = ({ filter, persons, delPerson }) => {
    return (
        <div>
            {persons
            .filter(person =>
                person.name.includes(filter))
            .map(person =>
              <div key={person.name}>
                <Person person={person} delPerson={delPerson}/>
              </div>
            )}
        </div>
    )
}

export default Persons