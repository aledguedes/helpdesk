import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.scss']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(private service: ClienteService,
    private toast: ToastrService,
    private router : Router,
    private actvRouter : ActivatedRoute) { }

  ngOnInit(): void {
    this.cliente.id = this.actvRouter.snapshot.paramMap.get('id')
    this.findById()
  }

  findById(){
    this.service.findById(this.cliente.id).subscribe(resposta => {
      resposta.perfis = []
      this.cliente = resposta
    })
  }

  deletarCliente() {
    this.service.delete(this.cliente.id).subscribe(() => {
      this.toast.success('Cliente deletado com sucesso', 'Delete')
      this.router.navigate(['clientes'])
    }, ex => {
      this.toast.error(ex.error.message, "ERRO!")
    })
  }
}
