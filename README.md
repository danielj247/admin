# admin.
A NodeJS admin application build with Next.js

> [Try the demo](https://admin.danieljarrett.dev/) - `admin@example.com` `secret123`

## Development

> Make sure to update the .env or .env.local with necessary values.

First, install the dependencies:
```bash
yarn
```

Start the docker containers:
```bash
docker-compose up -d
```

Then, seed the database with the admin user values from environmental variables:
```bash
yarn seed
```

Finally, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
