# Linklip-Client

## Demo

## Quick Start
### 0) Requirments
- Make sure your NodeJS and npm (or yarn) versions are up to date


### 1) Download
- [Download the latest version](https://github.com/SoftwareMaestro-LinkLip/LinkLip-Client/archive/refs/heads/develop.zip)

or

- Clone the repository
```bash
$ git clone https://github.com/SoftwareMaestro-LinkLip/LinkLip-Client.git
```

### 2) Installation

```bash
$ yarn install
```

or

```bash
$ npm install
```

### 3) Basic Usage
- start server
```bash
$ yarn dev
```

or

```bash
$ npm dev
```

- Navigate to [http://localhost:3000](http://localhost:3000)


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
