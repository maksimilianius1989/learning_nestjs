Nest.js - лучший бэкэнд фреймворк | Полный курс 2025

[YouTube Course](https://www.youtube.com/watch?v=HT6cm4GoSIw)<br>
[Github](https://github.com/maksimilianius1989/learning_nestjs)

```npm install -g @nest/cli```

```nest --version```

```nest new <project name>``` - створення проекту

```yarn start:dev```

**Налаштування для дебагу**
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "NestJS Debug",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "node",
      "runtimeArgs": [
        "--inspect",
        "-r",
        "ts-node/register"
      ],
      "args": [
        "${workspaceFolder}/src/main.ts"
      ],
      "cwd": "${workspaceFolder}",
      "autoAttachChildProcesses": true,
      "sourceMaps": true
    }
  ]
}
```

Структура проекта NestJS
- module - контейнер, який структурує всі компоненти для вирішення конкретної задачі. Це части на додатку яка відповідає за певну частину функціоналу
- service - взаємодія з БД, перевірка даних
- controller - це ті компоненти, які приймають входящі http запити і передають на обробку сервісу

Генерація сутностів:
+ ```nest generate resource <resource name>```
+ ```nest g res <name>```
+ ```--no-spec``` - без тестів
