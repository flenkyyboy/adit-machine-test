import company from '../../models/company.js';
import { validateCreateAndEditCompany } from '../../validations/companyValidation.js';

export const doCreateCompany = (data) => {
  return new Promise(async (resolve, reject) => {
    const dataValidation = await validateCreateAndEditCompany(data);
    if (dataValidation.error) {
      return reject({
        status: false,
        error: dataValidation.error.details[0].message.replace(/"/g, ''),
      });
    }

    //checking email existing
    let emailExisting = await company.findOne({ email: data.email });
    if (emailExisting) {
      return reject({
        status: false,
        error: 'Email already existing',
      });
    }

    const obj = {
      name: data.name,
      place: data.place,
      phone: data.phone,
      email: data.email,
    };

    let Company = new company(obj);
    Company.save()
      .then((_) => {
        return resolve({
          status: true,
          message: 'Company Created Successfully',
        });
      })
      .catch((error) => {
        return reject({
          status: false,
          error: error,
        });
      });
  });
};

export const doEditCompany = (data, params) => {
  return new Promise(async (resolve, reject) => {
    const dataValidation = await validateCreateAndEditCompany(data);
    if (dataValidation.error) {
      return reject({
        status: false,
        error: dataValidation.error.details[0].message.replace(/"/g, ''),
      });
    }

    //checking email existing
    let emailExisting = await company.findOne({ $nor: [{ _id: params }], email: data.email }).catch((error) => {
      return reject({
        status: false,
        error: error,
      });
    });

    if (emailExisting) {
      return reject({
        status: false,
        error: 'Email already existing',
      });
    }

    const obj = {
      name: data.name,
      place: data.place,
      phone: data.phone,
      email: data.email,
    };

    await company
      .updateOne({ _id: params }, obj)
      .then((_) => {
        return resolve({
          status: true,
          message: 'Company Edited Successfully',
        });
      })
      .catch((error) => {
        return reject({
          status: false,
          error: error,
        });
      });
  });
};

export const DoGetCompanyDetailsById = (params) => {
  return new Promise(async (resolve, reject) => {
    let result = await company
      .findOne(
        { _id: params },
        {
          __v: 0,
        }
      )
      .catch((error) => {
        return reject({
          status: false,
          error: error,
        });
      });

    if (result) {
      resolve({
        status: true,
        message: 'Success',
        data: result,
      });
    } else {
      reject({
        status: false,
        error: 'Invalid Id',
      });
    }
  });
};

export const DoListAllCompanies = () => {
  return new Promise(async (resolve, reject) => {
    let result = await company.find(
      {},
      {
        __v: 0,
      }
    );
    resolve({
      status: true,
      message: 'Success',
      data: result,
    });
  });
};
export const DoDeleteCompany = (params) => {
  return new Promise(async (resolve, reject) => {
    await company
      .deleteOne({ _id: params })
      .then((_) => {
        return resolve({
          status: true,
          message: 'Company Deleted Successfully',
        });
      })
      .catch((error) => {
        return reject({
          status: false,
          error: error,
        });
      });
  });
};
