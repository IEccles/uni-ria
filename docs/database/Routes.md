# Creating Routes

Now that you have created a model you can now create a route. A route is like an API as the front end will request some data and the backend fetches the data. So essentially this RIA is just one big API as without data there is no RIA. You can create a route file in the `src/routes` folder and follow the naming convention for example this human route would be called `humans.routes.ts`.

Now enough boring talk lets create some basic routes that we can use to fetch all humans, add a human and fetch a single human.

First lets create the route folder and import needed modules.

```ts
'use strict';

import { validateEmail } from '../utils/validation';
import Humans from '../models/humans';
import express, { Request, Response } from 'express';

const router = express.Router();
```

Here we `'use strict';` so that way our code is nicely formatted using eslint this is to make sure code meets good standards and the any type can't just be randomly used as that's bad practice. We have to import the model from our models folder and you can call it anything as long as the from points to the correct file. So instead of `Humans` I could've called it `Hamburger` if I wanted as long as that from didn't change. We also import express for our router to route us to the database with the types Request and Response. Those two types will be very self explanitory when we create a route.

Lets now create a simple route that fetches all humans in the database and returns them:

```ts
router.get('/api', (req: Request, res: Response) => {
    Humans.findAll()
        .then((humans) => {
            return res.status(200).json({
                code: 200,
                data: {
                    humans: humans
                }
            })
        }).catch((err: Error) => {
            console.log(err)
            return res.status(500).json({
                code: 500,
                error: 'Internal server error'
            })
        })
})
```

Here you have created your first route which fetches all humans in the database. So first you use the `router.` and then you choose the operation which will either be `get`, `post` or `delete` in this RIA. Then we get add the arguments `req` and `res` to this arrow function. Who would've guessed that these use the request and response types. 

Once we are in the arrow function we then call the model and ask it to `findAll` humans. We then return the status 200 which means successful and then we return the data humans as that is what we fetched. We then catch any errors so if there is an error we get a status 500 which means there was an internal server error. This sounds scarier than it is as most the time this is caused by something very basic. But we catch the error and log it so we know what went wrong and return the fact there was an error. Oh and the caught error uses the Error type.

Now that you know how to fetch all lets fetch a single human by there ID:

```ts
router.get('/api/s/:id', (req: Request, res: Response) => {
    const id = req.params.id as string;

    if (!id || id === '') {
        return res.status(400).json({
            code: 400,
            error: 'ID is required'
        })
    }

    Humans.findByPk(id)
        .then((human) => {
            if (human === null) {
                return res.status(404).json({
                    code: 404,
                    error: 'Human not found'
                })
            }

            return res.status(200).json({
                code: 200,
                data: {
                    human: human
                }
            })
        }).catch((err: Error) => {
            console.log(err)
            return res.status(500).json({
                code: 500,
                error: 'Internal server error'
            })
        })
});
```

Just like that you've fetched a single human. First instead of having no parameters in the URL we add the ID in the parameter. Just like the previous route we have request and response.

We create a constant variable called ID and add the ID from the request to that variable. To do that we must access the request with `req` then the parameters we have set with `.params` and because we called it id we add `.id` and just like that we can access the ID given. We assign it as a string as everything passed to the backend will most likely be a string except in very rare cases but lets not worry about that at this point.

We then must check the ID is not `null`, `undefined` or `NaN` so we use `!id` to check the ID actually has a value. After that we then say or with `||` and check that the id is not an empty string. So essentially we say if the is nothing or an empty string return saying we need that ID for this request. This is status 400 as it was a bad request then.

Next we fetch the single human using `findByPk` which means find by primary key which is the ID. We then assign that the variable human and we check that human isn't null. If the human is null we return status 404 as this means we did not find the human in the database. The reason we use `===` instead of `==` is because rather than just checking they match we check the type with the triple equals as well. If the human is not null we return 200 status with the human data that we fetched. 

If we catch an error we return status 500 like before and log the error for debugging.

# Post requests

Now we'll create a post request that will put a new human in the database. To do this we will now be using `router.post`

```ts
router.post('/api', (req: Request, res: Response) => {
    const body = req.body;

    if (!body.firstname || body.firstname === '') {
        return res.status(400).json({
            code: 400,
            error: 'Firstname is required'
        })
    }

    if (!body.lastname || body.lastname === '') {
        return res.status(400).json({
            code: 400,
            error: 'Last name is required'
        })
    }

    if (!body.email || body.email === '') {
        return res.status(400).json({
            code: 400,
            error: 'Email is required'
        })
    }

    Humans.create(body)
        .then((human) => {
            return res.status(200).json({
                code: 200,
                data: {
                    human: human
                }
            })
        }).catch((err) => {
            console.log(err)
            return res.status(500).json({
                code: 500,
                error: 'Internal server error'
            })
        })
})
```

Here you can see the `router.post` and we set the route to `/api`. You may think won't this clash with the get that also uses the route `/api` and no because this is a post request so the front end fetch will understand the difference when they specify what type of fetch they are performing.

Post requests contain a body that will have all the data needed for the request and to access it once again it is within the request but this time we are accessing the body so `req.body`. We then check all required data is there that's why there's no check for the middle name as it's not required so we don't care if it's there or not.

We then create the human by accessing the model and using the `.create` Sequelize function and give it the argument of the body. This will work as long as the json tags match the row names. So for example if the body was:

```
{
    first_name: 'bob'
}
```

This wouldn't work as our row is called firstname so to fix this instead we would create our own object called data and fill it correctly:

```ts
const data = {
    firstname: body.first_name
}
```

Now the tag matches our row name so there's no conflicts or you could directly input like so:

```ts
Humans.create({
    firstname: body.first_name
})
```

Once data is inputted we follow the same formula as all the other requests by returning the status 200 with the data we just created. If there is an error we catch it, log it and return it.

# Export the router

Exporting the router is critical otherwise the routes won't work

To do this at the end of the file we add a simple line of code 

`export default router;`

Now that the router is exported we have to include it in our `router.ts` file located in `src`. Once in `router.ts` import it at the top with the other routes.

`import humans from './routes/humans.routes';`

Now that you have done that you must tell our RIA to use it. To do this scroll to the bottom of the page with the `e.use()` functions and at the bottom within the squigly brackets add our human route to it like so:

`e.use('/humans', humans)`

The first argument you can call `/(anything)` as long as humans is imported correctly. Now the frontend can access those backend routes. For example if they wanted to get all humans they would fetch the url `/humans/api`.