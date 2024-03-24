# Как запустить

### Запуск через контейнер

```bash
docker run --name todo_list_database -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres
```
