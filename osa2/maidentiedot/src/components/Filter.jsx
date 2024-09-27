const Filter = ({ filter, handleFilter }) => (
    <div>
        find countries <input
        value={filter}
        onChange={handleFilter}>
        </input>
    </div>
)

export default Filter