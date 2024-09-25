const Filter = ({ filter, handleFilter }) => (
    <div>
        filter shown with <input
        value={filter}
        onChange={handleFilter}>
        </input>
    </div>
)

export default Filter