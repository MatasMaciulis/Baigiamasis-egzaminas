import mongoose from "mongoose";

// importuojame User model iš models/User.js failo su viduje esančia (informacija) schema"
import User from "../models/User.js";

//======================================== POST  ==========================================
export async function addNewUser(req, res) {
  const { name, surname, phoneNumber, email, registrationDate } = req.body;

  try {
    // Tikriname, ar įvesties laukai yra užpildyti prieš siunčiant informaciją į DB
    if (!name || !surname || !phoneNumber || !email || !registrationDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Name validacija
    if (name.length < 1 || name.length > 32) {
      return res.status(402).json({
        success: false,
        message: "Name must be between 1 and 32 characters",
      });
    }

    // Surname validacija
    if (surname.length < 1 || surname.length > 32) {
      return res.status(402).json({
        success: false,
        message: "Surname must be between 1 and 32 characters",
      });
    }

    // PhoneNumber validacija
    const phoneNumberRegex = /^\d{9}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      return res.status(403).json({
        success: false,
        message: "Please provide a valid phone number (9 digits)",
      });
    }

    // Email validacija
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(404).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // RegistrationDate validacija
    // const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    // if (!dateRegex.test(registrationDate)) {
    //   return res.status(405).json({
    //     success: false,
    //     message:
    //       "Invalid date format. Please use the format 'YYYY-MM-DD HH:mm'",
    //   });
    // }

    if (await User.findOne({ email })) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const user = new User({
      name,
      surname,
      phoneNumber,
      email,
      registrationDate,
    });

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

//======================================== GET  ===========================================
export async function getAllUsers(req, res) {
  try {
    // siunčiame užklausą į DB : surasti visus irašus (naudojant Product modelį ir Mongoose .find)
    // ({kaip filtruoti įrašus?})  {} kad bus grąžinti visi įrašai iš duomenų bazės
    // ({}{ __v: 0 }) nurodome, kad nebus rodoma versijos
    const users = await User.find({}, { __v: 0 });
    // jei sėkmingas užklausos įvykdymas siunčiame atgal res.status(200)
    res.status(200).json(users);
    // Nustatome HTTP būseną kaip "500 Internal Server Error" ir grąžiname JSON klaidos atsakymą
  } catch (error) {
    // jei nesėkmingas užklausos įvykdymas siunčiame atgal res.status(500)
    res.status(500).json({ error: error.message });
  }
}

//======================================== GET by ID  ===========================================

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//======================================= DELETE  ==========================================
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `Invalid id ${id}` });
    }
    // pasirašome const kur išsaugosime savo surasta ir ištrinta User (kad galėtume patikrinti ištryne/neistryne - buvo/nebuvo)
    const response = await User.findByIdAndDelete(id);

    if (response) {
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: `User with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//---------------------------------------------- PUT (update) --------------------------------------------------------
export async function updateUser(req, res) {
  try {
    // iš (req.params) paimame : id kurį norime atnaujinti (update)
    const { id } = req.params;

    // iš (req.body) paimame :  name, amount, description, price, expirationDate
    const { name, surname, phoneNumber, email, registrationDate } = req.body;

    // tikriname, ar įvesties laukai yra užpildyti prieš siunčiant informaciją į DB
    if (!name || !surname || !phoneNumber || !email || !registrationDate) {
      return res.status(400).json({ message: "Name and price are required" });
    }
    // siunčiame užklausą į DB : kad surastu produktą pagal pateiktą "id" (naudojant Mongoose .findById),
    const user = await User.findById(id);
    // jei produktas nebuvo rastas
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // jei produktas buvo rastas, siunčiame užklausą į DB : kad atnaujintu produktą (naudojant Mongoose .findByIdAndDelete),
    user.name = name;
    user.surname = surname;
    user.phoneNumber = phoneNumber;
    user.email = email;
    user.registrationDate = registrationDate;
    // siunciame atnaujintą objektą į db isaugojimui
    await user.save();
    // jei išsaugojimas pavyko gauname  res.status(201) - sėkmingas užklausos įvykdymas
    res.status(201).json(user);
    // jei nesėkmingas užklausos įvykdymas siunčiame atgal res.status(500)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
