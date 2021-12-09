import { useState } from 'react';

import TextAreaField from '@app/components/Forms/TextAreaField';
import TextField from '@app/components/Forms/TextField';

import { useApiMutation } from '@app/hooks/graphql';

import { CREATE_ISSUE_MUTATION } from '@app/graphql/mutation';

const CreateIssueModal = props => {
    const { handleModalChange, isVisible, repositoryId, handleUpdateOpenedIssues } = props;
    const { mutateFunction } = useApiMutation(CREATE_ISSUE_MUTATION);
    const [details, setDetails] = useState({
        title: '',
        body: ''
    });

    const handleInputChange = e => {
        const { name, value } = e.target;
        setDetails({
            ...details,
            [name]: value
        })
    };

    const handleSubmit = async () => {
        if (details.title !== '' && details.body !== '') {
            const response = await mutateFunction({
                variables: {
                    ...details,
                    repositoryId
                }
            });
            handleUpdateOpenedIssues(response?.data?.createIssue?.issue)
            handleModalChange();
        }
        else {
            alert('Title and Body are both required fields')
        }


    }



    return <div className={`${!isVisible && 'hidden'} fixed z-10 inset-0 overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            Open New Issue
                        </h3>
                        <div className="mt-2">
                            <label className="font-semibold">* Title</label>
                            <TextField onChange={handleInputChange} name="title" />
                        </div>
                        <div className="mt-2">
                            <label className="font-semibold">* Description</label>
                            <TextAreaField
                                name="body"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button onClick={handleSubmit} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                        Submit
                    </button>
                    <button onClick={handleModalChange} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default CreateIssueModal;