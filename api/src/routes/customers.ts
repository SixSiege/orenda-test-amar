import express from 'express';
import CustomersController from '../controllers/customers.controller';

const router = express.Router();

const controller = new CustomersController();

router.post('/', controller.createCustomer);

router.get('/', controller.getCustomer);

router.get('/:id', controller.getCustomerById);

router.put('/:id', controller.updateCustomer);

router.delete('/:id', controller.deleteCustomer);

module.exports = router;