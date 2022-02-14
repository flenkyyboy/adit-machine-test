import {
  doCreateEmployee,
  doDeleteEmployee,
  doEditEmployee,
  doGetEmployeeDetailsById,
  doListAllEmployees,
} from './employeeController.js';

export const createEmployee = (req, res) => {
  doCreateEmployee(req.body)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(400).json(error));
};

export const editEmployee = (req, res) => {
  doEditEmployee(req.body, req.params.id)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(400).json(error));
};

export const getEmployeeDetailsById = (req, res) => {
  doGetEmployeeDetailsById(req.params.id)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(400).json(error));
};

export const listAllEmployees = (req, res) => {
  doListAllEmployees()
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(400).json(error));
};

export const deleteEmployee = (req, res) => {
  doDeleteEmployee(req.params.id)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(400).json(error));
};
