import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Error from '@app/components/Error';
import Loading from '@app/components/Loading';
import Search from '@app/components/Search';

import { USER_QUERY } from '@app/graphql/queries';
import { useApiQuery } from '@app/hooks/graphql';

import UserPanel from './components/UserPanel';
import UserRepositories from './components/UserRepositories/index';

const Users = props => {
    // const [keyword, setKeyword] = useState('');
    const location = useLocation();
    const [selectedUser, setSelectedUser] = useState(null);
    let params = new URLSearchParams(location.search);
    const keyword = params.get('keyword') || '';

    // loading
    const { error, data, loading } = useApiQuery(USER_QUERY, {
        variables: { keyword },
    });


    const handleSelectUser = useCallback(data => {
        setSelectedUser(data);
    }, []);

    // const handleSearchChange = e => {
    //     if (e.key === 'Enter') {
    //         setKeyword(e.target.value);
    //     }
    // }


    return <div className="p-2">
        <Search defaultValue={keyword} />
        {data?.search?.edges && <div className="font-semibold">
            Users
        </div>}
        {error && <Error/>}
        {loading ? <div className="my-9"><Loading /></div> : <div class="flex flex-row">
            {data?.search?.edges?.map(item => {
                return <UserPanel selectedUser={selectedUser} handleSelectUser={handleSelectUser} data={item} />
            })}
        </div>}



        {selectedUser && <UserRepositories user={selectedUser} />}
    </div>
}

export default Users;