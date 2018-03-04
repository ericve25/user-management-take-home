# rednote-take-home

This project contains a small API to provide user registration and contact management.

## Prerequisites

To run the API locally, make sure to have the following pieces set up before starting.

### PostgreSQL

This API uses PostgreSQL as it's persistent storage.

1. Install [PostgreSQL](https://postgresapp.com/)
1. (optional) Install an admin tool such as [pgAdmin](https://www.pgadmin.org/download/pgadmin-4-macos/)
   * If using pgAdmin - [configure for localhost](https://www.pgadmin.org/docs/pgadmin4/dev/server_dialog.html#server-dialog)

## Local Dev Setup for Mac OS X

1. NodeJS can be installed however you wish:  [homebrew](http://brew.sh/), [n](https://github.com/tj/n), or directly from the [NodeJS website](https://nodejs.org/en/).  This documentation uses [nvm](https://github.com/creationix/nvm) to switch between NodeJS versions.
    - Install nvm with curl
    ```
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
    ```
    - Reload your .bash_profile or .bashrc and verify your installation of nvm
    ```
    source ~/.bash_profile & nvm --version
    ```
    Output of nvm version number indicates nvm has successfully been installed.
    - Install latest version of node with nvm
    ```
    nvm install node
    ```

1. Clone the repo

    ```
    git clone https://bitbucket.org/ericve25/rednote-take-home
    ```

1. Copy .env.example to .env and customize values to your needs

    ```
    cp .env.example .env
    ```

1. Install Dependencies

    ```
    npm install
    ```

1. Initialize the database
    
    This will create a database named 'contacts_app' for you.

    ```
    node scripts/initDB.js
    ```

1. Start the API

    ```
    npm start
    ```

## Linting

Run linter to validate code style (using a modified version of the AirBnB style guide)

```
npm run lint
```

## Testing

Run unit tests with code coverage or run with debugging

```
npm run test
npm run test-debug
```

(Note: in a production setting, other tests suites such as integration tests or acceptance tests could be added as well)

## Development

Options to run using dotenv to load env vars and with debugging

```
npm run dev
npm run dev-debug
```

## Cleaning

Cleans up all .gitignored files (*must be called with 'npm run'*)

```
npm run clean
```

## Documentation

Documentation for this API is contained here in the README. Please visit the API root route for list of endpoints.

(Note: in a production setting, I would add hosted docs generated from markdown with a static site generator such as Hugo)

## Deployment

Repo master branch will be monitored and automatically built by CircleCI, executing the test cases and deploying to AWS.

(Note: in a production setting, I would add CI monitoring to all branches to support status checks before merging branches to master and automatic deployment of specified branches to testing servers)

## Authorization

This API uses JWT to secure its endpoints and provide authorization for a given user. The `/register` endpoint provides the JWT on registration, and the `/login` endpoint provides JWT when correct credentials are provided.

(Note: due to the time constraint of a tech assessment, only basic authorization has been implemented and JWT are not set to expire)

## Principles

This solution generally tries to follow the principles found in the [12-Factor App](https://12factor.net/) method. Some elements have not been addressed due to the time-constrained nature of a tech-assessment.