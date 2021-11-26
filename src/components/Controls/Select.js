const Select = ({ value,onChange,id }) => {

    return (
        <>
            <select name={id} id={id} className="form-control" defaultValue={value} onChange={(e) => onChange(e.target.value)}>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        </>
    )
}

export default Select