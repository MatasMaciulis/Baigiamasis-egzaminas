import React from "react";

import Modal from "../Modal/Modal";

// atlikti HTTP užklausas į serverį.
import axios from "axios";

import { useState } from "react";

import styles from "./user.module.css";

// susikuriame const endpoint URL.
const endpoint = "http://localhost:3001/registration";

// sukuriame funkcija kurioje per props priims objektą ({user})
// ir atvaizduos visas objekto "dalis"
export default function User({ user, setUsers, formatDateTime }) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  function handleUpdate() {
    setIsUpdateModalOpen(true);
  }

  //================== delete button =============================
  function handleDelete() {
    axios
      .delete(`${endpoint}/${user._id}`)
      .then(() => {
        setUsers((prev) => prev.filter((p) => p._id !== user._id));
      })
      .catch((error) => alert("nepavyko ištrinti"));
  }

  //================== update button =============================

  function handleUpdateSuccess(updatedUser) {
    setUsers((prev) =>
      prev.map((p) => (p._id === updatedUser._id ? updatedUser : p))
    );
  }

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.surname}</td>
      <td>{user.phoneNumber}</td>
      <td>{user.email}</td>
      <td>{formatDateTime(user.registrationDate)}</td>
      <td>
        <button className={styles.del_button} onClick={handleDelete}>
          Trinti
        </button>
      </td>
      <td>
        <button className={styles.upd_button} onClick={handleUpdate}>
          Atnaujinti
        </button>

        {isUpdateModalOpen && (
          <Modal
            isOpen={isUpdateModalOpen}
            userId={user._id} // Perduodame userId į Modal
            onClose={() => setIsUpdateModalOpen(false)}
            onUpdate={handleUpdateSuccess}
          />
        )}
      </td>
    </tr>
  );
}
