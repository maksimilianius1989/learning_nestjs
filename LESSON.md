Nest.js - лучший бэкэнд фреймворк | Полный курс 2025

00:28

https://www.youtube.com/watch?v=HT6cm4GoSIw

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