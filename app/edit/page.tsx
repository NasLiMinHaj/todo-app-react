"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
export default function Edit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let ID = location.search.split("=")[1];
  const fetcher = (url: string) =>
    axios.get(url).then((res) => {
      return res.data;
    });
  async function updateTodoItem(url: string) {
    const state = {
      title,
      description,
    };
    try {
      const response = await axios.put(url, state);
      if (response) {
        alert("Todo item updated successfully");
      }
    } catch (error: any) {
      console.log(error);
      // alert(error.response.data.description);
    }
  }
  function handleUpdate() {
    updateTodoItem("http://localhost:8081/todo/items/" + ID);
  }
  useEffect(() => {
    async function getTodoItem() {
      try {
        const queryParams = location.search;
        const id = queryParams.split("=")[1];
        ID = id;
        if (id) {
          const response = await fetcher(
            "http://localhost:8081/todo/items/" + id
          );
          setTitle(response.title);
          setDescription(response.description);
        }
      } catch (error) {}
    }
    getTodoItem();
  }, []);

  return (
    <div>
      <Link
        href="/"
        className="m-5 p-5 justify-center align-center text-center text-2xl"
      >
        Go home
      </Link>
      <h1 className="mt-5 pt-10 justify-center align-center text-center text-3xl">
        Edit TODO item
      </h1>
      <main className="flex min-h-screen flex-col items-center justify-between p-2">
        <div className=" grid grid-rows-3 gap-4 items-center p-10 m-10 fixed left-0 top-0 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <div className=" grid grid-cols-2">
            <label
              className="block mb-2 font-medium text-gray-900 dark:text-white"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="title"
              type="text"
              onKeyUp={(event) => setTitle(event.currentTarget.value)}
              defaultValue={title}
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
              id="description"
              type="text"
              onKeyUp={(event) => setDescription(event.currentTarget.value)}
              defaultValue={description}
            ></input>
          </div>
          <div className=" grid grid-cols-1">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleUpdate}
            >
              Save
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
