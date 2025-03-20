# Backend Task Server 🚀

Task App Server

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

## Clone this project

```bash
  git clone git@github.com:sanjivpaul/backendtask.git
```

## Installation

Install all dependencies after cloning the repository & start server

```bash
  npm install
  npm run dev
```

## Environment Variable Setup

```env
MONGODB_URI=your_db

PORT=3000
CORS_ORIGIN=*

ACCESS_TOKEN_SECRET=Your_secret_token
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=Your_secret_token
REFRESH_TOKEN_EXPIRY=10d

```

## API Reference

#### Signup

```http
  POST /auth/signup
```

| Parameter  | Type     | Description                                      |
| :--------- | :------- | :----------------------------------------------- |
| `email`    | `string` | **Required**. The email of the user to register. |
| `fullName` | `string` | **Required**. The full name of the user.         |
| `password` | `string` | **Required**. The password of the user.          |
| `username` | `string` | **Required**. The user's username.               |

#### Login

```http
  POST /auth/login
```

| Parameter  | Type     | Description                                   |
| :--------- | :------- | :-------------------------------------------- |
| `email`    | `string` | **Required**. The email of the user to login. |
| `password` | `string` | **Required**. The password of the user.       |

#### Create Task

```http
  POST /tasks
```

| Parameter     | Type     | Description                           |
| :------------ | :------- | :------------------------------------ |
| `title`       | `string` | **Required**. Title of the task       |
| `description` | `string` | **Required**. Description of the task |
| `status`      | `string` | **Required**. Status of the task      |
| `priority`    | `string` | **Required**. Priority of the task    |
| `due_date`    | `string` | **Required**. Due date of the task    |

#### Get All Task

```http
  Get /tasks
```

#### Get Task By Id

```http
  Get /tasks/:id
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**. Id of the task |

#### Update Task By Id

```http
  PUT /tasks/:id
```

| Parameter     | Type     | Description                           |
| :------------ | :------- | :------------------------------------ |
| `title`       | `string` | **Required**. Title of the task       |
| `description` | `string` | **Required**. Description of the task |
| `status`      | `string` | **Required**. Status of the task      |
| `priority`    | `string` | **Required**. Priority of the task    |
| `due_date`    | `string` | **Required**. Due date of the task    |

#### Delete Task By Id

```http
  Delete /tasks/:id
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**. Id of the task |

## License

[MIT](https://choosealicense.com/licenses/mit/)
