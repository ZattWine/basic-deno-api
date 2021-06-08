import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

interface Todo {
    id: string;
    text: string;
}

let todos: Todo[] = [];

router.get("/todos", (ctx) => {
    ctx.response.body = { todos: todos };
});

router.post("/todos", async (ctx) => {
    const data = await ctx.request.body({ type: "json" }).value;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: data.text,
    };

    todos.push(newTodo);

    ctx.response.body = { message: "Created todo.", todos: todos };
});

router.put("/todos/:todoId", async (ctx) => {
    const tid = ctx.params.todoId;
    const data = await ctx.request.body({ type: "json" }).value;
    const todoIndex = todos.findIndex(item => item.id === tid);
    todos[todoIndex] = {
        id: todos[todoIndex].id,
        text: data.text
    };
    ctx.response.body = { message: "Updated todo", todos: todos };
});

router.delete("/todos/:todoId", (ctx) => {
    const tid = ctx.params.todoId;
    todos = todos.filter(item => item.id !== tid);
    ctx.response.body = { message: "Deleted todo.", todos: todos };
});

export default router;
