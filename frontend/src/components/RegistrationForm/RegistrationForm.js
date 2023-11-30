// šalia React importuojame useEffect, useState - kurti ir valdyti būsenos kintamuosius
import React, { useState, useEffect } from "react";

import styles from "./RegistrationForm.module.css";

// atlikti HTTP užklausas į serverį.
import axios from "axios";

const registerEndpoint = "http://localhost:3001/registration";

export default function RegistrationForm({ onUserAdded }) {
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);

  const [surname, setSurname] = useState("");
  const [isSurnameValid, setIsSurnameValid] = useState(true);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [registrationDate, setRegistrationDate] = useState("");
  const [isregistrationDateValid, setIsregistrationDateValid] = useState(true);

  // aprašome funkciją kurį išsius visus suvestus formos duomenis
  async function handleRegister(e) {
    e.preventDefault();

    // Papildomos input validacijos prieš siunčiant užklausą
    if (!isNameValid) {
      alert(
        "Blogas vardas. Vardas turi būti tarp 1 ir 20 raidžių, ir gali būti tik raidės bei lietuviškos raidės."
      );
      return;
    }

    if (!isSurnameValid) {
      alert(
        "Bloga pavardė. Pavardė turi būti tarp 1 ir 20 raidžių, ir gali būti tik raidės bei lietuviškos raidės."
      );
      return;
    }

    if (!isPhoneNumberValid) {
      alert(
        "Blogas telefono numeris. Prašome įvesti 9 skaitmenų telefono numerį."
      );
      return;
    }

    if (!isEmailValid) {
      alert(
        "Blogas el. paštas. El. paštas turi būti tinkamas ir neviršyti 30 simbolių."
      );
      return;
    }

    if (!isregistrationDateValid) {
      alert("įveskite tinkama datą");
      return;
    }

    try {
      // Tikriname, ar vartotojas su šiuo el. paštu jau egzistuoja
      const { data } = await axios.post(registerEndpoint, {
        name,
        surname,
        phoneNumber,
        email,
        registrationDate,
      });

      // Iškviečiame perduotą funkciją, perduodant naują vartotoją
      onUserAdded(data);

      alert("Sėkmingai prisiregistravote");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Jei gauname 409 statusą, tai reiškia, kad vartotojas su tokiu el. paštu jau egzistuoja
        alert("Naudotojas su šiuo el. paštu jau egzistuoja");
      } else {
        alert("Kažkas negerai");
      }
    }
  }

  // ===================================== aprašome validacijas ==========================================

  useEffect(() => {
    const nameRegex = /^[a-zA-ZĄ-ž]+$/; // Leidžiamos tik raidės ir lietuviškos raidės
    if (!nameRegex.test(name) || name.length > 20) {
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
    }
    // ==========================================================================================
    // Surname validacija
    const surnameRegex = /^[a-zA-ZĄ-ž]+$/; // Leidžiamos tik raidės ir lietuviškos raidės
    if (!surnameRegex.test(surname) || surname.length > 20) {
      setIsSurnameValid(false);
    } else {
      setIsSurnameValid(true);
    }
    // ==========================================================================================
    // PhoneNumber validacija
    const phoneNumberRegex = /^\d{9}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      setIsPhoneNumberValid(false);
    } else {
      setIsPhoneNumberValid(true);
    }
    // ==========================================================================================
    // El. mail validacija
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 30) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
    // ==========================================================================================
    // Tikriname, ar registracijos data atitinka nustatytą formatą 'YYYY-MM-DDTHH:mmZ'
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    if (!dateRegex.test(registrationDate)) {
      setIsregistrationDateValid(false);
    } else {
      setIsregistrationDateValid(true);
    }
  }, [name, surname, phoneNumber, email, registrationDate]);

  return (
    <form onSubmit={handleRegister} className={styles.form}>
      <div>
        <label htmlFor="nameInput">Vardas:</label>

        <div
          className={`${styles.wrapper} ${
            isNameValid ? styles.valid : styles.invalid
          }`}
        >
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            id="nameInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </div>

        {/* {!isNameValid && (
          <span style={{ color: "red" }}>
            Name must be between 1 and 32 characters
          </span>
        )} */}
      </div>

      <div>
        <label htmlFor="surnameInput">Pavardė:</label>

        <div
          className={`${styles.wrapper} ${
            isSurnameValid ? styles.valid : styles.invalid
          }`}
        >
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            id="surnameInput"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className={styles.input}
          />
        </div>
        {/* {!isSurnameValid && (
          <span style={{ color: "red" }}>
            Surname must be between 1 and 32 characters
          </span>
        )} */}
      </div>

      <div>
        <label htmlFor="phoneInput">Telefonas:</label>

        <div
          className={`${styles.wrapper} ${
            isPhoneNumberValid ? styles.valid : styles.invalid
          }`}
        >
          <i className="fa-solid fa-phone"></i>
          <input
            type="tel"
            id="phoneInput"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={styles.input}
          />
        </div>
        {/* {!isPhoneNumberValid && (
          <span style={{ color: "red" }}>
            Please provide a valid phone number (9 digits)
          </span>
        )} */}
      </div>

      <div>
        <label htmlFor="emailInput">El. paštas:</label>

        <div
          className={`${styles.wrapper} ${
            isEmailValid ? styles.valid : styles.invalid
          }`}
        >
          <i className="fa-solid fa-envelope"></i>
          <input
            type="text"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        {/* {!isEmailValid && (
          <span style={{ color: "red" }}>
            Please provide a valid email address
          </span>
        )} */}
      </div>

      <div>
        <label htmlFor="registrationDateInput">Registracijos data:</label>
        <div
          className={`${styles.wrapper} ${
            isregistrationDateValid ? styles.valid : styles.invalid
          }`}
        >
          <i className="fa-solid fa-calendar"></i>
          <input
            type="datetime-local"
            id="registrationDateInput"
            value={registrationDate}
            onChange={(e) => setRegistrationDate(e.target.value)}
            className={styles.input}
          />
        </div>

        {/* {!isregistrationDateValid && (
          <span style={{ color: "red" }}>
            Invalid date format. Please use the format 'YYYY-MM-DD HH:mm'
          </span>
        )} */}
      </div>

      <button className={styles.reg_button} type="submit">
        Registruotis
      </button>
    </form>
  );
}
