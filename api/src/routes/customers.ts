import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/', async (req, res) => {
    const  { name, phone, email, address } = req.body;
    try {
        const customer = await prisma.customers.create({
            data: {
                name,
                phone,
                email,
                address,
            },
        });
        res.json(customer);
    } catch (err) {
        res.status(500).json({ err: 'Error creating customer' });
    }
});

router.get('/', async (req, res) => {
    try {
        const customers = await prisma.customers.findMany();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ err: 'Error creating customer' });
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await prisma.customers.findUnique({
            where: {
                id_cust: parseInt(id)
            }
        });
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).json({ err: 'Customer not found' });
        }
    } catch (err) {
        res.status(500).json({ err: 'Error fetching customer' });
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, phone, email, address } = req.body;
    try {
        const updatedCustomer = await prisma.customers.update({
            where: {
                id_cust: parseInt(id)
            },
            data: {
                name,
                phone,
                email,
                address
            },
        });
        res.json(updatedCustomer);
    } catch (err) {
        res.status(500).json({ error: "Error updating customer" })
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.customers.delete({
            where: {
                id_cust: parseInt(id)
            }
        });
        res.json("Customer deleted successfully");
    } catch (err) {
        res.status(500).json({ error: "Error deleting customer" })
    }
});

module.exports = router;