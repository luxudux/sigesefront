import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-main-secretary',
  templateUrl: './main-secretary.component.html',
  styleUrls: ['./main-secretary.component.css']
})
export class MainSecretaryComponent implements OnInit {
  public nombreModulo: string;
  public nombreNivel = 'Secretaria';
  // Carga modulos
  public component: string;
  public listDocumentsInbox: boolean;
  public listDocumentsReceived: boolean;
  public listDocumentsElaborated: boolean;
  public listDocumentsNotified: boolean;
  public listDocumentsExecuted: boolean;
  public listDocumentsSent: boolean;
  public listDocumentsFinished: boolean;
  public listCalls: boolean;
  public listContacts: boolean;
  public listEvents: boolean;
  public listWorkers: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) { }


  ngOnInit() {
  }

  showComponent(component: string) {

  this.listDocumentsInbox = false;
  this.listDocumentsReceived = false;
  this.listDocumentsElaborated = false;
  this.listDocumentsNotified = false;
  this.listDocumentsExecuted = false;
  this.listDocumentsSent = false;
  this.listDocumentsFinished = false;
  this.listCalls = false;
  this.listContacts = false;
  this.listEvents = false;
  this.listWorkers = false;

  switch (component) {

      case 'documentsInbox': {
          this.listDocumentsInbox = true; break;
      }
      case 'documentsReceived': {
          this.listDocumentsReceived = true; break;
      }
      case 'documentsElaborated': {
        this.listDocumentsElaborated = true; break;
      }
      case 'documentsNotifiedView': {
        this.listDocumentsNotified = true; break;
      }
      case 'documentsExecuted': {
        this.listDocumentsExecuted = true; break;
      }
      case 'documentsSent': {
        this.listDocumentsSent = true; break;
      }
      case 'documentsFinished': {
        this.listDocumentsFinished = true; break;
      }
      case 'callsReceived': {
        this.listCalls = true; break;
      }
      case 'callsContacts': {
        this.listContacts = true; break;
      }
      case 'eventsRegistered': {
        this.listEvents = true; break;
      }
      case 'workers': {
        this.listWorkers = true;  break;
      }
      default: {
          break;
        }
    }

  }

}
