const router = require('express').Router();
const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
	try {
		const auth = req.body;
		if (!auth.username || !auth.password) {
			res.status(400).json({ message: 'Username and password Required' });
		}
		auth.password = bcrypt.hashSync(auth.password, 14);
		await db('users').insert(auth);

		res.status(201).json({ message: `successfully added ${auth.username}` });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Username Taken user another username' });
	}
});

router.post('/login', async (req, res) => {
	const auth = req.body;
	const user = await db('users').select('*').where('users.username', req.body.username).first();

	if (!user || !bcrypt.compare(auth.password, user.password)) {
		res.status(401).json({ message: 'invalid auth' });
	}
	const payload = {
		userId: user.id,
		userName: user.username
	};
	const token = jwt.sign(payload, 'howdy');
	res.cookie('token', token);
	res.status(200).json({ message: `Welcome ${user.username}` });
});

module.exports = router;
