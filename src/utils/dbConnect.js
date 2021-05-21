import mongoose from 'mongoose';

async function dbConnect() {
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
