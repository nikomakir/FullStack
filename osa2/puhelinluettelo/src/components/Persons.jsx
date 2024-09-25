const Person = ({ name, number, handleClick }) => (
    <p>
        {name} {number}
        <button onClick={handleClick}>
            delete
        </button>
    </p>
)

const Persons = ({ phonebook, removePerson }) => (
    <>
    {phonebook.map(person => 
        <Person key={person.name}
        name={person.name}
        number={person.number}
        handleClick={() => removePerson(person.id)}
        />)}
    </>
)

export default Persons