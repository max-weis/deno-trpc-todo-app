import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trpc } from "../lib/trpc.ts";

export function TodoForm() {
  const [text, setText] = useState("");

  const createTodo = trpc.createTodo;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      try {
        await createTodo.create.mutate({
          title: text.trim(),
          description: "",
        });
        setText("");
      } catch (error) {
        console.error("Failed to create todo:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-grow"
        disabled={createTodo.isLoading}
      />
      <Button
        type="submit"
        disabled={createTodo.isLoading}
      >
        {createTodo.isLoading ? "Adding..." : "Add"}
      </Button>
    </form>
  );
}
