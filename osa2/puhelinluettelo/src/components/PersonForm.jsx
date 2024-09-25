const PersonForm = (props) => (
        <form onSubmit={props.addPerson}>
        <div>
          name: <input 
          value={props.newName}
          onChange={props.handlePersonName}/>
        </div>
        <div>
          number: <input
          value={props.newNumber}
          onChange={props.handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        </form>
)


export default PersonForm