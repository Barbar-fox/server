# API DOCUMENTATION BOOK. ME

**Title**
----
  create user

* **URL**`

`/users/register` 

* **Method:**

`POST` 
  

*  **URL Params**

   **Required:**
 
`None` 

   **Optional:**
 
`None` 

* **Data Params**

`name, email, password` 

* **Success Response:**

  + **Code:** 201 <br />

    **Content:** `{ 
      "id": ...,
    "name": "...",
    "email": "...",
    "password": "...",
    "updatedAt": "...",
    "createdAt": "..."
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

**Title**
----
  login user

* **URL**`

`/users/login` 

* **Method:**

`POST` 
  

*  **URL Params**

   **Required:**
 
`None` 

   **Optional:**
 
`None` 

* **Data Params**

`email, password` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{ 
      "token" : "..."
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

* **Code:** 404 <br />

    **Content:** `{ msg : 'email / password is wrong' }` 

**Title**
----
  login google sign in

* **URL**`

`/users/gSignIn` 

* **Method:**

`POST` 
  

*  **URL Params**

   **Required:**
 
`None` 

   **Optional:**
 
`None` 

* **Data Params**

`idToken` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{ 
      "token" : "..."
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

**Title**
----
  get all Hotels

* **URL**

`/hotels` 

* **Method:**

`GET` 
  

*  **URL Params**

   **Required:**
 
`None` 

   **Optional:**
 
`None` 

* **Data Params**

`None` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `[
       { data }
       ]`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

**Title**
----
  get one hotel

* **URL**

`/hotels/:id` 

* **Method:**

`GET` 
  

*  **URL Params**

   **Required:**
 
`id` 

   **Optional:**
 
`None` 

* **Data Params**

`None` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{ 
      "id": "...",
    "name": "...",
    "location": "...",
    "price": ...,
    "createdAt": "...",
    "updatedAt": "..."
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

    OR

   * **Code:** 404 <br />

    **Content:** `{ msg : "......" }` 


**Title**
----
  create hotel

* **URL**`

`/hotels` 

* **Method:**

`POST` 
  

*  **URL Params**

   **Required:**
 
`None` 

   **Optional:**
 
`None` 

* **Data Params**

`name, location, price` 

* **Success Response:**

  + **Code:** 201 <br />

    **Content:** `{ 
      "id": "...",
    "name": "...",
    "location": "...",
    "price": ...,
    "createdAt": "...",
    "updatedAt": "..."
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

  OR

  + **Code:** 400 <br />

    **Content:** `{ errors : [....] }` 


**Title**
----
  update hotel

* **URL**

`/hotels/:id` 

* **Method:**

`PUT` 
  

*  **URL Params**

   **Required:**
 
`id` 

   **Optional:**
 
`None` 

* **Data Params**

   `name, location, price`

* **Success Response:**

  + **Code:** 201 <br />

    **Content:** `{ 
      "msg": "Hotel with id 3 has been updated"
      }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ "msg" : 'there's no hotel with id ${req.params.id}' }` 

  OR

  + **Code:** 404 <br />

    **Content:** `{ "msg" : "there's no hotel with id ${req.params.id}" }` 
    

   OR

   * **Code:** 400 <br />

    **Content:** `{ errors: ['.....', '......'] }` 


**Title**
----
  delete hotel

* **URL**

`/hotels/:id` 

* **Method:**

`DELETE` 
  

*  **URL Params**

   **Required:**
 
`id` 

   **Optional:**
 
`None` 

* **Data Params**

`None` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{ 
       "msg" : "hotel with id ${req.params.id} has been deleted"

   }`
 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

    OR

   * **Code:** 404 <br />

    **Content:** `{ msg : "there's no data with id ${req.params.id}" }` 


**Title**
----
  create UserHotel

* **URL**`

`/bookings` 

* **Method:**

`POST` 
  

*  **URL Params**

   **Required:**
 
`None` 

   **Optional:**
 
`None` 

* **Data Params**

`HotelId, date` 

* **Success Response:**

  + **Code:** 201 <br />

    **Content:** `{ 
      "id": "...",
    "name": "...",
    "location": "...",
    "price": ...,
    "createdAt": "...",
    "updatedAt": "..."
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

  OR

  + **Code:** 400 <br />

    **Content:** `{ errors : [....] }` 


**Title**
----
  get UserHotel

* **URL**`

`/bookings/:id` 

* **Method:**

`GET` 
  

*  **URL Params**

   **Required:**
 
`id` 

   **Optional:**
 
`None` 

* **Data Params**

`None` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{ 
       "id": ...,
    "HotelId": ...,
    "UserId": ...,
    "date": "...",
    "createdAt": "...",
    "updatedAt": "...",
    "Hotel": {
        "id": ...,
        "name": "...",
        "location": "...",
        "price": ...,
        "createdAt": "...",
        "updatedAt": "..."
    },
    "User": {
        "id": ...,
        "name": "..."
    },
    "resto": [
        {
            "title": "...",
            "description": "...",
            "image_url": "..."
        }
    ],
    "weather": "...",
    "holiday": {
        "isHoliday": Boolean,
        "additionalPriceHoliday": 500000
    }
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 


**Title**
----
  delete UserHotel

* **URL**

`/bookings/:id` 

* **Method:**

`DELETE` 
  

*  **URL Params**

   **Required:**
 
`id` 

   **Optional:**
 
`None` 

* **Data Params**

`None` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{ 
       `"messsge": 'Success delete bookings with id ${userHotelId}'`
   }`
 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

    OR

   * **Code:** 404 <br />

    **Content:** `{ msg : "there's no data with id ${req.params.id}" }` 
