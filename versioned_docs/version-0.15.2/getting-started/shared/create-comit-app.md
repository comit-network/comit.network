The `create-comit-app` allows you to create a template COMIT App which includes working examples.
To create your template app in the `my-app` directory, just do:

```
yarn create comit-app my-app
```
```
yarn create v1.21.1
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Installed "create-comit-app@0.8.3" with binaries:
      - create-comit-app
First time execution, downloading create-comit-app 0.8.3...✓
Your project `my-app` has been created!
✨  Done in 7.09s.
```

Let's have a look at what we have here:

```
cd my-app
tree # You can alternatively use `ls -R`
```
```
.
├── README.md
├── demos
│   ├── btc_eth
│   │   ├── README.md
│   │   ├── package.json
│   │   ├── src
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   ├── tslint.json
│   │   └── yarn.lock
│   └── erc20_btc
│       ├── README.md
│       ├── package.json
│       ├── src
│       │   └── index.ts
│       ├── tsconfig.json
│       ├── tslint.json
│       └── yarn.lock
├── examples
│   ├── README.md
│   └── btc_eth
│       ├── README.md
│       ├── package.json
│       ├── src
│       │   ├── lib.ts
│       │   ├── maker.ts
│       │   └── taker.ts
│       ├── tsconfig.json
│       ├── tslint.json
│       └── yarn.lock
├── package.json
└── src
    └── index.js

9 directories, 24 files
```

- `.` is where you can start writing your app, see [write your app tuto](../../tutorials/write-your-first-comit-app/create-app.md) 
- `./package.json` contains some useful dependencies for your app
- `./examples` contains projects that are made to inspire developers such as yourself to build their app
- `./demos` contains projects which are catered for workshops demonstration. They do not have a conventional structure but have verbose output.
