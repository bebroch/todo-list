



### POST /api/v1/task

Создание задачи.

Принимает объект в body такого вида:

```json
{
    // Заголовок задачи
    "title": "title of task",

    // Теги задачи
    "tags": ["tag1", "tag2"],

    // Описание задачи
    "description": "description of task",

    // Статус задачи
    "status": "offered"
}
```

#### Ответ 200 OK

```json
{
    "id": 1,
    "title": "title of task",
    "description": "description of task",
    "status": "offered",
    "created_date": "2024-03-14T18:48:47.076Z",
    "updated_date": "2024-03-14T18:48:47.076Z",
}
```

#### Ответ 400 Bad Request
Означает, что были пропущены некоторые поля или их типы некорректны. 

```json
{
    "message": [
        "title must be a string",
        "title should not be empty",
        "description must be a string",
        "description should not be empty",
        "status must be a string",
        "status should not be empty",
        "date must be a Date instance"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```

#### Ответ 500 Internal server error
Ошибка сервера.

```json
{
    "statusCode": 500,
    "message": "Internal server error"
}
```