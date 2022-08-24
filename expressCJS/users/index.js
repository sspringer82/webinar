const { Router } = require('express');
const { create, getAll, getOne, remove, update } = require('./controller.js');

const router = Router();

router.get('/', getAll);

router.get('/:id', getOne);

router.post('/', create);

router.put('/:id', update);

router.delete('/:id', remove);

module.exports = router;
