import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private router:Router,
              private service: AutenticacaoService,
              private toast: ToastrService) { }

  ngOnInit(): void {
    this.router.navigate(['chamados/read/1'])
  }

  logout(){
    this.router.navigate(['login'])
    this.service.logout();
    this.toast.info("Logout realizado com sucesso", "Logout",{
      timeOut: 7000
    })
  }
}
