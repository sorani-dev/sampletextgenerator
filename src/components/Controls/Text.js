const Text = ({ value,onChange,type,...children }) => {
    return (
        <input className='form-control' type={type} value={value} onChange={e => onChange(e.target.value)} {...children} />
    )
}

export default Text
