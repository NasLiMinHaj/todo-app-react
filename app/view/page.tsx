"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function View() {
  const { data, error } = useSWR("http://localhost:8081/todo/items", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  function handleDelete(id: number): undefined {}
  if (data && data.length > 0) {
    return (
      <div>
        {" "}
        <Link
          href="/"
          className="m-5 p-5 justify-center align-center text-center text-2xl"
        >
          Go home
        </Link>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className=" items-center p-10 m-10">
            {data.map((item) => (
              <div className=" grid grid-cols-6 gap-4 fixed left-0 top-0 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                <div className="m-2 col-span-4">
                  <h4>{item.title}</h4>
                </div>
                <div className="m-2">
                  <Link href={"/edit?id=" + item.id}>Edit</Link>
                </div>
                <div className="m-2">
                  <button
                    onClick={() => {
                      try {
                        const response = axios
                          .delete("http://localhost:8081/todo/items/" + item.id)
                          .then((response) => {
                            if (response) {
                              alert("Todo item deleted successfully");
                            }
                          });
                      } catch (error: any) {
                        console.log(error);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <div>
        <Link
          href="/"
          className="m-5 p-5 justify-center align-center text-center text-2xl"
        >
          Go home
        </Link>
        <h2>No items found</h2>
      </div>
    );
  }
}
