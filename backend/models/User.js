import mongoose from "mongoose";


// susikuriame modelio schema:
// su šios schemos pagalba vykdisime užklausas į savo DB

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 32,
  },

  surname: {
    type: String,
    required: true,
    min: 1,
    max: 32,
  },

  phoneNumber: {
    type: Number,
    minLength: 1,
  },

  email: {
    type: String,
    required: true,
    max: 50,
    min: 6,
    unique: true,
  },

  registrationDate: {
    type: Date,
  },
});

// eksportuojame sukurta modelį "User", kuris naudos schemą: UserSchema
export default mongoose.model("User", UserSchema);

