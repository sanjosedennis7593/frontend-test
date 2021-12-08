import {
    gql
} from "@apollo/client";

const CREATE_ISSUE_MUTATION = gql`
    mutation CreateIssue($repositoryId: String!, $title: String, $body: String) {
        createIssue(input: {repositoryId: $repositoryId, title: $title, body: $body}) {
            issue {
                number
                body
                title
                author {
                    login
                 }
                }
        }
    }

`;



export {
    CREATE_ISSUE_MUTATION
};