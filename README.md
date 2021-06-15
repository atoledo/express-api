# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

### Local Postgres
docker run --name express_api -e POSTGRES_PASSWORD=admin -p 5432:5432 -d postgres
psql -h localhost -p 5432 -U postgres -W

List databases
>  \l

List tables
>  \dt

Show table info
>  \dt+ table_name