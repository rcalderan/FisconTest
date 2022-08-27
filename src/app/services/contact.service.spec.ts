import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';


let oldLen:number;

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactService);

    //basic state
    ContactService.contacts=[
      {id:1,name:'a',phone:'(11)999992222'},
      {id:2,name:'b',phone:'(11)999992222'},
      {id:3,name:'c',phone:'(11)999992222'},
    ];

    oldLen = ContactService.contacts.length;


  });

  afterEach(() => {
    service.deleteAll();
  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  beforeEach(() => {
  });

  it('Test create', () => {
    service.create({id:0,name:'d',phone:'(11)999992222'});    
    expect(ContactService.contacts.length).not.toBe(oldLen);
  });

  it('Get specific', () => {
    const got = service.getContact(3);
    expect(got).toBeDefined();
  });
  it('Get notFound', () => {
    const got = service.getContact(9999);
    expect(got).toBeUndefined();
  });

  it('updateIds', () => {
    ContactService.contacts=[
      {id:0,name:'a',phone:'(11)999992222'},
      {id:0,name:'b',phone:'(11)999992222'},
      {id:0,name:'c',phone:'(11)999992222'},
    ];
    service['ajustIndexes']();
    expect(ContactService.contacts[2].id).toBe(3);
  });
  

  it('Delete specific', () => {
    service.delete(2);
    expect(ContactService.contacts.length).not.toBe(oldLen);
    expect(ContactService.contacts[ContactService.contacts.length-1].id).toBe(ContactService.contacts.length);
  });

  it('Clear session', () => {
    expect(service.deleteAll()).toBeTrue();    
  });  
});
