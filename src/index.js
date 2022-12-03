import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import "bootstrap/dist/css/bootstrap.min.css";
import Todo from "./Todo";

const app = initializeApp({
  apiKey: "AIzaSyDN80o6riymH40_zpIlX0msIrvUlGxXjXE",
  authDomain: "todo-list-21a7e.firebaseapp.com",
  projectId: "todo-list-21a7e",
  storageBucket: "todo-list-21a7e.appspot.com",
  messagingSenderId: "1044973901245",
  appId: "1:1044973901245:web:3e094ff24643145b8aaed4",
  measurementId: "G-6C4TVV0XHD",
  databaseURL: "https://todo-list-21a7e-default-rtdb.firebaseio.com",
});

export const Context = createContext(null);

const database = getDatabase(app);



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider value={{ database }}>
    <Todo />
  </Context.Provider>
);
