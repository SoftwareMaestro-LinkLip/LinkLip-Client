<img src="./public/icons/favicon.ico" alt="Logo of the project" align="right">

# Linklip-Client 

<img src="https://user-images.githubusercontent.com/55964775/192938922-bf48a171-b361-42ae-bf31-4ae7877110ee.png" align="center" alt="Logo Meaning">

<br>

> 어떻게 하면 다양한 형태의 순간적인 정보를 간편하게 저장하고 체계적으로 관리할 수 있을까? <br>
> 여러분들의 효율적인 정보 관리를 위한 최고의 수단, 링클립입니다.


<img src="https://user-images.githubusercontent.com/55964775/210127124-36243497-09a9-4a7b-a8a4-c407f218e15a.png" align="right" width="30%" alt="phone">

<img src="https://user-images.githubusercontent.com/55964775/210127149-db13dae2-2a36-4203-a06e-5631b8d15ef0.png" align="center" width="60%" alt="laptop">

![Frame 93](https://user-images.githubusercontent.com/55964775/212297791-f604a00e-e705-4163-a0aa-512ff0f74196.png)
![Frame 94](https://user-images.githubusercontent.com/55964775/212297808-3af9b22b-5cbb-4a12-966d-c5b6430cd113.png)
![Frame 95](https://user-images.githubusercontent.com/55964775/212297815-1c551185-2371-42df-bf3c-345a44cfbeae.png)
![Frame 96](https://user-images.githubusercontent.com/55964775/212297826-ce3f0c04-53bc-4e91-ad51-8c897b6a3e71.png)
![Frame 98](https://user-images.githubusercontent.com/55964775/212297832-6f0a4b8f-4601-44cc-bba6-1bf486530c45.png)
![Frame 97](https://user-images.githubusercontent.com/55964775/212297829-b68ef8d3-564b-449d-b8f0-8ec84118ddac.png)

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

## Developing
### Built With
- React
- React Router
- TypeScript
- Tailwind CSS
- AWS Amplify
- PWA

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

