# Movie-service


## Running server

  ```npm run code:run```


## API Docs


- Get movie by title
- Get movies by filter 
- Update rating, genre of movie by Id


   **1. Get movie by title** 

   > Method: GET

   > URL: ```{{movie_url}}/movies/:title```


   > Success Response(200):

   ```
          {
              success: true,
              data: {
                  id: <string>,
                  title: <string>,
                  release_year: <string>,
                  rating: <number>,
                  genres: <string[]>
              }
          }
   ```

   > Error Response(404,500):

   ```
    {
       message: <error message for no entity, validation of request data>
     }
   ```


   **2. Get movies by filter**

   > Method: POST

   > URL: ```{{movie_url}}/movies```

   > Request Body: 

   ```
     {
       "id": <string>,
       "year": Array<String Date with pattern YYY>,
       "genres": <string[]>,
       "rating": {
         "operator": <string as enum["GT","LT","GTE","LTE","EQ"]>,
         "value": <number>
        }
      } 
   ```

   > Success Response(200):

   ```
          {
              success: true,
              data: Array<{
                  id: <string>,
                  title: <string>,
                  release_year: <string>,
                  rating: <number>,
                  genres: <string[]>
              }>
          }
   ```

   > Error Response(404,500):

   ```
    {
       message: <error message for no entity, validation of request data>
     }
   ```


   **3. Update rating, genre of movie by Id**

   > Method: PUT

   > URL:  ```{{movie_url}}/movies/:id```

   > Request Body: 

   ```
     {
       "genres": <string[]>,
       "rating": {
         "operator": <string as enum["GT","LT","GTE","LTE","EQ"]>,
         "value": <number>
        }
      } 
   ```

   > Success Response(200):

   ```
          {
              success: true,
              data: Movie updated successfully
          }
   ```

   > Error Response(404,500):

   ```
    {
       message: <error message for no entity, validation of request data>
     }
   ```