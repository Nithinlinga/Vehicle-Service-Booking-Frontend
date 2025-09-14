const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');


const app = express();


app.use(cors());
app.use(express.json());

 
const db = mysql.createConnection({ 
  host: 'localhost', 
  user: 'root',  
  password: 'root', 
  database: 'sb1'
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
  const { username,email,password,role} = req.body;
  db.query('INSERT INTO auth (username,email,password,role) VALUES (?, ?, ?,?)', [username,email,password,role],(err, result) => {
      if (err) return res.send(err);
      res.json({ id: result.insertId, username,email,password,role });
    }
  );
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
 
 
 
//Service Center Page of Admin dashboard

// Get all service centers
app.get('/serviceCenters', (req, res) => {
  db.query('SELECT * FROM serviceCenter', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Add a new service center
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

// get service center by id
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
// Update a service center
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

// Delete a service center
app.delete('/serviceCenters/:id', (req, res) => {
  db.query('DELETE FROM serviceCenter WHERE serviceCenterId = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

//serviceTypes

// Get all service types
app.get('/serviceTypes', (req, res) => {
  db.query('SELECT * FROM serviceType', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Add a new service type
app.post('/serviceTypes', (req, res) => {
  const { description, price, status, serviceCenterId } = req.body;
  db.query(
    'INSERT INTO serviceType (description, price, status, serviceCenterId) VALUES (?, ?, ?, ?)',
    [description, price, status, serviceCenterId],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, description, price, status, serviceCenterId });
    }
  );
});

// Update a service type
app.put('/serviceTypes/:id', (req, res) => {
  const { description, price, status, serviceCenterId } = req.body;
  db.query(
    'UPDATE serviceType SET description = ?, price = ?, status = ?, serviceCenterId = ? WHERE serviceTypeId = ?',
    [description, price, status, serviceCenterId, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

// Delete a service type
app.delete('/serviceTypes/:id', (req, res) => {
  db.query('DELETE FROM serviceType WHERE serviceTypeId = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

//Users end points 

// Get user by ID

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


// Create a new user

app.post('/users', (req, res) => {
  const { userId, first_name, last_name, email, address, phone, status } = req.body;

  // Step 1: Validate userId and email against auth table
  db.query('SELECT * FROM auth WHERE id = ? AND email = ?', [userId, email], (err, result) => {
    if (err) return res.status(500).send({ message: 'Server error during validation' });

    if (result.length === 0) {
      return res.status(400).send({ message: 'Invalid userId or email. Please register first.' });
    }

    // Step 2: Insert into users table
    db.query(
      'INSERT INTO users (userId, first_name, last_name, email, address, phone, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, first_name, last_name, email, address, phone, status],
      (err, insertResult) => {
        if (err) return res.status(500).send({ message: 'Error inserting user details' });
        res.status(201).json({ id: insertResult.insertId, ...req.body });
      }
    );
  });
});


// Update all user fields by ID
app.put('/users/:userId', (req, res) => {
  const { first_name, last_name, email, address, phone, status } = req.body;
  db.query(
    'UPDATE users SET first_name = ?, last_name = ?, email = ?, address = ?, phone = ?, status = ? WHERE userId = ?',
    [first_name, last_name, email , address, phone, status, req.params.userId],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

// Patch user status by ID

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


// Delete user by ID
app.delete('/users/:userId', (req, res) => {
  db.query('DELETE FROM users WHERE userId = ?', [req.params.userId], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

//vehicles 

app.post('/vehicles', (req, res) => {
  const { userId, registration_number, make, model, year } = req.body;

  // Step 1: Check if userId exists in users table
  db.query('SELECT * FROM users WHERE userId = ?', [userId], (err, userResult) => {
    if (err) return res.status(500).send({ message: 'Error checking userId' });

    if (userResult.length === 0) {
      return res.status(400).send({ message: 'Invalid userId. Please register the user first.' });
    }

    // Step 2: Insert vehicle if user exists
    db.query(
      'INSERT INTO vehicles (userId, registration_number, make, model, year) VALUES ( ?, ?, ?, ?, ?)',
      [userId, registration_number, make, model, year],
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
          year
        });
      }
    );
  });
});

// GET: All vehicles by userId
app.get('/vehicles/:userId', (req, res) => {
  db.query('SELECT * FROM vehicles WHERE userId = ?', [req.params.userId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

//GET
app.get('/vehicles', (req, res) => {
  db.query('SELECT * FROM vehicles',  (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});


// GET: Vehicle details by registration number
app.get('/vehicles/:registration_number', (req, res) => {
  db.query('SELECT * FROM vehicles WHERE registration_number = ?', [req.params.registration_number], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Vehicle not found');
    res.json(result[0]);
  });
});

// PATCH: Update vehicle details by registration number
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

// PUT: Edit vehicle by vehicleId
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

// DELETE: Vehicle by vehicleId
app.delete('/vehicles/:vehicleId', (req, res) => {
  db.query('DELETE FROM vehicles WHERE vehicleId = ?', [req.params.vehicleId], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Vehicle not found');
    res.sendStatus(200);
  });
});

//mechanic end points 

// Create a new mechanic
app.post('/mechanics', (req, res) => {
  const { mechanicId, servicecenterId, name, expertise, availability, rating } = req.body;

  db.query(
    'INSERT INTO mechanic (mechanicId, servicecenterId, name, expertise, availability, rating) VALUES (?, ?, ?, ?, ?, ?)',
    [mechanicId, servicecenterId, name, expertise, availability, rating],
    (err, result) => {
      if (err) return res.status(500).send({ message: 'Error inserting mechanic' });
      res.status(201).json({ id: result.insertId, ...req.body });
    }
  );
});

// GET: All mechanics
app.get('/mechanics', (req, res) => {
  db.query('SELECT * FROM mechanic', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// GET: Mechanic by ID
app.get('/mechanics/:id', (req, res) => {
  db.query('SELECT * FROM mechanic WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Mechanic not found');
    res.json(result[0]);
  });
});

// DELETE: Mechanic by ID
app.delete('/mechanics/:id', (req, res) => {
  db.query('DELETE FROM mechanic WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Mechanic not found');
    res.sendStatus(200);
  });
});

// DELETE: All mechanics
app.delete('/mechanics', (req, res) => {
  db.query('DELETE FROM mechanic', (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'All mechanics deleted' });
  });
});

// PUT: Update all fields by ID
app.put('/mechanics/:id', (req, res) => {
  const { mechanicId, servicecenterId, name, expertise, availability, rating } = req.body;
  db.query(
    'UPDATE mechanic SET mechanicId = ?, servicecenterId = ?, name = ?, expertise = ?, availability = ?, rating = ? WHERE id = ?',
    [mechanicId, servicecenterId, name, expertise, availability, rating, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send('Mechanic not found');
      res.sendStatus(200);
    }
  );
});

// PATCH: Update availability by ID
app.patch('/mechanics/:id', (req, res) => {
  const { availability } = req.body;
  db.query(
    'UPDATE mechanic SET availability = ? WHERE id = ?',
    [availability, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send('Mechanic not found');
      res.sendStatus(200);
    }
  );
});

// PATCH: Update rating by ID
app.patch('/mechanics/:id', (req, res) => {
  const { rating } = req.body;
  db.query(
    'UPDATE mechanic SET rating = ? WHERE id = ?',
    [rating, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send('Mechanic not found');
      res.sendStatus(200);
    }
  );
});



//bookings

// GET: All bookings
app.get('/booking', (req, res) => {
  db.query('SELECT * FROM booking', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// GET: Booking by ID
app.get('/booking/:id', (req, res) => {
  db.query('SELECT * FROM booking WHERE bookingId = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Booking not found');
    res.json(result[0]);
  });
});

// GET: Bookings by User ID
app.get('/booking/user/:userId', (req, res) => {
  db.query('SELECT * FROM booking WHERE _userId = ?', [req.params.userId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// GET: Bookings by Vehicle ID
app.get('/booking/vehicle/:vehicleId', (req, res) => {
  db.query('SELECT * FROM booking WHERE vehicleId = ?', [req.params.vehicleId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// GET: Bookings by Service Center ID
app.get('/booking/service/:serviceCenterId', (req, res) => {
  db.query('SELECT * FROM booking WHERE serviceCenterId = ?', [req.params.serviceCenterId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// POST: Create new booking
app.post('/booking', (req, res) => {
  const { _userId, vehicleId, serviceCenterId, date, timeslot, status } = req.body;
  db.query(
    'INSERT INTO booking (_userId, vehicleId, serviceCenterId, date, timeslot, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, NOW())',
    [_userId, vehicleId, serviceCenterId, date, timeslot, status],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ bookingId: result.insertId });
    }
  );
});

// PUT: Update all fields by booking ID
app.put('/booking/:id', (req, res) => {
  const { _userId, vehicleId, serviceCenterId, date, timeslot, status } = req.body;
  db.query(
    'UPDATE booking SET _userId = ?, vehicleId = ?, serviceCenterId = ?, date = ?, timeslot = ?, status = ? WHERE bookingId = ?',
    [_userId, vehicleId, serviceCenterId, date, timeslot, status, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(404).send('Booking not found');
      res.sendStatus(200);
    }
  );
});

// PATCH: Update status by booking ID
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

// DELETE: Booking by ID
app.delete('/booking/:id', (req, res) => {
  db.query('DELETE FROM booking WHERE bookingId = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Booking not found');
    res.sendStatus(200);
  });
});

// DELETE: All bookings
app.delete('/booking', (req, res) => {
  db.query('DELETE FROM booking', (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'All bookings deleted' });
  });
});

app.listen(3001, () => { 
  console.log('Server running on http://localhost:3001'); 
});
