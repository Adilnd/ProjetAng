import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable()
export class AppareilService{

  appareilSubject = new Subject<any[]>();

  private appareils = [
    {
      id: 1,
      name: 'Machine',
      status: 'Allumé'
    },
    {
      id: 2,
      name: 'TV',
      status: 'Allumé'
    },
    {
      id: 3,
      name: 'App',
      status: 'éteint'
    }
  ];

  constructor(private httpClient: HttpClient) {
  }

emitAppareilSubject(){
  this.appareilSubject.next(this.appareils.slice());
  }

  getAppareilById(id: number)
  {
    const appareil =  this.appareils.find(
      (appareilObject) =>
      {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }

  OnSwithOffAll()
  {
    for(let appareil of this.appareils)
    {
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }

    OnSwithOnAll()
    {
      for(let appareil of this.appareils){
        appareil.status = 'Allumé';
      }
      this.emitAppareilSubject();
  }


  SwitchOnOne(index: number)
  {
    this.appareils[index].status = 'Allumé';
    this.emitAppareilSubject();
  }

  SwitchOffOne(index: number)
  {
    this.appareils[index].status = 'éteint';
    this.emitAppareilSubject();
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }


  saveAppareilsToServer() {
    this.httpClient.post('http://localhost/phpmyadmin/db_structure.php?server=1&db=testdb/appareils.json', this.appareils).subscribe(
      ()  => {
        console.log('Enregistrement terminé!');
      },

      (error) => {
        console.log('Erreur lors de lenregistrement' + error);
      }
    );
    this.emitAppareilSubject();
  }


}
