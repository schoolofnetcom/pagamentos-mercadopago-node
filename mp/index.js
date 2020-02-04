const { Router } = require('express');
const router = Router();
const MP = require('./mp');

router.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

router.get('/thanks', (req, res) => {
    return res.sendFile(__dirname + '/thanks.html');
})

router.post('/', async (req, res) => {
    const paymentData = {
        transaction_amount: 10,
        description: 'Test Payment',
        installments: 1,
        token: req.body.token,
        payment_method_id: 'visa',
        payer: {
            email: 'admin@admin.com'
        }
    };
    
    return MP.payment.save(paymentData)
        .then(data => res.redirect('/mp/thanks'))
        .catch(err => res.status(500).json({ err }));
});

module.exports = router;