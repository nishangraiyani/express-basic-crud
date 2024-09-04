# Express MongoDB TypeScript CRUD

Welcome to the **express-mongoose-ts-crud-generic** repository! This project provides a solid foundation for building an Express.js application with MongoDB integration, all written in TypeScript. It comes with a generic class for hassle-free CRUD operations on MongoDB collections.

## Getting Started

### Prerequisites

Make sure you have the essentials installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nishangraiyani/express-mongoose-ts-crud-generic.git
   ```

2. Install dependencies:

   ```bash
   cd express-mongoose-ts-crud-generic
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory with taking reference from the `.env.example` file:

   ```env
   PORT=5001
   DATABASE_URL="YOUR_DATABASE_URL"
   ```

   Don't forget to replace `YOUR_DATABASE_URL` with the name of your MongoDB database.

### Running the Application

Fire up the application in development mode:

```bash
npm run dev
```

The server will kick off on `http://localhost:5001`.

## Generic CRUD Operations

Included is a slick generic class (`GenericService`) ready to handle all your CRUD operations on MongoDB collections. This class is extensible, making it easy to tailor for different models.

### User Model Configuration

In `services/userService.ts`, the User model is configured as follows:

```typescript
import { Model } from "mongoose";
import { User, UserModel } from "../models/user.model";
import { GenericService } from "./generic.service";

export class UserService extends GenericService<User> {
  constructor(model: Model<User>) {
    super(model);
  }

  // Override the common create method if needed
}

const userService = new UserService(UserModel);
export const createUser = userService.create;
export const getAllUser = userService.getAll;
export const getByIdUser = userService.getById;
export const updateUser = userService.update;
export const deleteUser = userService.delete;
```

Feel free to customize the `UserService` class for any specific functionality related to the User model or override the default created methods.

### User Routes

In `routes/userRoute.ts`, routes for the User model are defined using the UserService:

```typescript
import { Router } from "express";
import { UserService } from "../services/user.service";
import { UserModel } from "../models/user.model";

const router = Router();
const userServices = new UserService(UserModel);

router.post("/", userServices.create);
router.get("/", userServices.getAll);
router.get("/:id", userServices.getById);
router.put("/:id", userServices.update);
router.delete("/:id", userServices.delete);

export const userRouter = router;
```

Feel free to tweak and extend the generic class for your unique models and business logic.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. Happy coding!

 
## Running the Application

Start the application in development mode:

```bash
npm run dev
```

The server will be accessible at `http://localhost:5001`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. Happy coding!