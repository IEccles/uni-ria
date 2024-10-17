# Creating a model

Creating a model is a lot like creating a migration minus the creating a file command. To create a model navigate to `src/models`.
Now create a new file in there and call it something reasonable for example our migration was to create humans so we'll call the 
model `humans.ts`. Please don't forget the .ts file extension as that's how the computer knows it's a TypeScript file.

```ts
'use strict';

import { Model } from 'sequelize';
import sequelize, { DataTypes } from '../database';
import { config as dotenv } from 'dotenv';

dotenv();

const Humans = (sequelize, DataTypes) => {
  class Humans extends Model {

    id: number;
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;

  }
  User.init({
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middlename: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      },
    },
  }, {
    sequelize,
    modelName: 'Humans',
  });
  return Humans;
};

const model = Humans(sequelize, DataTypes)

if (process.env.NODE_ENV === 'development') {
  model.create({
    firstname: 'Mike',
    lastname: 'Steel',
    email: 'mikesteel@test.com'
  }).catch(() => {
    //console.error(err);
  });
}

export default model;
```

# Explanation

As you can see at the start of the example you have to define the rows within the model and give them a type. Technically you don't need to give them a type but then what would be the point of using TypeScript also it allows us to perform type checks.

Once this is done you need to then initialise the model which is a lot like what you did in the migration except instead of `Sequelize.(type)` it is now `DataTypes.(type)`. Once again you can use the same stuff like `allowNull`, `defaultValue` and `unique`. The only things you don't need to initialise is the ID, createdAt and updatedAt. As you can see on email we do validate that it is an email so the user can't just put in random data it will have to resemble an email structure like test@test.com

Now before you export the model for use we can actually add data to it if we want so when the database migration runs it adds this data. First run the function to create the model and now in the .env it will check the `NODE_ENV` and if it is development it will create Mike Steel. Now the reason we comment out the error is because the model will keep trying to create Mike Steel but because he already exists the model can't so it would give us an error saying this so we just ignore it. This does not cause any issues though it is simply just to not clutter the terminal.

Now we can export the default model which can be used for routes to access the database.