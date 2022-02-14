import express from 'express';
import {
  createCompany,
  deleteCompany,
  editCompany,
  getCompanyDetailsById,
  listAllCompanies,
} from '../controllers/company/company.js';
import {
  createEmployee,
  deleteEmployee,
  editEmployee,
  getEmployeeDetailsById,
  listAllEmployees,
} from '../controllers/employee/employee.js';

const router = express.Router();

//Crud api for company
router.post('/create-company', createCompany);
router.get('/get-company-detailsById/:id', getCompanyDetailsById);
router.post('/edit-company/:id', editCompany);
router.get('/list-all-companies', listAllCompanies);
router.delete('/delete-company/:id', deleteCompany);

//Crud api for Employee
router.post('/employee/create-employee', createEmployee);
router.post('/employee/edit-employee/:id', editEmployee);
router.get('/employee/get-employee-detailsById/:id', getEmployeeDetailsById);
router.get('/employee/list-all-employees', listAllEmployees);
router.delete('/employee/delete-employee/:id', deleteEmployee);

export default router;
