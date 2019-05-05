import { InMemoryDbService } 	from 'angular-in-memory-web-api';
import { Appointment } 			from './appointment';
import { Doctor }				from './doctor';
import { Patient }				from './patient';
import { Injectable } 			from '@angular/core';
 
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
  	const appointments = [
      { pat_id: 'Z76PKBJ156WLK', doc_id: '3WDUZBXQAO3CO', inst_id: '3241', date: '2019-05-01', time: '11:45'},
      { pat_id: 'X4LLZBR1G8KRP', doc_id: 'XZ1OO5KYWZIGZ', inst_id: '3241', date: '2019-05-06', time: '13:00'},
      { pat_id: 'B00DP1V1XEMOL', doc_id: 'IBUHEPSIK9IQ6', inst_id: '9478', date: '2019-05-10', time: '14:30'},
      { pat_id: 'ZXZRTJ4Z8FYE1', doc_id: 'B4FOLXFTYRAEN', inst_id: '8643', date: '2019-05-13', time: '15:45'},
      { pat_id: 'XSW90MJ46B01T', doc_id: 'GV40I3MZQJBXW', inst_id: '8643', date: '2019-05-16', time: '17:00'},
      { pat_id: 'BQPCBFUU8UFQC', doc_id: 'BANRCIJWNU1TE', inst_id: '3241', date: '2019-05-01', time: '13:00'},
      { pat_id: 'CW7HIG31YIZHO', doc_id: 'BTAG8N6EN7Z0G', inst_id: '9478', date: '2019-05-03', time: '13:15'},
      { pat_id: '5D82O0URTE38Q', doc_id: 'B4FOLXFTYRAEN', inst_id: '8643', date: '2019-05-08', time: '15:45'},
      { pat_id: '1Z3K7VC3WN29J', doc_id: 'BANRCIJWNU1TE', inst_id: '8643', date: '2019-05-13', time: '16:30'},
      { pat_id: 'ZT4B5GA873FDD', doc_id: 'BTAG8N6EN7Z0G', inst_id: '8643', date: '2019-05-16', time: '16:45'}
    ];
    const doctors = [
      { id: '3WDUZBXQAO3CO', name: 'Nigel Tucker', department: 'Coronary Care'},
      { id: 'XZ1OO5KYWZIGZ', name: 'Aditya Oconnor', department: 'Emergency'},
      { id: 'IBUHEPSIK9IQ6', name: 'Pedro Glover', department: 'Intensive Care'},
      { id: 'B4FOLXFTYRAEN', name: 'Alissa Wilkins', department: 'Psychiatric'},
      { id: 'GV40I3MZQJBXW', name: 'Felicia Pope', department: 'Intensive Care'},
      { id: 'BANRCIJWNU1TE', name: 'Erica Wolfe', department: 'Emergency'},
      { id: 'BTAG8N6EN7Z0G', name: 'Lewis Mullins', department: 'U8TPHS'},
      { id: 'FEDJV53SIL1PL', name: 'Enrique Hanson', department: 'Psychiatric'},
      { id: 'GT8B0FK3UULWV', name: 'Sergio Flowers', department: 'Intensive Care'},
      { id: 'ULHGKP3U3R1AN', name: 'America Chase', department: 'Physical Therapy'}
    ];
    const patients = [
      { id: 'M0B43BYQI2VV8', name: 'Ryker Grimes', gender: 'Male', phone: '1-404-995-4574', birthdate: '1935-01-08', address: '9031 Greenview Drive Duluth, MN', ssn: '941379263', insurance: 'XRIJN8IEVZ'},
      { id: 'MXVIUM4DWCUA3', name: 'Melvin Hoover', gender: 'Male', phone: '1-375-854-5241', birthdate: '1939-02-04', address: '7853 Bay Lane Luverne, MN', ssn: '374275587', insurance: 'KW0IXSHSTQ'},
      { id: 'LLSP91IDBF49T', name: 'Griffin Mueller', gender: 'Male', phone: '1-294-727-0696', birthdate: '1941-04-30', address: '37 Champion Ave. Moorhead, MN', ssn: '460236545', insurance: 'TBOSWTHBEG'},
      { id: '1Y2WBG5S5LUP4', name: 'Frederick Hampton', gender: 'Male', phone: '1-065-794-7396', birthdate: '1944-10-10', address: '75 Edgefield Lane Rochester, MN', ssn: '111594704', insurance: '3551IBYBYL'},
      { id: 'HH5C3A6KKYCKL', name: 'Allisson Valentine', gender: 'Female', phone: '1-966-294-5231', birthdate: '1946-08-27', address: '299 West Front St. Ormsby, MN', ssn: '630313342', insurance: 'WPPO60VJO2'},
      { id: 'B2A74AG6HJ7D7', name: 'Ace Cardenas', gender: 'Male', phone: '1-213-590-1735', birthdate: '1953-04-03', address: '8807 Royalty St. Homer, MN', ssn: '462545236', insurance: 'KU2A5W4RPS'},
      { id: '9TXZPRZTX3N3W', name: 'Dean Burnett', gender: 'Male', phone: '1-288-056-1409', birthdate: '1956-02-15', address: '318 West Theater Lane Battle Lake, MN', ssn: '243096799', insurance: 'GXSCYTXJWY'},
      { id: 'LSVQTCUN1RYTY', name: 'Lucy Marks', gender: 'Female', phone: '1-301-451-6851', birthdate: '1959-10-19', address: '7 West St Paul Ave. Stewartville, MN', ssn: '104525442', insurance: 'E1KTG9U7AX'},
      { id: 'RG946TN8QW5BO', name: 'Tessa Sharp', gender: 'Female', phone: '1-354-339-7097', birthdate: '1965-12-07', address: '7006 Marble Drive Minneapolis, MN', ssn: '845707805', insurance: 'T2GK7KRTII'},
      { id: 'YEWRDIQ6XK2QZ', name: 'Jayla Duke', gender: 'Female', phone: '1-899-062-2565', birthdate: '1973-01-18', address: '97 Lees Creek St. Glyndon, MN', ssn: '715250328', insurance: 'MDDMJ7NYV0'}
    ];
    return {appointments, doctors, patients};
  }
}