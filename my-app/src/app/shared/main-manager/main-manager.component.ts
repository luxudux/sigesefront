import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-manager',
  templateUrl: './main-manager.component.html',
  styleUrls: ['./main-manager.component.css']
})
export class MainManagerComponent implements OnInit {
  public nombreModulo: string;
  public nombreNivel = 'Director';
  // Carga modulos
  public component: string;
  public listDocumentsNotified: boolean;
  public listDocumentsExecuted: boolean;
  public listDocumentsSent: boolean;
  public listDocumentsFinished: boolean;
  public listCallsReceived: boolean;
  public listEvents: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) { }


  ngOnInit() {
  }
  showComponent(component: string) {

    this.listDocumentsNotified = false;
    this.listDocumentsExecuted = false;
    this.listDocumentsSent = false;
    this.listDocumentsFinished = false;
    this.listCallsReceived = false;
    this.listEvents = false;

    switch (component) {

      case 'documentsNotified': {
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
        this.listCallsReceived = true; break;
      }
      case 'eventsRegistered': {
        this.listEvents = true; break;
      }
      default: {
        break;
      }
    }

  }
}
