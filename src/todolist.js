import Project from "./project";
import Task from "./task";
import { compareAsc, toDate } from "date-fns";

class TodoList {
    constructor() {
        this.projects = [];
        this.projects.push(new Project("Today"));
        this.projects.push(new Project("Week"));
        this.projects.push(new Project("Month"));
    }

    setProjects(projects) {
        this.projects = projects;
    }

    getProjects() {
        return this.projects;
    }

    getProject(projectName) {
        return this.projects.find((project) => project.getName() === projectName);
    }

    contains(projectName) {
        return this.projects.some((project) => project.getName() === projectName);
    }

    addProject(newProject) {
        if (this.projects.fint((project) => project.name === newProject.name)) return;
        this.projects.push(newProject);
    }

    deleteProject(projectName) {
        const projectToDelete = this.projects.find(
          (project) => project.getName() === projectName
        );
        this.projects.splice(this.projects.indexOf(projectToDelete), 1);
      }

    updateTodayProject() {
        this.getProject('Today').tasks = [];
    
        this.projects.forEach((project) => {
          if (project.getName() === 'Today' || project.getName() === 'Week')
            return;
    
          const todayTasks = project.getTasksToday();
          todayTasks.forEach((task) => {
            const taskName = `${task.getName()} (${project.getName()})`;
            this.getProject('Today').addTask(new Task(taskName, task.getDate()))
          })
        })
      }
    
    updateWeekProject() {
        this.getProject('Week').tasks = [];
    
        this.projects.forEach((project) => {
          if (project.getName() === 'Today' || project.getName() === 'Week')
            return;
    
          const weekTasks = project.getTasksThisWeek()
          weekTasks.forEach((task) => {
            const taskName = `${task.getName()} (${project.getName()})`
            this.getProject('Week').addTask(new Task(taskName, task.getDate()));
          })
        })
    
        this.getProject('Week').setTasks(
          this.getProject('Week')
            .getTasks()
            .sort((taskA, taskB) =>
              compareAsc(
                toDate(new Date(taskA.getDateFormatted())),
                toDate(new Date(taskB.getDateFormatted()))
              )
            )
        )
      }

      updateMonthProject() {
        this.getProject('Month').tasks = []
    
        this.projects.forEach((project) => {
          if (project.getName() === 'Today' || project.getName() === 'Month')
            return;
    
          const monthTasks = project.getTasksThisMonth()
          monthTasks.forEach((task) => {
            const taskName = `${task.getName()} (${project.getName()})`
            this.getProject('Month').addTask(new Task(taskName, task.getDate()))
          })
        })
    
        this.getProject('Month').setTasks(
          this.getProject('Month')
            .getTasks()
            .sort((taskA, taskB) =>
              compareAsc(
                toDate(new Date(taskA.getDateFormatted())),
                toDate(new Date(taskB.getDateFormatted()))
              )
            )
        )
      }

}

export default TodoList;