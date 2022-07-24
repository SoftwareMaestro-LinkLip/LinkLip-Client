<img src="./public/icons/favicon.ico" alt="Logo of the project" align="right">

# Linklip-Client &middot;

## Quick Start
### Prerequisites
- Make sure your NodeJS and yarn (or npm) versions are up to date


### Download
- [Download the latest version](https://github.com/SoftwareMaestro-LinkLip/LinkLip-Client/archive/refs/heads/develop.zip)

or

- Clone the repository
```bash
$ git clone https://github.com/SoftwareMaestro-LinkLip/LinkLip-Client.git
```

### Installation

```bash
$ yarn install
```

or

```bash
$ npm install
```

### Basic Usage
- start server
```bash
$ yarn dev
```

or

```bash
$ npm dev
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
- Editor: install `Visual Studio Code` or `WebStorm`
- Editor tools:
  > - install `ESLint`, `Prettier` extensions(plugins).
  > - turn `formatOnSave` option on.
- global dependencies: make sure your NodeJS and yarn (or npm) versions are up to date

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
    │   ├── css/            # css/scss styles
    │   ├── hooks/          # custom hooks
    │   ├── images/         # images, icons, etc.
    │   ├── pages/          # application views
    │   ├── typings/        # types for typescript
    │   ├── utils/          # utilities
    │   ├── ...
    │   ├── App.tsx
    │   └──  main.tsx
    │
    ├── index.html
    ├── pakage.json
    ├── ...
    └── sw.js

<br />

## API Reference

<br />

## License

