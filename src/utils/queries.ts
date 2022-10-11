import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetProjects($title: String) {
    projects(where: { title: { _eq: $title } }) {
      id
      title
      todos {
        id
        title
      }
    }
  }
`;

/* export const GET_PROJECT_BY_TITLE = gql`
  query ($title: String) {
    projects(where: { title: { _eq: $title } }) {
      id
      title
      todos {
        id
        title
      }
    }
  }
`; */
