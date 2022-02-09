module.exports = {
    HOST: "123.30.234.61",
    USER: "tungnt",
    PASSWORD: "tungnt",
    DB: "postgres",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};