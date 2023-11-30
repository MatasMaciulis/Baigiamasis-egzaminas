// Home.js
import React, { useState } from "react";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import UserList from "../UsersList/UsersList";
import styles from "./home.module.css";

export default function Home() {
  const [users, setUsers] = useState([]);

  const handleUserAdded = (newUser) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.logo}>
        <img
          src="https://www.figaro.lt/wp-content/uploads/2020/02/Figaro-Logo-svg.svg"
          alt="Jūsų Logo"
          className={styles.logo}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.registrationContainer}>
          <div>
            <h1>Registracija</h1>
          </div>

          <div className={styles.contentContainer}>
            <div>
              {/* Perduodame funkciją RegistrationForm komponentui */}
              <RegistrationForm onUserAdded={handleUserAdded} />
            </div>
          </div>
        </div>

        <div className={styles.clientsContainer}>
          <div>
            <h1>Klientai</h1>
          </div>

          <div>
            {/* Perduodame vartotojų sąrašą UserList komponentui */}
            <UserList users={users} setUsers={setUsers} />
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <p>&copy; 2023 All rights reserved | Figaro</p>
      </div>
    </div>
  );
}
