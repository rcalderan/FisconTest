import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';


let oldLen:number;

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactService);

    //basic state
    service['contacts']=[
      {id:1,name:'a',phone:'(11)999992222'},
      {id:2,name:'b',phone:'(11)999992222'},
      {id:3,name:'c',phone:'(11)999992222'},
    ];
    service['save']();
    oldLen = service['contacts'].length;
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
    expect(service['contacts'].length).not.toBe(oldLen);
  });

  
  it('Get all', () => {
    service['save']();
    const len=service['contacts'].length;
    const got = service.getContacts();
    expect(len).toBe(got.length);
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
    const expected = service['contacts'][2].id;
    service['contacts'][2].id=0;
    service['ajustIndexes']();
    expect(service['contacts'][2].id).toBe(service['contacts'][2].id);
  });
  

  it('Delete specific', () => {
    service.delete(2);
    expect(service['contacts'].length).not.toBe(oldLen);
    expect(service['contacts'][service['contacts'].length-1].id).toBe(service['contacts'].length);
  });

  it('Clear session', () => {
    expect(service.deleteAll()).toBeTrue();    
  });  
});
