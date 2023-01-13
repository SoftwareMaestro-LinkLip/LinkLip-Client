<img src="./public/icons/favicon.ico" alt="Logo of the project" align="right">

# Linklip-Client 

## Overview
<br>
<img src="https://user-images.githubusercontent.com/55964775/192938922-bf48a171-b361-42ae-bf31-4ae7877110ee.png" align="center" alt="Logo Meaning">

<br>

> 어떻게 하면 다양한 형태의 순간적인 정보를 간편하게 저장하고 체계적으로 관리할 수 있을까? <br>
> 여러분들의 효율적인 정보 관리를 위한 최고의 수단, 링클립입니다.


<img src="https://user-images.githubusercontent.com/55964775/210127124-36243497-09a9-4a7b-a8a4-c407f218e15a.png" align="right" width="30%" alt="phone">

<img src="https://user-images.githubusercontent.com/55964775/210127149-db13dae2-2a36-4203-a06e-5631b8d15ef0.png" align="center" width="60%" alt="laptop">

![Frame 93](https://user-images.githubusercontent.com/55964775/212302897-13ce5ce9-3a77-46f3-832a-6d04975ed18e.png)
![Frame 94](https://user-images.githubusercontent.com/55964775/212302929-0393d152-3858-4518-b714-4e0fcc81507d.png)
![Frame 95](https://user-images.githubusercontent.com/55964775/212302941-5e17635e-22c1-466e-b5a8-6fe79434c71f.png)
![Frame 96](https://user-images.githubusercontent.com/55964775/212302946-b356e6b5-30ae-4a00-98b3-676037c1dd8a.png)
![Frame 98](https://user-images.githubusercontent.com/55964775/212302954-f120eeb6-d316-4c52-b7a5-218bfa3ecff1.png)
![Frame 97](https://user-images.githubusercontent.com/55964775/212302951-d4fda146-9ae2-4711-bb1f-4ad670a80027.png)


## Developing
### Built With
![skills](https://user-images.githubusercontent.com/55964775/212307993-e048d12f-1ffd-4369-ac2d-7449a7652f2b.png)
- React
- React Router
- Vite
- Tailwind CSS
- AWS Amplify
- PWA
- TypeScript

### Prerequisites
- Install editor `Visual Studio Code` or `WebStorm`
- Install `ESLint`, `Prettier` extensions(plugins) in the editor.
  - `ESLint`: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
  - `Prettier`: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- Turn the `formatOnSave` option on.
- Make sure your `NodeJS` and `yarn` versions are up to date

### Setting up Dev
```bash
$ git clone https://github.com/SoftwareMaestro-LinkLip/LinkLip-Client.git
$ cd LinkLip-Client
$ yarn install
```

### Deploying / Publishing
- Make pull request to main branch and merge it.
- Check building success in AWS Amplify.

<br />

## Quick Start
### Prerequisites
- Make sure your NodeJS and yarn versions are up to date


### Download
- [Download the latest version](https://github.com/SoftwareMaestro-LinkLip/LinkLip-Client/archive/refs/heads/develop.zip)

or

- Clone the **repository**
```bash
$ git clone https://github.com/SoftwareMaestro-LinkLip/LinkLip-Client.git
```

### Installation

```bash
$ yarn install
```

### Basic Usage
- start server
```bash
$ yarn dev
```

- Navigate to [http://localhost:3000](http://localhost:3000)

<br />

## Directory Structure

    linklip-client
    ├── public/             # static files
    │   ├── icons/          # icon images for mobile
    │   ├── manifest.json
    │   └── sw.js
    │
    ├── src/                # project root
    │   ├── assets/         
    │   │   ├── css/        # css/scss styles
    │   │   └── images/     # images, icons, etc.
    │   │
    │   ├── hooks/          # custom hooks
    │   ├── pages/          # application views
    │   ├── partials/       # components
    │   ├── stores/         # atoms, selectors for Recoil
    │   ├── typings/        # types for typescript
    │   ├── utils/          # utilities
    │   ├── App.tsx
    │   ├── ...
    │   └── main.tsx
    │
    ├── env
    ├── env.production
    ├── index.html
    ├── pakage.json
    ├── ...
    └── yarn.lock

<br />

