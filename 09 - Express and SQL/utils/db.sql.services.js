import sql from 'mssql';

class SQLServices {
    static instance = null;
    pool = null;

    constructor() {
        if (SQLServices.instance)
            return instance;

        SQLServices.instance = this;
    }

    async connect() {
        console.log('in connect')
        if (!this.pool) {
            try {
                console.log('in connect -- try')
                this.pool = await sql.connect(process.env.CONNECTION_STRING);
                console.log('Connected to MS-SQL securely (Pool Created)');
            }
            catch (error) {
                throw error;
            }
        }
        return this.pool;
    }

    async executeQuery(queryText, params = []) {
        await this.connect();
        const request = this.pool.request();

        params.forEach(p => {
            request.input(p.name, p.type, p.value);
        });
        const result = await request.query(queryText);
        return result.recordset;
    }
}

const sqlServices = new SQLServices();
console.log(sqlServices);
export default sqlServices;