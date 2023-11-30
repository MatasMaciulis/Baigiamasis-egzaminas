import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import User from "../User/User";
import styles from "./UsersList.module.css";

const endpoint = "http://localhost:3001/registration";

const formatDateTime = (isoDateTime) => {
  return format(new Date(isoDateTime), "yyyy-MM-dd HH:mm");
};

export default function UserList({ users, setUsers }) {
  const [sortingOrder, setSortingOrder] = useState("asc");

  const sortUsers = (users) => {
    const sortedUsers = [...users];

    sortedUsers.sort((a, b) => {
      const dateA = new Date(a.registrationDate);
      const dateB = new Date(b.registrationDate);

      if (sortingOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    return sortedUsers;
  };

  useEffect(() => {
    axios
      .get(endpoint)
      .then(({ data }) => {
        const sortedUsers = sortUsers(data);
        setUsers(sortedUsers);
      })
      .catch(() => alert("klaida"));
  }, [setUsers, sortingOrder]);

  const toggleSortingOrder = () => {
    setSortingOrder(sortingOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className={styles.container}>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Vardas</th>
            <th>Pavardė</th>
            <th>Tel. numeris</th>
            <th>Email</th>
            <th>
              Registracijos laikas{" "}
              <span className={styles.sortIcon} onClick={toggleSortingOrder}>
                {sortingOrder === "asc" ? "▲" : "▼"}
              </span>
            </th>
            <th>Trinti </th>
            <th>Atnaujinti</th>
          </tr>
        </thead>
        <tbody>
          {users.map(
            (user) =>
              user._id && (
                <User
                  setUsers={setUsers}
                  key={user._id}
                  user={user}
                  formatDateTime={formatDateTime}
                />
              )
          )}
        </tbody>
      </table>
    </div>
  );
}
