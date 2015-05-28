var express = require('express');
var router = express.Router();
var Truck = require('../models/truckModel');

router.route('/')
	.get(function (req, res) {
		
		Truck.find(function (error, trucks) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.json(trucks);
			}
		});
	})
	.post(function (req, res) {

		var truck = new Truck(req.body);
		if (truck) {
			truck.save(function (err, truck) {
				if (err) { return console.error(err); }
				res.status(201).send(truck);
			});
		} else {
			res.status(400).send('unable to add new truck');
		}
	});

router.route('/:id')
	.all(function (req, res, next) {

		Truck.findById(req.params.id, function (error, truck) {
			if (error) {
				res.status(500).send(error);
			} else if (truck) {
				req.truck = truck;
				next();
			} else {
				res.status(404).send('truck not found');
			}
		});
	})
	.get(function (req, res) {

		res.json(req.truck);
	})
	.put(function (req, res) {

		var truck = req.truck;

		if (req.body) {
			truck.name = req.body.name;
 			truck.foodType = req.body.foodType;
 			truck.schedule = req.body.schedule;
 			truck.payment = req.body.payment;
 			truck.description = req.body.description;
 			truck.website = req.body.website;
 			truck.Facebook = req.body.Facebook;
 			truck.Twitter = req.body.Twitter;
 			truck.save(function (err, truck) {
 				if (err) { return console.error(err); }
 				res.status(201).send(truck);
 			});
		} else {
			res.status(400).send('unable to update truck');
		}
	})
	.delete(function (req, res) {
		
		req.truck.remove();
		res.status(204).send('removed');
	});

module.exports = router;
