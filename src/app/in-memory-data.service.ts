import { Injectable }           from '@angular/core';

import { InMemoryDbService } 	  from 'angular-in-memory-web-api';

import { Appointment } 			    from './appointment-src/appointment';
import { Department }           from './department-src/department';
import { Doctor }				        from './doctor-src/doctor';
import { Institution }          from './institution-src/institution';
import { Nurse }                from './nurse-src/nurse';
import { MedicalRecord }        from './patient-src/medical-record';
import { Patient }				      from './patient-src/patient';
import { Payment }              from './payment-src/payment';
import { Pharmacy }             from './pharmacy-src/pharmacy';
import { Prescription }         from './prescription-src/prescription';
import { Secretary }            from './secretary-src/secretary';
 
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
  	const appointments = [
      { id: 'Z76PKBJ156WLK', doc_id: '3WDUZBXQAO3CO', inst_id: '3241', date: '2019-05-01', time: '11:45'},
      { id: 'X4LLZBR1G8KRP', doc_id: 'FEDJV53SIL1PL', inst_id: '3241', date: '2019-05-06', time: '13:00'},
      { id: 'B00DP1V1XEMOL', doc_id: 'FEDJV53SIL1PL', inst_id: '9478', date: '2019-05-10', time: '14:30'},
      { id: 'ZXZRTJ4Z8FYE1', doc_id: 'XGB2AGQ3CHAGP', inst_id: '8643', date: '2019-05-13', time: '15:45'},
      { id: 'XSW90MJ46B01T', doc_id: 'GT8B0FK3UULWV', inst_id: '8643', date: '2019-05-16', time: '17:00'},
      { id: 'BQPCBFUU8UFQC', doc_id: '3WDUZBXQAO3CO', inst_id: '3241', date: '2019-05-01', time: '13:00'},
      { id: 'CW7HIG31YIZHO', doc_id: 'ULHGKP3U3R1AN', inst_id: '9478', date: '2019-05-03', time: '13:15'},
      { id: '5D82O0URTE38Q', doc_id: 'XGB2AGQ3CHAGP', inst_id: '8643', date: '2019-05-08', time: '15:45'},
      { id: '1Z3K7VC3WN29J', doc_id: '3WDUZBXQAO3CO', inst_id: '8643', date: '2019-05-13', time: '16:30'},
      { id: 'ZT4B5GA873FDD', doc_id: 'ULHGKP3U3R1AN', inst_id: '8643', date: '2019-05-16', time: '16:45'}
    ];
    const departments = [
      { id: 'XHJMKR', d_num: 1, d_name: 'Intensive Care', phone: '1-800-833-5635', head_id: 'XGB2AGQ3CHAGP', inst_id: '3241' },
      { id: 'BSR6NC', d_num: 2, d_name: 'Burn Center', phone: '1-800-833-9852', head_id: '7J9KE4S0DONJQ', inst_id: '3241' },
      { id: 'QZS60A', d_num: 5, d_name: 'Coronary Care', phone: '1-952-892-2220', head_id: '3WDUZBXQAO3CO', inst_id: '9478' },
      { id: 'HCAE2O', d_num: 6, d_name: 'Emergency', phone: '1-952-892-5662', head_id: 'QUQBRW489ZRYI', inst_id: '9478' },
      { id: 'X5ONCN', d_num: 10, d_name: 'Emergency', phone: '1-218-681-4991', head_id: 'D8WGQZN3AFG66', inst_id: '8643' },
      { id: 'U8TPHS', d_num: 11, d_name: 'Acute Medical', phone: '1-218-681-7777', head_id: 'VV85338CD33W2', inst_id: '8643' }
    ]
    const doctors = [
      { id: 'XGB2AGQ3CHAGP', name: 'Nigel Tucker', dept_id: 'XHJMKR', ssn: '134037522', start_date: '2003-08-11', address: '248 3rd St. S. #313B, Waite Park, MN', phone: '1-320-202-1841'},
      { id: '7J9KE4S0DONJQ', name: 'Aditya Oconnor', dept_id: 'BSR6NC', ssn: '601316927', start_date: '1981-03-05', address: '909 Celebration Cir, Sartell, MN', phone: '1-320-203-1266'},
      { id: '3WDUZBXQAO3CO', name: 'Pedro Glover', dept_id: 'QZS60A', ssn: '392222689', start_date: '2016-12-09', address: 'Cone Marketplace Pne Sartell, MN', phone: '1-910-989-2200'},
      { id: 'QUQBRW489ZRYI', name: 'Alissa Wilkins', dept_id: 'HCAE2O', ssn: '647023154', start_date: '1986-02-25', address: '14996 Mustang Path, Savage, MN', phone: '1-314-830-3823'},
      { id: 'D8WGQZN3AFG66', name: 'Felicia Pope', dept_id: 'X5ONCN', ssn: '953346601', start_date: '2017-08-15', address: '1975 White Bridge Rd. NW, Oronoco, MN', phone: '1-904-620-8457'},
      { id: 'VV85338CD33W2', name: 'Erica Wolfe', dept_id: 'U8TPHS', ssn: '973918783', start_date: '2011-09-12', address: '4911 Bryan Avenue, Minneapolis, MN', phone: '1-651-286-3482'},
      { id: 'BTAG8N6EN7Z0G', name: 'Lewis Mullins', dept_id: 'U8TPHS', ssn: '499518795', start_date: '2009-09-29', address: '1566 Pritchard Court, Owatonna, MN', phone: '1-507-446-2106'},
      { id: 'FEDJV53SIL1PL', name: 'Enrique Hanson', dept_id: 'HCAE2O', ssn: '434595737', start_date: '1981-08-08', address: '401 7th St. S #106, Waite Park, MN', phone: '1-320-202-0892'},
      { id: 'GT8B0FK3UULWV', name: 'Sergio Flowers', dept_id: 'BSR6NC', ssn: '313897191', start_date: '2016-04-22', address: 'Po Box 578, Alexandria, MN', phone: '1-260-350-1051'},
      { id: 'ULHGKP3U3R1AN', name: 'America Chase', dept_id: 'X5ONCN', ssn: '393058502', start_date: '2002-09-05', address: '1611 Orchard Street, Webster, MN', phone: '1-952-652-6798'}
    ];
    const institutions = [
      { id: '3241', inst_name: 'Sanford Bemidji Medical Center', phone: '18008338979', address: '1300 Anne St. NW, Bemidji, MN'},
      { id: '9478', inst_name: 'Fairview Ridges Hospital', phone: '19528922000', address: '201 E Nicollet Blvd, Burnsville, MN'},
      { id: '8643', inst_name: 'Sanford Thief River Falls Medical Center', phone: '12186814240', address: '3001 Sanford Parkway, Thief River Falls, MN'}
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
    const medicalRecords = [
      { id: 'M0B43BYQI2VV8', height: 57.4, weight: 167.8, family_med_history: 'diabetes, stroke', allergies: 'urticaria', pre_exist_cond: 'sleep apnea', treatment_history: ''},
      { id: 'MXVIUM4DWCUA3', height: 74.7, weight: 185.2, family_med_history: 'heart disease', allergies: 'dermatitis', pre_exist_cond: '', treatment_history: ''},
      { id: 'LLSP91IDBF49T', height: 69.0, weight: 293.7, family_med_history: 'heart disease', allergies: 'rhinitis', pre_exist_cond: 'COPD', treatment_history: ''},
      { id: '1Y2WBG5S5LUP4', height: 69.4, weight: 189.1, family_med_history: 'high blood pressure', allergies: 'eczema', pre_exist_cond: '', treatment_history: ''},
      { id: 'HH5C3A6KKYCKL', height: 83.8, weight: 120.2, family_med_history: '', allergies: 'asthma', pre_exist_cond: 'diabetes', treatment_history: ''},
      { id: 'B2A74AG6HJ7D7', height: 75.9, weight: 248.7, family_med_history: '', allergies: '', pre_exist_cond: '', treatment_history: ''},
      { id: '9TXZPRZTX3N3W', height: 69.8, weight: 199.6, family_med_history: 'diabetes', allergies: 'urticaria', pre_exist_cond: 'COPD', treatment_history: ''},
      { id: 'LSVQTCUN1RYTY', height: 78.8, weight: 270.4, family_med_history: '', allergies: 'dermatitis', pre_exist_cond: 'sleep apnea', treatment_history: ''},
      { id: 'RG946TN8QW5BO', height: 68.8, weight: 284.5, family_med_history: 'high blood pressure, stroke', allergies: 'food allergy', pre_exist_cond: '', treatment_history: ''},
      { id: 'YEWRDIQ6XK2QZ', height: 73.4, weight: 240.5, family_med_history: '', allergies: '', pre_exist_cond: 'diabetes', treatment_history: ''}
    ];
    const nurses = [
      { id: 'A5NS3Q9C35KXW', name: 'Cassidy Little', start_date: '1983-12-20', address: '4756  Oral Lake Road, Golden Valley, MN', phone: '1-494-324-5414', dept_id: 'XHJMKR'},
      { id: '0TXV11PQSBWH5', name: 'Davin Kaiser', start_date: '1988-09-14', address: '645 Fieldstone Street Minneapolis, MN', phone: '1-767-147-8186', dept_id: 'XHJMKR'},
      { id: '49RO77FWYO7R3', name: 'Gilberto Petersen', start_date: '2002-09-02', address: '718 South Somerset Ave. Dexter, MN', phone: '1-796-002-1643', dept_id: 'BSR6NC'},
      { id: '7FVIYZH3XZHQZ', name: 'Fiona Joseph', start_date: '2003-10-06', address: '90 Glendale Street Gary, MN', phone: '1-229-195-0782', dept_id: 'BSR6NC'},
      { id: 'O5SH0CA2SSO6T', name: 'Lesly Knox', start_date: '1985-10-29', address: '80 West Stonybrook Lane Garrison, MN', phone: '1-602-623-8201', dept_id: 'QZS60A'},
      { id: 'WICUEBGDF1XTR', name: 'Dayana Molina', start_date: '1998-10-31', address: '74 Penn Drive West Union, MN', phone: '1-605-717-1509', dept_id: 'QZS60A'},
      { id: 'C270SLWQJC3SP', name: 'Bridget Page', start_date: '2019-02-17', address: '269 South Bellow Lane Canby, MN', phone: '1-675-979-2149', dept_id: 'HCAE2O'},
      { id: '055BEHLN0Y8MX', name: 'Elyse Wang', start_date: '1980-08-19', address: '61 Spruce Ave. Holdingford, MN', phone: '1-777-251-2264', dept_id: 'HCAE2O'},
      { id: 'JVVL4QQODKD2T', name: 'Aryan Gregory', start_date: '1986-06-30', address: '220 North Little Lane Hardwick, MN', phone: '1-404-057-1451', dept_id: 'X5ONCN'},
      { id: 'R23XEWF55G5M6', name: 'Karli Hunt', start_date: '1988-06-03', address: '716 E. Spruce Dr. Fairfax, MN', phone: '1-942-738-6542', dept_id: 'X5ONCN'},
      { id: 'URCBAOOFR32WS', name: 'Bella Mccarthy', start_date: '1993-10-18', address: '607 N. Estate St. Mabel, MN', phone: '1-989-733-3280', dept_id: 'U8TPHS'},
      { id: 'GFZ9NCQCSVWO0', name: 'Kendrick Pham', start_date: '2010-10-02', address: '903 St Paul Road Young America, MN', phone: '1-734-486-3961', dept_id: 'U8TPHS'}
    ];
    const payments = [
      { patid: 'M0B43BYQI2VV8', amount: 1201.54, paid: 1000.0, date: '2019-01-08', reason: 'heart transplant', status: 'u', insur_id: ''},
      { patid: 'MXVIUM4DWCUA3', amount: 409.48, paid: 409.48, date: '2019-01-10', reason: 'physical therapy', status: 'p', insur_id: ''},
      { patid: 'LLSP91IDBF49T', amount: 461.42, paid: 461.42, date: '2019-01-24', reason: 'physical therapy', status: 'p', insur_id: ''},
      { patid: '1Y2WBG5S5LUP4', amount: 719.13, paid: 125.00, date: '2019-01-29', reason: 'lung transplant', status: 'u', insur_id: ''},
      { patid: 'HH5C3A6KKYCKL', amount: 1676.44, paid: 400.00, date: '2019-01-31', reason: 'medication', status: 'u', insur_id: ''},
      { patid: 'B2A74AG6HJ7D7', amount: 978.28, paid: 978.28, date: '2019-02-04', reason: 'hair transplant', status: 'p', insur_id: ''},
      { patid: '9TXZPRZTX3N3W', amount: 1136.2, paid: 0.00, date: '2019-02-11', reason: 'physical therapy', status: 'u', insur_id: ''},
      { patid: 'LSVQTCUN1RYTY', amount: 859.13, paid: 666.66, date: '2019-02-20', reason: 'physical therapy', status: 'u', insur_id: ''},
      { patid: 'RG946TN8QW5BO', amount: 819.96, paid: 505.55, date: '2019-02-21', reason: 'physical therapy', status: 'u', insur_id: ''},
      { patid: 'YEWRDIQ6XK2QZ', amount: 790.26, paid: 790.26, date: '2019-02-26', reason: 'physical therapy', status: 'p', insur_id: ''}
    ];
    const pharmacies = [
      { id: '5123', name: 'Sanford Pharmacy', address: '3001 Sanford Parkway, Thief River Falls, MN', phone: '1-218-683-2725'},
      { id: '7543', name: 'Fairview Pharmacy', address: '14101 Fairview Dr, Burnsville, MN', phone: '1-952-405-5630'},
      { id: '2464', name: 'CVS Pharmacy Mankato', address: '1850 Adams St., Mankato, MN', phone: '1-507-625-9009'},
      { id: '7373', name: 'Sanford Pharmacy Bemidji', address: '1233 34th St. NW, Bemidji, MN', phone: '1-218-333-5265'},
      { id: '5143', name: 'Guidepoint Pharmacy', address: '108 S 6th St.', phone: '1-218-829-0347'}
    ];
    const prescriptions = [
      { id: 'P7LLDI6VNE4MOZ3', start_date: '2019-01-14', end_date: '2019-02-14', medication: 'Oxycoxitrol', dosage: 25, interval: 'daily', doc_id: 'XGB2AGQ3CHAGP', pat_id: 'M0B43BYQI2VV8'},
      { id: 'JPHE9G4C1PCONYI', start_date: '2019-01-31', end_date: '2019-03-30', medication: 'Podoracil', dosage: 20, interval: 'twice a week', doc_id: '7J9KE4S0DONJQ', pat_id: 'MXVIUM4DWCUA3'},
      { id: 'F81571IUN1JEYK8', start_date: '2019-02-05', end_date: '2019-05-25', medication: 'Solalinum Afinitone', dosage: 5, interval: 'one a week', doc_id: '3WDUZBXQAO3CO', pat_id: 'LLSP91IDBF49T'},
      { id: '4J1NH0NND6Q0OZO', start_date: '2019-04-10', end_date: '2019-05-15', medication: 'Aflutiza', dosage: 75, interval: 'daily', doc_id: 'QUQBRW489ZRYI', pat_id: '1Y2WBG5S5LUP4'},
      { id: 'HPE4RFG2SY808T1', start_date: '2019-05-01', end_date: '2019-06-29', medication: 'Amansate Trixane', dosage: 25, interval: 'daily', doc_id: 'D8WGQZN3AFG66', pat_id: 'HH5C3A6KKYCKL'},
      { id: '1N0A9LJ2QHTLQ3I', start_date: '2019-01-11', end_date: '2019-03-18', medication: 'Aflutiza', dosage: 10, interval: 'twice daily', doc_id: 'VV85338CD33W2', pat_id: 'B2A74AG6HJ7D7'},
      { id: 'Q1Y75SYQ0N50KAZ', start_date: '2019-01-28', end_date: '2019-02-28', medication: 'Etocane Palotant', dosage: 20, interval: 'one a week', doc_id: 'BTAG8N6EN7Z0G', pat_id: '9TXZPRZTX3N3W'},
      { id: '8CBQOMCDLPJYW2U', start_date: '2019-02-18', end_date: '2019-04-24', medication: 'Oxycoxitrol', dosage: 75, interval: 'twice a week', doc_id: 'FEDJV53SIL1PL', pat_id: 'LSVQTCUN1RYTY'},
      { id: 'QK2VEGYFCNIT7GL', start_date: '2019-03-07', end_date: '2019-06-08', medication: 'Solalinum Afinitone', dosage: 10, interval: 'daily', doc_id: 'GT8B0FK3UULWV', pat_id: 'RG946TN8QW5BO'},
      { id: '3AB9K7YH5FZ8W0O', start_date: '2019-04-02', end_date: '2019-07-01', medication: 'Podoracil', dosage: 25, interval: 'daily', doc_id: 'ULHGKP3U3R1AN', pat_id: 'YEWRDIQ6XK2QZ'}
    ];
    const secretaries = [
      { id: 'UOO4N4ZCW1RF6', name: 'Leyla Bradford', phone: '1-897-929-6345', address: 'UOO4N4ZCW1RF6', start_date: '1992-04-02', dept_id: 'XHJMKR'},
      { id: 'KL0KEI16N70BZ', name: 'Elliot Bowen', phone: '1-897-929-5754', address: '8242 Innovation Street Alexandria, MN', start_date: '1998-11-03', dept_id: 'BSR6NC'},
      { id: 'X68TVEOYT225Y', name: 'Marianna Moyer', phone: '1-471-844-8838', address: '93 West Windmill St. Clontarf, MN', start_date: '2014-09-07', dept_id: 'QZS60A'},
      { id: 'OVDCUXAII1LR2', name: 'Angie Reed', phone: '1-210-174-0963', address: '425 Shirley Ave. Duluth, MN', start_date: '1993-03-14', dept_id: 'HCAE2O'},
      { id: 'TNQKC0VTM4KXC', name: 'Alfonso Noble', phone: '1-184-217-2988', address: '79 Columbia Dr. Belle Plaine, MN', start_date: '2003-10-20', dept_id: 'X5ONCN'},
      { id: 'QSL10FMRY8M20', name: 'Katrina Mcintosh', phone: '1-028-273-4987', address: '7583 Richardson Ave. Duluth, MN', start_date: '2014-01-17', dept_id: 'U8TPHS'}
    ];
    return {appointments, departments, doctors, institutions, patients, medicalRecords, 
            nurses, payments, pharmacies, prescriptions, secretaries};
  }
}