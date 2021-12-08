import {
    useMutation,
    useQuery
} from "@apollo/client";

const useApiQuery = (query, variables = {}) => {
    const { error, loading, data } = useQuery(query, variables);

    return {
        error,
        loading,
        data
    };
};

const useApiMutation = mutation => {
    const [mutateFunction, { data, loading, error }] = useMutation(mutation);

    return {
        mutateFunction, data, loading, error
    };
}


export {
    useApiMutation,
    useApiQuery
};