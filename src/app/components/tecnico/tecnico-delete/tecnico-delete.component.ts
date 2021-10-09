import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnicos';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.scss']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(private service: TecnicoService,
    private toast: ToastrService,
    private router : Router,
    private actvRouter : ActivatedRoute) { }

  ngOnInit(): void {
    this.tecnico.id = this.actvRouter.snapshot.paramMap.get('id')
    this.findById()
  }

  findById(){
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      resposta.perfis = []
      this.tecnico = resposta
    })
  }

  deletarTecnico() {
    this.service.delete(this.tecnico.id).subscribe(() => {
      this.toast.success('Técnico deletado com sucesso', 'Delete')
      this.router.navigate(['tecnicos'])
    }, ex => {
      this.toast.error(ex.error.message, "ERRO!")
    })
  }
}