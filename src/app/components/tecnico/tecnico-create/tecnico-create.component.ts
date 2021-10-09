import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnicos';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.scss']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome = new FormControl(null, Validators.minLength(3));
  cpf = new FormControl(null, Validators.required);
  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private service: TecnicoService,
    private toast: ToastrService,
    private router : Router) { }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  }

  criarTecnico(): void {
    this.service.create(this.tecnico).subscribe((res) => {
      this.toast.success('Técnico cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['tecnicos'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach((element: { message: string | undefined; }) => {
          this.toast.error(element.message, "ErrorSSSS");
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  addPerfil(perfil: any): void {
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1)
    } else {
      this.tecnico.perfis.push(perfil)
    }
  }
}
