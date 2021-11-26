import Text from "./Text"

const Number = ({ value,onChange,min,max }) => {
    return (
        <Text value={value} onChange={onChange} type='number' min={min} max={max} >

        </Text>
    )
}

export default Number
