// Modal.jsx
import styles from "./Modal.module.css";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const updateEndpoint = "http://localhost:3001/registration";

export default function Modal({ isOpen, userId, onClose }) {
  if (!isOpen) {
    return null;
  }

  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);

  const [surname, setSurname] = useState("");
  const [isSurnameValid, setIsSurnameValid] = useState(true);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [registrationDate, setRegistrationDate] = useState("");
  const [isRegistrationDateValid, setIsRegistrationDateValid] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`${updateEndpoint}/${userId}`).then(({ data }) => {
      console.log(data);
      setName(data.name);
      setSurname(data.surname);
      setPhoneNumber(data.phoneNumber);
      setEmail(data.email);
      setRegistrationDate(data.registrationDate.split("T")[0] + "T00:00");
    });
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();

    if (!name || !surname || !phoneNumber || !email || !registrationDate) {
      alert("Visi laukai turi būti užpildyti");
      return;
    }

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

    if (!isRegistrationDateValid) {
      alert("įveskite tinkama datą");
      return;
    }

    try {
      // Siunčiame put užklausą į DB: atnaujinti vartotojo informaciją (naudojant Axios .put),
      await axios.put(`${updateEndpoint}/${userId}`, {
        name,
        surname,
        phoneNumber,
        email,
        registrationDate,
      });

      alert("Sėkmingai atnaujinta!");
      onClose(); // Uždaryti modalą po sėkmingo atnaujinimo

      // perkrauti www
      window.location.reload();
    } catch (error) {
      console.error("Klaida atnaujinant vartotojo informaciją", error);

      alert("Kazkas negerai 1");
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
      setIsRegistrationDateValid(false);
    } else {
      setIsRegistrationDateValid(true);
    }
  }, [name, surname, phoneNumber, email, registrationDate]);

  return createPortal(
    <div className={styles.overlay}>
      <form onSubmit={handleUpdate} className={styles.form}>
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
              // pattern="[A-Za-z]*"
            />
          </div>

          {/* {!isNameValid && (
          <span style={{ color: "red" }}>Vardas yra privalomas</span>
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
              // pattern="[A-Za-z]*"
            />
          </div>
          {/* {!isSurnameValid && (
          <span style={{ color: "red" }}>Pavardė yra privaloma</span>
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
          <span style={{ color: "red" }}>Neteisingas telefono numeris</span>
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
          <span style={{ color: "red" }}>Neteisingas el. paštas</span>
        )} */}
        </div>

        <div>
          <label htmlFor="registrationDateInput">Registracijos data:</label>
          <div
            className={`${styles.wrapper} ${
              isRegistrationDateValid ? styles.valid : styles.invalid
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
          Netinkamas datos formatas. Naudojamas formatas: 'YYYY-MM-DDTHH:mm'
          </span>
        )} */}
        </div>

        <button className={styles.modal_upd} type="submit">
          Atnaujinti
        </button>
        <button type="button" onClick={onClose} className={styles.modal_upd}>
          Uždaryti
        </button>
      </form>
    </div>,
    document.body
  );
}
