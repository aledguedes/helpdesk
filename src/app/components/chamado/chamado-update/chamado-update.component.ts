import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/clientes';
import { Tecnico } from 'src/app/models/tecnicos';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.scss']
})
export class ChamadoUpdateComponent implements OnInit {

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
              private router:Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id')
    this.listarId()
    this.listTecnicos()
    this.listClientes()
  }

  listarId(){
    this.cmdService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta
    }, err => {
      this.toast.error(err.error.message, "Erro")
    })
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

  atualizarChamado(){
    this.cmdService.update(this.chamado).subscribe(resposta => {
      this.toast.success("Chamado atualizado com sucesso!", "Atualizar chamado")
      this.router.navigate(['chamados'])
    }, err => {
      this.toast.error(err.error.message, "Erro")
    })
  }

  validarCampos() : boolean{
    return this.prioridade.valid && this.status.valid && this.titulo.valid &&
           this.observacoes.valid && this.tecnico.valid && this.cliente.valid
  }

  retornaStatus(status: any): string {
    if(status == '0') {
      return 'ABERTO'
    } else if(status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: any): string {
    if(prioridade == '0') {
      return 'BAIXA'
    } else if(prioridade == '1') {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }
}

