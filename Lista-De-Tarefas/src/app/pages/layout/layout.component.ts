import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../../User';
import { Task } from '../../Task';
import { TasksService } from '../../tasks.service';
import { Router } from '@angular/router';
import { validateHeaderName } from 'http';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  //Variaveis para ajudar a manter o filtro após uma mudança de status de uma tarefa
  filtroStatus: boolean = false;
  filtroLigado: boolean = false;


  currentUser: User;


  filtroAtual: string = "Filtrar"; // Controle do rótulo do dropdown de filtro

  currentUserTasks: Task[];
  username: string;

  formularioTarefa: any;

  deleteId: number = 0; //id de tarefa a ser deletada


  taskToUpdate: Task = { // inicializando uma tarefa vazia que será base para atualizar uma tarefa existente
    taskId: 0,
    title: '',
    description: '',
    isComplete: false,
    userId: 0
  };
  
  constructor(private tasksService: TasksService, private router: Router) { }

  ngOnInit(): void {
    this.formularioTarefa = new FormGroup({
      title: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      isComplete: new FormControl(null),
      
    });
    
    // Recupera os dados do usuário do armazenamento local se existirem
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString !== null) {
      this.currentUser = JSON.parse(currentUserString);
      this.username = this.currentUser.userName;
    }
    this.tasksService.RecuperarTasksFromUser(this.currentUser.userId).subscribe(resultado => {
      resultado.sort((a,b)=>a.taskId - b.taskId);
      this.currentUserTasks = resultado;
    });
    
  }

  // Método de criação de nova tarefa
  novaTarefa(): void{
    this.formularioTarefa = new FormGroup({
      title: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      isComplete: new FormControl(null)
    });
  }


  // Define os valores de uma variável Task auxiliar que serve de base para atualizar uma tarefa existente
  // Preenche o formulário com os atributos atuais da task a ser atualizada. Assim só precisa fazer as mudanças necessárias sem necessidade de preencher de novo campos que não serão atualizados
  setTaskToUpdate(task: Task) {
    this.taskToUpdate = new Task(task);
    this.formularioTarefa = new FormGroup({
      title: new FormControl(task.title, Validators.required),
      description: new FormControl(task.description, Validators.required),
      isComplete: new FormControl(null)
    });
  
  }

  // Método chamado onSubmit no formulário de criação de tarefa
  EnviarFormulario(): void {
    if (this.formularioTarefa.valid) {
      const task : Task = this.formularioTarefa.value;
      task.userId = this.currentUser.userId;
      if(task.isComplete === null){
        task.isComplete = false;
      }

    this.tasksService.CriarTask(task).subscribe(resultado =>{
      alert('Tarefa criada com sucesso');
      window.location.reload()
    })
    }
  }

  // Atualiza uma tarefa existente a partir dos valores definidos para a task auxiliar no método setTaskToUpdate()
  // Chamado na submissão do formulário de atualização de tarefa
  AtualizarTarefa(): void {
    if (this.formularioTarefa.valid) {
      
      const task : Task = this.formularioTarefa.value;
      if(task.isComplete === null){
        task.isComplete = this.taskToUpdate.isComplete;
      }

      task.taskId = this.taskToUpdate.taskId; //
      task.userId = this.currentUser.userId;

      this.tasksService.AtualizarTask(task).subscribe(resultado =>{
        window.location.reload()
        alert('Tarefa Atualizada');
    })
    }
  }

  // Responsável por mudar o status da tarefa, tanto no front quanto no back, ao clicar no atributo "Status" na lista
  mudarStatus(task: Task): void{
    localStorage.setItem('filtroReload', this.filtroAtual);
    if(task.isComplete === false){
      task.isComplete = true;
    }
    else{
      task.isComplete = false;
    }
    this.tasksService.AtualizarTask(task).subscribe(resultado =>{   
      
  })
  }

  // Define id de tarefa a ser deletada
  setDeleteId(id: number): void{
    this.deleteId = id;
  }

  // Usa o texto do dropdown para definir um filtro para as tarefas. Também troca o rótulo do dropdown.
  FiltrarTasks(filtro: string): void{
    if(filtro ===  "Todas" || filtro == "Filtrar"){
      this.filtroLigado =  false;

      this.filtroAtual = "Todas";
    }
    else if(filtro === "Completas"){
      this.filtroLigado =  true;
      this.filtroStatus = true;
      this.filtroAtual = "Completas";
    }
    else if(filtro === "Incompletas"){
      this.filtroLigado =  true;
      this.filtroStatus = false;
      this.filtroAtual = "Incompletas";
    }
  }

  // Chamado ao confirmar a exclusão de um item
  ExcluirTarefa(): void{
    this.tasksService.ExcluirTask(this.deleteId).subscribe(resultado => {
      alert('Tarefa Excluida');
      window.location.reload()
    })
  }
  // Recupera o status da tarefa como string para ser usado no front
  getTaskStatusText(task: Task): string {
    return task.isComplete ? 'Completa' : 'Incompleta';
  }

  // Apaga tudo que está salvo no localHost e volta para a página de login
  logout(): void{
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
