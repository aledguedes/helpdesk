import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/clientes';
import { Tecnico } from 'src/app/models/tecnicos';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.scss']
})
export class ChamadoReadComponent implements OnInit {

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

  constructor(private cmdService: ChamadoService,
              private toast: ToastrService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id')
    this.listarId()
  }

  listarId(){
    this.cmdService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta
    }, err => {
      this.toast.error(err.error.message, "Erro")
    })
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
