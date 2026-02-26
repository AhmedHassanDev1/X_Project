import { gql } from "@apollo/client";


export const globalFragment = gql`
    fragment PostFragment on Post {
       _id
        text
        type
        createdAt
    }  

    fragment UserFragment on Author { 
       _id
       name
      image 
      isFollow
    }
     
    fragment MediaFragment on Media {
            _id
            url
            width
            height
            type
            format
            thumbnail
         }
 `;
// -r --- IGNORE ---
// End of recent edits