import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/clientes';
import { Tecnico } from 'src/app/models/tecnicos';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ChamadoListComponent } from '../chamado-list/chamado-list.component';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.scss']
})
export class ChamadoCreateComponent implements OnInit {

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: ''
  }
  tecList: Tecnico[] = []
  cliList: Cliente[] = []

  prioridade  : FormControl = new FormControl(null, [Validators.required])
  status      : FormControl = new FormControl(null, [Validators.required])
  titulo      : FormControl = new FormControl(null, [Validators.required])
  observacoes : FormControl = new FormControl(null, [Validators.required])
  tecnico     : FormControl = new FormControl(null, [Validators.required])
  cliente     : FormControl = new FormControl(null, [Validators.required])

  constructor(private tecService: TecnicoService,
              private cliService: ClienteService,
              private cmdService: ChamadoService,
              private toast: ToastrService,
              private router:Router) { }

  ngOnInit(): void {
    this.listTecnicos()
    this.listClientes()
  }

  listClientes(){
    this.cliService.findAll().subscribe(resposta => {
      this.cliList = resposta
    })
  }

  listTecnicos(){
    this.tecService.findAll().subscribe(resposta => {
      this.tecList = resposta;
    })
  }

  criarChamado(){
    this.cmdService.create(this.chamado).subscribe(resposta => {
      this.toast.success("Chamado criado com sucesso!", "Novo chamado")
      this.router.navigate(['chamados'])
    }, err => {
      this.toast.error(err.error.message, "Erro")
    })
  }

  validarCampos() : boolean{
    return this.prioridade.valid && this.status.valid && this.titulo.valid &&
           this.observacoes.valid && this.tecnico.valid && this.cliente.valid
  }


}
