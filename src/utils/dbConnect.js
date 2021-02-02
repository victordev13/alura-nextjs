import mongoose from 'mongoose';

async function dbConnect() {
    // check if we have a connection to the database or if it's currently
    // connecting or disconnecting (readyState 1, 2 and 3)
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        return mongoose.connect(
            // eslint-disable-next-line no-undef
            process.env.DB_CONNECT,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            },
            (err) => {
                if (err) {
                    console.log('Erro na conexão com o MongoDB. err:' + err);
                    throw new Error('Erro na conexão com o MongoDB.');
                }
            }
        );
    } catch (err) {
        console.error(err);
        return;
    }
}

export default dbConnect;
