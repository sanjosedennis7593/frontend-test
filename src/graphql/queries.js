import {
    gql
} from "@apollo/client";

const USER_QUERY = gql`
    query getUsers($keyword: String!) {
        search(query: $keyword, type: USER, first: 15) {
            userCount
            edges {
            cursor
            node {
                ... on User {
                    id
                    name
                    login
                    email
                    bio 
                    avatarUrl
                    company 
                    location 
                    createdAt 
                }
            }
        }
    }
}
`;


const REPOSITORY_BY_USER_QUERY = gql`
    query getRepositoryByUser($keyword: String!, $after: String, $before: String) {
        repositoryOwner(login: $keyword) {
            repositories(first: 10, after: $after, before: $before, orderBy: {field: STARGAZERS, direction: DESC}) {
                totalCount
                pageInfo {
                    startCursor
                    hasNextPage
                    hasPreviousPage
                    endCursor
                }
                nodes {

                    id
                    name
                    description
                    projectsUrl
                    stargazerCount
                    watchers {
                        totalCount
                    }
                }
            }
        }
    }
`;

const REPOSITORY_BY_USER_ISSUES_QUERY = gql`
    query getRepositoryByUserIssues($owner: String!, $repositoryName: String!, $after: String, $before: String) {
        repository(owner: $owner, name: $repositoryName) {
            openIssues: issues(states: OPEN, first: 10, after: $after, before: $before) {
                totalCount
                pageInfo {
                    startCursor
                    hasNextPage
                    hasPreviousPage
                    endCursor
                }
                nodes {
                    title
                    url
                    author {
                        login
                    }
                }
                  
            }
        }
    }
`

export {
    USER_QUERY,
    REPOSITORY_BY_USER_QUERY,
    REPOSITORY_BY_USER_ISSUES_QUERY
}