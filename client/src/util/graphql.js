import gql from 'graphql-tag';

export const FETCH_USER_DATA_QUERY = gql`
  query($username: String!) {
    getUserData(username: $username) {
      name
      createdAt
      runStats {
        totalMiles
        totalTime
      }
    }
  }
`;

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