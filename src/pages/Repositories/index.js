import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from '@app/components/Pagination';
import Loading from '@app/components/Loading';
import Search from '@app/components/Search';
import Error from '@app/components/Error';

import { useApiQuery } from '@app/hooks/graphql';
import { REPOSITORY_BY_USER_ISSUES_QUERY } from '../../graphql/queries';

import CreateIssueModal from './components/CreateIssueModal';



const Repositories = props => {
    const [isVisible, setIsVisible] = useState(false);;
    const location = useLocation();
    let params = new URLSearchParams(location.search);
    const owner = params.get('owner');
    const repositoryId = params.get('repo_id');
    const repositoryName = params.get('repo_name');
    const [after, setAfter] = useState([]);
    const [openedIssues, setOpenedIssues] = useState([]);
    const { data, loading, error } = useApiQuery(REPOSITORY_BY_USER_ISSUES_QUERY, {
        variables: { owner, repositoryName, after: after[after.length - 1] || null },
    });

    useEffect(() => {
        if (data?.repository?.openIssues?.nodes) {
            setOpenedIssues(data?.repository?.openIssues?.nodes || [])
        }
    }, [data])


    const paginateNext = () => {
        setAfter([...after, data?.repository?.openIssues?.pageInfo?.endCursor])
    };

    const paginatePrev = () => {
        let updatedAfter = [...after];
        updatedAfter.pop();
        setAfter([...(updatedAfter || [])]);
    };



    const handleModalChange = () => {
        setIsVisible(!isVisible);
    };

    const handleUpdateOpenedIssues = (data) => {
        if (data) {
            setOpenedIssues([...openedIssues, data]);
        }

    }


    return <>
        <div className="p-2">
        <Search />
            <div className="font-semibold text-2xl">
                Repository: {repositoryName}
            </div>
            <div class="flex justify-between">
                <div className="font-semibold text-2xl">
                    <div> Open Issues</div>
                </div>
                <div className="my-2 flex">
                    <button onClick={handleModalChange} className="bg-green-600 text-white p-2 rounded-sm" type="button">New Issue</button>
                </div>
            </div>

            {error && <Error/>}
            {loading ? <Loading /> : <>

                <div className="grid justify-items-end my-2">
                    <Pagination
                        hasPreviousPage={data?.repository?.openIssues?.pageInfo?.hasPreviousPage}
                        hasNextPage={data?.repository?.openIssues?.pageInfo?.hasNextPage}
                        paginatePrev={paginatePrev}
                        paginateNext={paginateNext}
                    />
                </div>

                <div class="min-h-screen antialiased">
                    {openedIssues.length > 0 ? openedIssues.map(item => {
                        return <div class="bg-gray-100 border-gray-500 border rounded-sm text-gray-700 mb-0.5 h-25">
                            <div class="flex p-3 border-l-8 border-red-700">
                                <div class="flex-1">
                                    <div class="ml-3 space-y-1 pr-3">
                                        <div class="text-base leading-6 font-normal"><a href={item?.url} target="_blankk">{item?.title}</a></div>
                                        <div class="text-sm leading-4 font-normal"><span className="text-xs leading-4 font-normal text-gray-500">Author: {item?.author?.login}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }) : <div>No Opened Issues!</div>}
                </div>


                <div className="grid justify-items-end my-2">
                    <Pagination
                        hasPreviousPage={data?.repository?.openIssues?.pageInfo?.hasPreviousPage}
                        hasNextPage={data?.repository?.openIssues?.pageInfo?.hasNextPage}
                        paginatePrev={paginatePrev}
                        paginateNext={paginateNext}
                    />
                </div>
            </>}


        </div>
        <CreateIssueModal
            repositoryId={repositoryId}
            handleModalChange={handleModalChange}
            isVisible={isVisible}
            handleUpdateOpenedIssues={handleUpdateOpenedIssues}
        />
    </>
};

export default Repositories;