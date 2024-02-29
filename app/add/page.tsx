"use client";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import Link from "next/link";

export default function Add() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  async function addTodoItem(url: string) {
    const state = {
      title,
      description,
    };
    try {
      const response = await axios.post(url, state);
      if (response) {
        alert("Todo item saved successfully");
        titleRef.current.value = "";
        descriptionRef.current.value = "";
      }
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.description);
    }
  }
  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addTodoItem("http://localhost:8081/todo/items");
  }

  return (
    <div>
      <Link
        href="/"
        className="m-5 p-5 justify-center align-center text-center text-2xl"
      >
        Go home
      </Link>
      <h1 className="mt-5 pt-10 justify-center align-center text-center text-3xl">
        Add TODO item
      </h1>
      <main className="flex min-h-screen flex-col items-center justify-between p-2">
        <form
          onSubmit={handleSave}
          className=" grid grid-rows-3 gap-4 items-center p-10 m-10 fixed left-0 top-0 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
        >
          <div className=" grid grid-cols-2">
            <label
              className="block mb-2 font-medium text-gray-900 dark:text-white"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="title"
              type="text"
              onKeyUp={(event) => setTitle(event.currentTarget.value)}
              ref={titleRef}
            ></input>
          </div>
          <div className=" grid grid-cols-2">
            <label
              className="block mb-2  font-medium text-gray-900 dark:text-white"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="description"
              type="text"
              onKeyUp={(event) => setDescription(event.currentTarget.value)}
              ref={descriptionRef}
            ></input>
          </div>
          <div className=" grid grid-cols-1">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
