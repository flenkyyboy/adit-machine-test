import company from '../../models/company.js';
import employee from '../../models/employee.js';
import { validateCreateAndEditEmployee } from '../../validations/employeeValidation.js';

export const doCreateEmployee = (data) => {
  return new Promise(async (resolve, reject) => {
    const dataValidation = await validateCreateAndEditEmployee(data);
    if (dataValidation.error) {
      return reject({
        status: false,
        error: dataValidation.error.details[0].message.replace(/"/g, ''),
      });
    }

    //checking email existing
    let emailExisting = await employee.findOne({ email: data.email });
    if (emailExisting) {
      return reject({
        status: false,
        error: 'Email already existing',
      });
    }

    let companyExisting = await company.findOne({ _id: data.companyId }).catch((error) => {
      return reject({
        status: false,
        error: error,
      });
    });
    if (!companyExisting) {
      return reject({
        status: false,
        error: 'Company not existing',
      });
    }

    const obj = {
      name: data.name,
      place: data.place,
      phone: data.phone,
      email: data.email,
      dob: data.dob,
      gender: data.gender,
      role: data.role,
      companyId: data.companyId,
    };

    let Employee = new employee(obj);
    Employee.save()
      .then((_) => {
        return resolve({
          status: true,
          message: 'Employee Created Successfully',
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

export const doEditEmployee = (data, params) => {
  return new Promise(async (resolve, reject) => {
    const dataValidation = await validateCreateAndEditEmployee(data);
    if (dataValidation.error) {
      return reject({
        status: false,
        error: dataValidation.error.details[0].message.replace(/"/g, ''),
      });
    }

    //checking email existing
    let emailExisting = await employee.findOne({ $nor: [{ _id: params }], email: data.email });
    if (emailExisting) {
      return reject({
        status: false,
        error: 'Email already existing',
      });
    }

    let companyExisting = await company.findOne({ _id: data.companyId });
    if (!companyExisting) {
      return reject({
        status: false,
        error: 'Company not existing',
      });
    }

    const obj = {
      name: data.name,
      place: data.place,
      phone: data.phone,
      email: data.email,
      dob: data.dob,
      gender: data.gender,
      role: data.role,
      companyId: data.companyId,
    };

    await employee
      .updateOne({ _id: params }, obj)
      .then((_) => {
        return resolve({
          status: true,
          message: 'Employee edited Successfully',
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

export const doGetEmployeeDetailsById = (params) => {
  return new Promise(async (resolve, reject) => {
    let result = await employee
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
      return resolve({
        status: true,
        message: 'Successfully',
        data: result,
      });
    } else {
      return reject({
        status: false,
        error: 'Invalid id',
      });
    }
  });
};

export const doListAllEmployees = () => {
  return new Promise(async (resolve, reject) => {
    let result = await employee
      .find(
        {},
        {
          __v: 0,
        }
      )
      .populate({ path: 'companyId', select: 'name' })
      .catch((error) => {
        return reject({
          status: false,
          error: error,
        });
      });

    return resolve({
      status: true,
      message: 'Successfully',
      data: result,
    });
  });
};

export const doDeleteEmployee = (params) => {
  return new Promise(async (resolve, reject) => {
    await employee
      .deleteOne({ _id: params })
      .then((_) => {
        return resolve({
          status: true,
          message: 'Employee Deleted Successfully',
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
