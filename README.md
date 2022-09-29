<img src="./public/icons/favicon.ico" alt="Logo of the project" align="right">

# Linklip-Client 

<img src="https://user-images.githubusercontent.com/55964775/192938922-bf48a171-b361-42ae-bf31-4ae7877110ee.png" align="center" alt="Logo Meaning">
> 어떻게 하면 다양한 형태의 순간적인 정보를 간편하게 저장하고 체계적으로 관리할 수 있을까? <br>
> 여러분들의 효율적인 정보 관리를 위한 최고의 수단, 링클립입니다.


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
    │   └── manifest.json
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
    │   ├── ...
    │   ├── App.tsx
    │   └── main.tsx
    │
    ├── index.html
    ├── pakage.json
    ├── ...
    └── sw.js

<br />

## API Reference
[Link to API Reference](http://3.34.93.16:8080/swagger-ui.html)
<br />

## License

