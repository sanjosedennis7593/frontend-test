import { useCallback, useState } from 'react';
import TextField from '@app/components/Forms/TextField';

import { USER_QUERY } from '@app/graphql/queries';
import { useApiQuery } from '@app/hooks/graphql';

import UserPanel from './components/UserPanel';
import UserRepositories from './components/UserRepositories/index';

const Users = props => {
    const [keyword, setKeyword] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    // loading
    const { error, data } = useApiQuery(USER_QUERY, {
        variables: { keyword },
    });


    const handleSelectUser = useCallback(data => {
        setSelectedUser(data);
    }, []);

    const handleSearchChange = e => {
        if (e.key === 'Enter') {
            setKeyword(e.target.value);
        }
    }

    if (error) return <p>Error :(</p>;

    return <div className="p-2">
        <div>
            <TextField onKeyPress={handleSearchChange} placeholder="Search" />
        </div>
        {data?.search?.edges && <div className="font-semibold">
            Users
        </div>}
        <div class="flex flex-row">
            {data?.search?.edges?.map(item => {
                return <UserPanel selectedUser={selectedUser} handleSelectUser={handleSelectUser} data={item} />
            })}
        </div>

       
        {selectedUser && <UserRepositories user={selectedUser} />}
    </div>
}

export default Users;