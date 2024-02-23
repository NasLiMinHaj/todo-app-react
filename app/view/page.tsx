"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
export default function View() {
  const todoItems = [
    { title: "FirstTodo", description: "Description" },
    { title: "SecondTodo", description: "Description" },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" items-center p-10 m-10">
        {todoItems.map((item) => (
          <div className=" grid grid-cols-6 gap-4 fixed left-0 top-0 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            <div className="m-2 col-span-4">
              <h4>{item.title}</h4>
            </div>
            <div className="m-2">
              <Link href="/edit">Edit</Link>
            </div>
            <div className="m-2">
              <button onClick={() => alert("Todo item deleted successfully")}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
