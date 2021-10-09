import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(
    private toast: ToastrService,
    private router: Router,
    private service: AutenticacaoService) { }

  ngOnInit(): void { }

  logar() {
    this.service.authenticate(this.creds).subscribe(resposta => {
      // console.log(resposta.headers.get('Authorization'))
      this.service.successfulLogin(resposta.headers.get('Authorization')!.substring(7));
       this.router.navigate([''])
    }, () => {
      this.toast.error('Usuário e/ou senha inválidos', "ERRO!");
    })
   }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }

}
