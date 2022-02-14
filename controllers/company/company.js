import {
  doCreateCompany,
  DoDeleteCompany,
  doEditCompany,
  DoGetCompanyDetailsById,
  DoListAllCompanies,
} from './companyController.js';

export const createCompany = (req, res) => {
  doCreateCompany(req.body)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(400).json(error));
};

export const editCompany = (req, res) => {
  doEditCompany(req.body, req.params.id)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(400).json(error));
};

export const getCompanyDetailsById = (req, res) => {
  DoGetCompanyDetailsById(req.params.id)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(400).json(error));
};

export const listAllCompanies = (req, res) => {
  DoListAllCompanies()
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(400).json(error));
};

export const deleteCompany = (req, res) => {
  DoDeleteCompany(req.params.id)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(400).json(error));
};
