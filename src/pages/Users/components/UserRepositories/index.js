import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@app/components/Pagination';
import Loading from '@app/components/Loading';
import Error from '@app/components/Error';

import { REPOSITORY_BY_USER_QUERY } from '@app/graphql/queries';


import { useApiQuery } from '@app/hooks/graphql';


const UserRepositories = props => {
    const { user } = props;

    const [after, setAfter] = useState([]);
    const { data, error, loading } = useApiQuery(REPOSITORY_BY_USER_QUERY, {
        variables: { keyword: user.node.login, after: after[after.length - 1] || null },
    });

    useEffect(() => {
        if (user) {
            setAfter([]);
        }
    }, [user])

    const paginateNext = () => {
        setAfter([...after, data?.repositoryOwner?.repositories?.pageInfo?.endCursor])
    };

    const paginatePrev = () => {
        let updatedAfter = [...after];
        updatedAfter.pop();
        setAfter([...(updatedAfter || [])]);
    };

    if (error) {
        return <Error/>
    }


    return <div class="min-h-screen antialiased">
        <div className="grid justify-items-end my-2">
            <Pagination
                hasPreviousPage={data?.repositoryOwner?.repositories?.pageInfo?.hasPreviousPage}
                hasNextPage={data?.repositoryOwner?.repositories?.pageInfo?.hasNextPage}
                paginatePrev={paginatePrev}
                paginateNext={paginateNext}
            />
        </div>
        {loading ? <div className="my-9"><Loading /></div> : <div>
            {data?.repositoryOwner?.repositories?.nodes.map(item => {
                return <div class="bg-gray-100 border-gray-500 border rounded-sm text-gray-700 mb-0.5 h-25">
                    <Link to={`/repository?repo_id=${item.id}&repo_name=${item.name}&owner=${user.node.login}`}>
                        <div class="flex p-3 border-l-8 border-yellow-600">
                            <div class="flex-1">
                                <div class="ml-3 space-y-1 pr-3">
                                    <div class="text-base leading-6 font-normal">{item.name}</div>
                                    <div class="text-sm leading-4 font-normal"><span className="text-xs leading-4 font-normal text-gray-500">{item.description}</span></div>

                                </div>
                            </div>

                            <div>
                                <div class="ml-3 my-5 bg-yellow-600 p-1 w-30">
                                    <div class="uppercase text-xs leading-4 font-semibold text-center text-yellow-100">Stars: {item.stargazerCount}</div>
                                </div>
                                <div class="ml-3 my-5 bg-yellow-600 p-1 w-30">
                                    <div class="uppercase text-xs leading-4 font-semibold text-center text-yellow-100">Watchers: {item.watchers.totalCount}</div>
                                </div>
                            </div>

                        </div>
                    </Link>
                </div>
            })}


        </div>}


        <div className="grid justify-items-end my-2">
            <Pagination
                hasPreviousPage={data?.repositoryOwner?.repositories?.pageInfo?.hasPreviousPage}
                hasNextPage={data?.repositoryOwner?.repositories?.pageInfo?.hasNextPage}
                paginatePrev={paginatePrev}
                paginateNext={paginateNext}
            />
        </div>
    </div>
};

export default UserRepositories;