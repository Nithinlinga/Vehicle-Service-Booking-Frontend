const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const app = express();


app.use(cors());
app.use(express.json());

 
const db = mysql.createConnection({ 
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,  
  password: process.env.DB_PASS, 
  database: 'sb'
});


db.connect(err => {  
  if (err) 
    throw err;   
  console.log('Connected to MySQL'); 
});


 
//Register Page 
app.get('/register', (req, res) => {
  db.query('SELECT * FROM auth', (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

app.post('/register', (req, res) => {
  const { username, email, password, role } = req.body;

  if (role === "Admin" || role === "admin") {
    return res.status(400).json({ error: "Admin registration not allowed" });
  }

  // Check if username or email already exists
  db.query('SELECT * FROM auth WHERE username = ? OR email = ?', [username, email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length > 0) {
      const existing = results[0];
      if (existing.username === username && existing.email === email) {
        return res.status(409).json({ error: "Username and email already exist" });
      } else if (existing.username === username) {
        return res.status(409).json({ error: "Username already exists" });
      } else {
        return res.status(409).json({ error: "Email already exists" });
      }
    }

    // Insert new user
    db.query(
      'INSERT INTO auth (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, password, role],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to register user" });
        res.status(201).json({ id: result.insertId, username, email, role });
      }
    );
  });
});

app.put('/register/:id', (req, res) => {
  const { username,password,role} = req.body;
  db.query('UPDATE auth SET username = ?, password = ? , role = ?  WHERE id = ?', [username,password,role, req.params.id], err => {
      if (err) return res.send(err);
      res.sendStatus(200);
    }
  );
});
app.delete('/register/:id', (req, res) => {
  db.query('DELETE FROM auth WHERE id = ?', [req.params.id], err => {
    if (err) return res.send(err);
    res.sendStatus(200);
  });
});

//Login page
app.post('/login', (req, res) => {
  const { email, password ,role} = req.body;
  db.query(
    'SELECT * FROM auth WHERE email = ? AND password = ? AND role = ?',
    [email, password,role],
    (err, results) => {
      if (err) return res.status(500).send({ message: 'Server error' });
 
      if (results.length > 0) {
        res.status(200).send({ message: 'Login successful', user: results[0] });
      } else {
        res.status(401).send({ message: 'Wrong credentials' });
      }
    }
  );
});

app.get('/skill/:id', (req, res) => {
  db.query('SELECT * FROM skill where skill_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});
app.post('/skill', (req, res) => {
  const { skill_id, skill_name } = req.body;
  db.query('INSERT INTO skill (skill_id, skill_name) VALUES (?, ?)', [skill_id, skill_name], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, skill_id, skill_name });
  });
});
app.delete('/skill/:name', (req, res) => {
  db.query('DELETE FROM skill WHERE skill_name = ?', [req.params.name], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Skill not found');
    res.sendStatus(200);
  });
});
//Service Center Page of Admin dashboard

app.get('/serviceCenters', (req, res) => {
  db.query('SELECT * FROM serviceCenter', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post('/serviceCenters', (req, res) => {
  const { name, location, contact, rating, feedback } = req.body;
  db.query(
    'INSERT INTO serviceCenter (name, location, contact, rating, feedback) VALUES (?, ?, ?, ?, ?)',
    [name, location, contact, rating, feedback],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, name, location, contact, rating, feedback });
    }
  );
});

app.get('/serviceCenters/:id', (req, res) => {
  db.query(
    'Select * from serviceCenter where serviceCenterId = ?',
    [req.params.id],
    (err,result) => {
      if (err) return res.status(500).send(err);
      res.json(result[0])
    }
  );
});
app.put('/serviceCenters/:id', (req, res) => {
  const { name, location, contact, rating, feedback } = req.body;
  db.query(
    'UPDATE serviceCenter SET name = ?, location = ?, contact = ?, rating = ?, feedback = ? WHERE serviceCenterId = ?',
    [name, location, contact, rating, feedback, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

app.delete('/serviceCenters/:id', (req, res) => {
  db.query('DELETE FROM serviceCenter WHERE serviceCenterId = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

//serviceTypes

app.get('/serviceTypes', (req, res) => {
  db.query('SELECT * FROM serviceType', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.get('/serviceTypes/serviceCenter/:id', (req, res) => {
  db.query('SELECT * FROM serviceType where serviceCenterId=?',[req.params.id]
    ,(err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post('/serviceTypes', (req, res) => {
  const { name,description, price, status, serviceCenterId } = req.body;
  db.query(
    'INSERT INTO serviceType (name,description, price, status, serviceCenterId) VALUES (?, ?, ?, ?, ?)',
    [name,description, price, status, serviceCenterId],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, description, price, status, serviceCenterId });
    }
  );
});

app.put('/serviceTypes/:id', (req, res) => {
  const { description, price, status, serviceCenterId } = req.body;
  db.query(
    'UPDATE serviceType SET description = ?, price = ?, status = ?, serviceCenterId = ? WHERE serviceTypeId = ?',
    [description, price, status, serviceCenterId, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({"message":"Updated successfully"});
    }
  );
});

app.delete('/serviceTypes/:id', (req, res) => {
  db.query('DELETE FROM serviceType WHERE serviceTypeId = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

//Users end points 

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});


app.get('/users/:userId', (req, res) => {
  db.query('SELECT * FROM users WHERE userId = ?', [req.params.userId], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('User not found');
    res.json(result);
  });
});



app.post('/users', (req, res) => {
  const { userId, first_name, last_name, email, address, phone} = req.body;
  db.query('SELECT * FROM auth WHERE id = ? AND email = ?', [userId, email], (err, result) => {
    if (err) return res.status(500).send({ message: 'Server error during validation' });

    if (result.length === 0) {
      return res.status(400).send({ message: 'Invalid userId or email. Please register first.' });
    }
    db.query(
      'INSERT INTO users (userId, first_name, last_name, email, address, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, first_name, last_name, email, address, phone],
      (err, insertResult) => {
        if (err) return res.status(500).send({ message: 'Error inserting user details' });
        res.status(201).json({ id: insertResult.insertId, ...req.body });
      }
    );
  });
});


app.put('/users/:userId', (req, res) => {
  const { first_name, last_name, email, address, phone } = req.body;
  db.query(
    'UPDATE users SET first_name = ?, last_name = ?, email = ?, address = ?, phone = ? WHERE userId = ?',
    [first_name, last_name, email , address, phone, req.params.userId],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});


app.patch('/users/:userId/status', (req, res) => {
  const { status } = req.body;
  db.query(
    'UPDATE users SET status = ? WHERE userId = ?',
    [status, req.params.userId],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});


app.delete('/users/:userId', (req, res) => {
  db.query('DELETE FROM users WHERE userId = ?', [req.params.userId], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

//vehicles 

app.post('/vehicles', (req, res) => {
  const {
    userId,
    registration_number,
    engine,
    abs,
    doors,
    ac,
    transmission,
    fuel,
    make,
    model,
    year,
    vehicle_type
  } = req.body;

  db.query('SELECT * FROM users WHERE userId = ?', [userId], (err, userResult) => {
    if (err) return res.status(500).send({ message: 'Error checking userId' });

    if (userResult.length === 0) {
      return res.status(400).send({ message: 'Invalid userId. Please register the user first.' });
    }

    db.query(
      'INSERT INTO vehicles (userId, registration_number, make, model, year, engine, abs, doors, ac, transmission, fuel, vehicle_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [userId, registration_number, make, model, year, engine, abs, doors, ac, transmission, fuel, vehicle_type],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).send({ message: 'Registration number already exists' });
          }
          return res.status(500).send(err);
        }

        res.status(201).json({
          vehicleId: result.insertId,
          userId,
          registration_number,
          make,
          model,
          year,
          vehicle_type
        });
      }
    );
  });
});

app.get('/vehicles/:userId', (req, res) => {
  db.query('SELECT * FROM vehicles WHERE userId = ?', [req.params.userId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.get('/vehicles', (req, res) => {
  db.query('SELECT * FROM vehicles',  (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});
app.get('/vehicles/:registration_number', (req, res) => {
  db.query('SELECT * FROM vehicles WHERE registration_number = ?', [req.params.registration_number], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Vehicle not found');
    res.json(result[0]);
  });
});

app.patch('/vehicles/:registration_number', (req, res) => {
  const { make, model, year, color } = req.body;
  db.query(
    'UPDATE vehicles SET make = ?, model = ?, year = ? WHERE registration_number = ?',
    [make, model, year, req.params.registration_number],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send('Vehicle not found');
      res.sendStatus(200);
    }
  );
});

app.put('/vehicles/:vehicleId', (req, res) => {
  const { registration_number, make, model, year} = req.body;

  db.query(
    'UPDATE vehicles SET registration_number = ?, make = ?, model = ?, year = ?WHERE vehicleId = ?',
    [registration_number, make, model, year, req.params.vehicleId],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).send({ message: 'Registration number already exists' });
        }
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) return res.status(404).send('Vehicle not found');
      res.sendStatus(200);
    }
  );
});

app.delete('/vehicles/:vehicleId', (req, res) => {
  db.query('DELETE FROM vehicles WHERE vehicleId = ?', [req.params.vehicleId], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Vehicle not found');
    res.sendStatus(200);
  });
});

//mechanic end points 


app.post('/mechanics', (req, res) => {
  const { mechanicId, serviceCenterId, name, expertise , availability , rating , phone , address } = req.body;
  db.query(
    'INSERT INTO mechanic (mechanicId, serviceCenterId, name, expertise , availability , rating , phone , address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [mechanicId, serviceCenterId, name, expertise, availability, rating, phone, address],
    (err, result) => {
      if (err) return res.status(500).send({ message: 'Error inserting mechanic' ,"err" : err });
      res.status(201).json({ id: result.insertId, ...req.body });
    }
  );
});

app.get('/mechanics', (req, res) => {
  db.query(
  `SELECT m.*,
          sc.name AS serviceCenterName,
          sc.location,
          sc.contact
   FROM mechanic m
   LEFT JOIN servicecenter sc
     ON m.servicecenterId = sc.servicecenterId`,
  (err, result) => {
    if (err) {
      console.error("Error fetching mechanics with service centers:", err);
      return;
    }
    res.json(result);
  }
);

});


app.get('/mechanics/:id', (req, res) => {
  db.query('SELECT * FROM mechanic WHERE mechanicId = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Mechanic not found');
    res.json(result[0]);
  });
});

app.delete('/mechanics/:id', (req, res) => {
  db.query('DELETE FROM mechanic WHERE mechanicId = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Mechanic not found');
    res.sendStatus(200);
  });
});


app.delete('/mechanics', (req, res) => {
  db.query('DELETE FROM mechanic', (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'All mechanics deleted' });
  });
});

app.put('/mechanics/:id', (req, res) => {
  const { name, expertise, availability, rating,status,address } = req.body;
  const servicecenterId = req.body.servicecenterId === 'none' ? null : req.body.servicecenterId;

  db.query(
    'UPDATE mechanic SET servicecenterId = ?, name = ?, expertise = ?, availability = ?, rating = ?,status=?,address=? WHERE mechanicId = ?',
    [servicecenterId, name, expertise, availability, rating,status,address, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send('Mechanic not found');
      res.sendStatus(200);
    }
  );
});

app.patch('/mechanics/:id', (req, res) => {
  const { availability } = req.body;
  db.query(
    'UPDATE mechanic SET availability = ? WHERE mechanicId = ?',
    [availability, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send('Mechanic not found');
      res.sendStatus(200);
    }
  );
});
app.patch('/mechanics/verify/:id', (req, res) => {
  const { verify } = req.body;
  db.query(
    'UPDATE mechanic SET isVerified = ? WHERE mechanicId = ?',
    [verify, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send('Mechanic not found');
      res.sendStatus(200);
    }
  );
});
app.patch('/mechanics/status/:id', (req, res) => {
  const { status } = req.body;
  db.query(
    'UPDATE mechanic SET status = ? WHERE mechanicId = ?',
    [status, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send('Mechanic not found');
      res.sendStatus(200);
    }
  );
});

app.patch('/mechanics/:id', (req, res) => {
  const { rating } = req.body;
  db.query(
    'UPDATE mechanic SET rating = ? WHERE mechanicId = ?',
    [rating, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send('Mechanic not found');
      res.sendStatus(200);
    }
  );
});



//bookings

app.get('/booking', (req, res) => {
  db.query('SELECT * FROM booking', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.get('/booking/:id', (req, res) => {
  db.query('SELECT * FROM booking WHERE bookingId = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Booking not found');
    res.json(result[0]);
  });
});

app.get('/booking/user/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT 
      b.*, 
      v.*, 
      s.*
    FROM booking b
    INNER JOIN vehicles v ON b.vehicleId = v.vehicleId
    INNER JOIN servicecenter s ON b.serviceCenterId = s.servicecenterId
    WHERE b.userId = ?
  `;

  db.query(query, [userId], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Booking not found');
    res.json(result);
  });
});
app.get('/booking/vehicle/:vehicleId', (req, res) => {
  db.query('SELECT * FROM booking WHERE vehicleId = ?', [req.params.vehicleId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.get('/booking/service/:serviceCenterId', (req, res) => {
  db.query('SELECT * FROM booking WHERE serviceCenterId = ?', [req.params.serviceCenterId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post('/booking', (req, res) => {
  const { userId, vehicleId, serviceCenterId, date, timeslot, status } = req.body;
  db.query(
    'INSERT INTO booking (userId, vehicleId, serviceCenterId, date, timeslot, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, NOW())',
    [userId, vehicleId, serviceCenterId, date, timeslot, status],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ bookingId: result.insertId, userId, vehicleId, serviceCenterId, date, timeslot, status });
    }
  );
});

app.put('/booking/:id', (req, res) => {
  const { userId, vehicleId, serviceCenterId, date, timeslot, status } = req.body;
  db.query(
    'UPDATE booking SET userId = ?, vehicleId = ?, serviceCenterId = ?, date = ?, timeslot = ?, status = ? WHERE bookingId = ?',
    [userId, vehicleId, serviceCenterId, date, timeslot, status, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send('Booking not found');
      res.sendStatus(200);
    }
  );
});

app.patch('/booking/:id/status', (req, res) => {
  const { status } = req.body;
  db.query(
    'UPDATE booking SET status = ? WHERE bookingId = ?',
    [status, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send('Booking not found');
      res.sendStatus(200);
    }
  );
});
app.patch('/booking/verify/:id', (req, res) => {
  const { verify } = req.body;
  db.query(
    'UPDATE booking SET isVerified = ? WHERE bookingId = ?',
    [verify, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send('Booking not found');
      res.sendStatus(200);
    }
  );
});

app.delete('/booking/:id', (req, res) => {
  db.query('DELETE FROM booking WHERE bookingId = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Booking not found');
    res.sendStatus(200);
  });
});

app.delete('/booking', (req, res) => {
  db.query('DELETE FROM booking', (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'All bookings deleted' });
  });
});

app.listen(PORT, () => { 
  console.log('Server running on http://localhost:3001'); 
});
