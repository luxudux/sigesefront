import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-adminer',
  templateUrl: './main-adminer.component.html',
  styleUrls: ['./main-adminer.component.css']
})
export class MainAdminerComponent implements OnInit {
  public nombreModulo: string;
  public nombreNivel = 'Administrador';
  // Carga modulos
  public component: string;
  public listDelegations: boolean;
  public listTypes: boolean;
  public listTowns: boolean;
  public listUsers: boolean;
  public listStates: boolean;
  public listPreferences: boolean;
  public listLevels: boolean;
  public listOffices: boolean;
  public listConclutions: boolean;
  public listPermits: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {

  }
  showComponent(component: string) {
    this.listUsers = false;
    this.listDelegations = false;
    this.listTypes = false;
    this.listTowns = false;
    this.listStates = false;
    this.listPreferences = false;
    this.listLevels = false;
    this.listOffices = false;
    this.listConclutions = false;
    this.listPermits = false;

    switch (component) {
      case 'users': {
        this.listUsers = true;  break;
      }
      case 'delegations': {
        this.listDelegations = true; break;
      }
      case 'types': {
        this.listTypes = true; break;
      }
      case 'towns': {
        this.listTowns = true; break;
      }
      case 'state': {
        this.listStates = true; break;
      }
      case 'preferences': {
        this.listPreferences = true; break;
      }
      case 'levels': {
        this.listLevels = true; break;
      }
      case 'offices': {
        this.listOffices = true; break;
      }
      case 'conclutions': {
        this.listConclutions = true; break;
      }
      case 'permits': {
        this.listPermits = true; break;
      }
      default: {
        break;
      }
    }

  }


}
