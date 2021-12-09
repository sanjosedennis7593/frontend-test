import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@app/components/Forms/TextField';
const Search = props => {
    const { defaultValue } = props
    const navigate = useNavigate(); 
    const [searchKeyword, setSearcKeyword] = useState('');

    useEffect(() => {
        if(defaultValue) {
            setSearcKeyword(defaultValue);
        }
    },[defaultValue])

    const handleKeyPress = e => {
        console.log('e.target.value',e.target.value)
        if (e.key === 'Enter') {
            // setKeyword(e.target.value);
        
            navigate(`/?keyword=${e.target.value}`)

        }

    }

    const handleChange = e => {
      
        setSearcKeyword(e.target.value);
    }

    return <div>
        <TextField value={searchKeyword} onChange={handleChange} onKeyPress={handleKeyPress} placeholder="Search" />
    </div>
}

export default Search;