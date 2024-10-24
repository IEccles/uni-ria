# Fetch Requests

Fetch requests is what we will be using to GET and POST data to and from the database. Fetch requests will either be GET, POST or
DELETE.

# Get Request

First we will start with a basic GET request using humans. First we will need to know the routes name so we will go to the router
in `src` and find the main route name we want to use (we'll use humans in this case).

```js
fetch('/humans/api')
    .then(res => res.json())
    .then((data) => {
        if (data.code === 200) {
            // Do something with the data
        }
    }).catch((err) => {
        // Log the error for debugging
        console.log(err)
    })
```

The first part of the route is the URL that we need to get the data so in router there would be a route defined as humans. Then we go to the routes file and locate the human routes. In this case we use the route that has the URL `/api` this then creates our full URL of `/humans/api`.

After that we need to turn the response into a JSON so we can access the data. We then check the data has the code 200 which is a success code and we would do something using that data. If we catch an error then we log the error for easier debugging and we wouldn't be able to do anything with the data so we just perform the log statement.