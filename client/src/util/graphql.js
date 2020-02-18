import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
{
    getTimes{
      id
      body
      miles
      time
      createdAt
      username
      likeCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
  }
}
`;