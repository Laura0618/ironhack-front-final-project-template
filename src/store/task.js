// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
      this.tasks = tasks;
      return this.tasks;
    },
    // Hacer POST
    async addTasks(title, id) {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ title: title, is_complete: false, user_id: id }])
      if (error) console.log(error)
      return 'ok'
    },
    // Hacer el PUT (edit)
    async modifyTask(id, title) {
      const { data, error } = await supabase
  .from('tasks')
  .update({ title: title })
  .match({ id: id })
    },
    
    //  Hacer el delete
    
      async deleteTasks(id) {
        const { data, error } = await supabase
        .from('tasks')
        .delete()
        .match({ id: id })
        if (error) console.log("error")
       return 'ok'

      },


    // Hacer el PUT (cambiar entre completada y pendiente)
    async changeTask(id, completed) {
      const { data, error } = await supabase
  .from('tasks')
  .update({ is_complete: completed })
  .match({ id: id })
    }
  },
});
