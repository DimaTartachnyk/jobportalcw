import mongoose from "mongoose";

const connectToDB = async () => {
    const connectionURL = "mongodb+srv://Almi:123789654qwerty@cluster0.ksarrbd.mongodb.net/";

    mongoose
        .connect(connectionURL)
        .then(() => console.log('job board database connection is successful'))
        .catch(error => console.log(error));
}

export default connectToDB;