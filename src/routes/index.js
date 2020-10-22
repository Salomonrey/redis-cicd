var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Doctor = mongoose.model("Doctor");
var Hospital = mongoose.model("Hospital");
var Service = mongoose.model("Service");
var redis = require('redis');
var crypto = require('crypto');
var client = redis.createClient(6379);

// var client;

// async function connectRedis() {
// 	client = await redis.createClient(6379);
// }

// connectRedis();


// const connect = async () => {
// 	var client = await redis.createClient(6379);
// }
// connect()
/* GET home page. */
router.post('/doctors', async function(req, res, next) {

  // const data = await Doctor.find({ _id:req.user._id }).populate("groups","group_name");
  // const data = await Doctor.find({});
  const { FIO, position, desc, cost, image  } = req.body
  var newDoctor = new Doctor({
    FIO, position, desc, cost, image
  });
  newDoctor.save(function(err,data) {
    if (err) {
	    console.log(err);
        return res.json({ success: false, msg: "Error with task" });
      }
      res.status(201).json({ success: true, msg: data });
  });
});

router.post('/hospitals', async function(req, res, next) {
  // const data = await Doctor.find({ _id:req.user._id }).populate("groups","group_name");
  // const data = await Doctor.find({});
  const { name, desc, image, rating, review, address, time_open, tel_number  } = req.body
  var newHospital = new Hospital({
    name, desc, image, rating, review, address, time_open, tel_number
  });
  newHospital.save(function(err,data) {
    if (err) {
	    console.log(err);
        return res.json({ success: false, msg: "Error with task" });
      }
      res.json({ success: true, msg: data });
  });
});

router.post('/services', async function(req, res, next) {
  // const data = await Doctor.find({ _id:req.user._id }).populate("groups","group_name");
  // const data = await Doctor.find({});
  const { name, costs  } = req.body
  var newService = new Service({
    name, costs
  });
  newService.save(function(err,data) {
    if (err) {
	    console.log(err);
        return res.json({ success: false, msg: "Error with task" });
      }
      res.json({ success: true, msg: data });
  });
});

router.get("/doctors", async function(req, res, next) {
try {
// const data = await Doctor.find({});
// client.set("doctors", JSON.stringify(data), redis.print);
// return res.json(data);
// if(process.env.NODE_ENV == "test") let client = redis.createClient(6379);
	client.get("doctors", async function(err, reply) {
	  if(reply) return res.json(JSON.parse(reply));
	  	const data = await Doctor.find({});
		client.set("doctors", JSON.stringify(data), redis.print);
		return res.status(200).json(data);
	});
	// if(process.env.NODE_ENV == "test") client.quit();
} catch (err) {
	console.log(err);
}
})

router.post("/macha", (req, res, next) => {
try{
  const secret = "sasasa";
  const sigHeaderName = 'X-Hub-Signature'

  const payload = JSON.stringify(req.body)
  const sig = req.get(sigHeaderName) || ''
  const hmac = crypto.createHmac('sha1', secret)
  const digest = Buffer.from('sha1=' + hmac.update(payload).digest('hex'), 'utf8')
  const checksum = Buffer.from(sig, 'utf8')
  
  console.log(checksum.length !== digest.length)
  console.log(!crypto.timingSafeEqual(digest, checksum))
} catch(err){
	console.log(err)
}

})

router.get("/hospitals", async function(req, res, next) {
try {
// const data = await Hospital.find({});
// client.set("hospitals", JSON.stringify(data), redis.print);
// return res.json(data);
if(process.env.NODE_ENV == "test") {let client = redis.createClient(6379);}
	client.get("hospitals", async function(err, reply) {
	  	if(reply) return res.status(201).json(JSON.parse(reply));
	  	const data = await Hospital.find({});
		client.set("hospitals", JSON.stringify(data), redis.print);
		return res.status(200).json(data);
	});
	// if(process.env.NODE_ENV == "test") client.quit();
} catch(err){
	console.log(err);
}
})

router.get("/services", async function(req, res, next) {
try {
// const data = await Service.find({});
// client.set("services", JSON.stringify(data), redis.print);
// return res.json(data); 
	client.get("services", async function(err, reply) {
		if(reply) return res.json(JSON.parse(reply));
		const data = await Service.find({});
		client.set("services", JSON.stringify(data), redis.print);
		return res.json(data);  
	});
} catch(err){
	console.log(err);
}
})

module.exports = router;


// {
// 	"FIO":"Сабденов Нурболат Оспанович",
// 	"position":"Проктолог",
// 	"desc":"Стаж 25 лет / Кандидат медицинских наук",
// 	"cost": "5000 тг.",
// 	"image": "https://api.doq.kz/media/doctors/sabdenov-nurbolat.jpg"
// }

// {
// 	"name":"Ермен clinic",
// 	"desc":"Медицинский центр «Alanda Clinic» - многопрофильная клиника, которая работает в Астане и Караганде с 2006 года. «Alanda Clinic» объединяет в себе поли...",
// 	"rating":"9.5",
// 	"review":"3229",
// 	"address": "пр. Тәуелсіздік, 33",
// 	"time_open": "8",
// 	"tel_number": "8 (778) 096-55-19",
// 	"image": "https://api.doq.kz/media/clinics/logo-ermen-clinic.jpg"
// }

// {
// 	"name":"МРТ",
// 	"costs":[{"name":"МРТ височно-нижнечелюстных суставов", "cost":"27000"},
// 					{"name":"МРТ гипофиза", "cost":"27000"},
// 					{"name":"МРТ глазных орбит", "cost":"27000"},
// 					{"name":"МРТ голеностопного сустава", "cost":"27000"},
// 					{"name":"МРТ головного мозга", "cost":"27000"},
// 					{"name":"МРТ грудного отдела позвоночника", "cost":"27000"}]
// }
