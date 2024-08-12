const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const nodemailer = require('nodemailer');



const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Bhoomika@06",
  database: "project"
});

db.connect((err,res)=>{
  if(!err) {
      console.log('Database connected');
  }
  else{
  console.log(err);
  }
})

// Serve the navigation page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Victim Login
app.post('/victimlogin', (req, res) => {
  const sql = "SELECT * FROM victim WHERE email=? AND password=?";
  

  db.query(sql,[req.body.email, req.body.password] , (err, data) => {
    if (err) return res.status(500).json({ message: "Error" });
    if (data.length > 0) {
      victim_id=data[0].victim_id ;
     console.log(victim_id);
      return res.json({ message: "Login Successful",victim_id });
    } else {
      return res.json({ message: "No Record" });
    }
  });
});


// Victim Registration
app.post('/register', (req, res) => {

  const sql = "INSERT INTO victim (email, password, name, phone_number) VALUES (?)";
  const values = [
    req.body.email, 
    req.body.password, 
    req.body.fullname, 
    req.body.phonenumber,
  ];

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.log(err);
      return res.json(err);
  } else {
      console.log('Victim inserted successfully !');
      return res.json(result);
  }
  });
});
// app.post('/victimlogin', (req, res) => {
//   const sql = "SELECT * FROM victim WHERE email=? AND password=?";
  

//   db.query(sql,[req.body.email, req.body.password] , (err, data) => {
//     if (err) return res.status(500).json({ message: "Error" });
//     if (data.length > 0) {
//       return res.json({ message: "Login Successful" });
//     } else {
//       return res.json({ message: "No Record" });
//     }
//   });
// });


// Police Login
app.post('/policelogin', (req, res) => {

  const sql = "SELECT * FROM police WHERE email=? AND password=?";
  ;

  db.query(sql, [req.body.email,req.body.password], (err, data) => {
    if (err) return res.status(500).json({ message: "Error" });
    if (data.length > 0){
    police_id=data[0].police_id ;
     console.log(police_id);
      return res.json({ message: "Police Login Successful" , police_id});
    } else {
      return res.json({ message: "No Record" });
    }
  });
});

// Police Station Login
app.post('/pslogin', (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM police_station WHERE email=? AND password=?";
  const values = [email, password];

  db.query(sql, values, (err, data) => {
    if (err) return res.status(500).json({ message: "Error" });
    if (data.length > 0) {
      station_id=data[0].station_id;
      console.log(station_id);
      return res.json({ message: "Police Station Login Successful",station_id });
    } else {
      return res.json({ message: "No Record" });
    }
  });
});
// ... (previous code)



// Handle complaint submissions
app.post('/complaint', (req, res) => {
  // Insert the complaint data into a database table (you need to create the table)
  
  const sql = "INSERT INTO complaint (name, aadhar, phone_number, dob, location, date_of_crime, type_of_crime, description,victim_id, police_id,station_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
  const values = [
    req.body.name,
    req.body.aadhar,
    req.body.phone_number,
    req.body.dob,
    req.body.location,
    req.body.date_of_crime,
    req.body.type_of_crime,
    req.body.description,
    req.body.victim_id,
    null,
    null// Initially, set police_id to null
  ];
  
  // Find a police officer with the right specialization in the given location
  const findPoliceSql = "SELECT * FROM police WHERE specialization = ? AND location = ? LIMIT 1";
  const specialization = req.body.type_of_crime;
  
  db.query(findPoliceSql, [specialization, req.body.location], (err, policeData) => {
    if (err) {
      return res.status(500).json({ message: "Error finding a police officer" });
    }

    if (policeData.length > 0) {
      values[values.length - 2] = policeData[0].police_id;
      values[values.length - 1] = policeData[0].station_id;
    }
     console.log(values)
    db.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error submitting the complaint" });
      } else if (result.affectedRows > 0) {
        // Send email to the victim
        sendEmailToVictim(req.body.victim_id);
        return res.json({ message: "Complaint submitted successfully" });
      } else {
        
        return res.json({ message: "No record inserted" });
      }
    });
  });
});

// Function to send an email to the victim
function sendEmailToVictim(victimId) {
  const getEmailSql = "SELECT GetEmailFromVictim(?) AS email";

  db.query(getEmailSql, [victimId], (err, data) => {
    if (err) {
      console.log("Error retrieving victim email:", err);
      return;
    }

    const victimEmail = data[0].email;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your mail id here',
        pass: 'your email id password here'
      }
    });

    const mailOptions = {
      from: 'your email id here',
      to: victimEmail,
      subject: 'Complaint Filed Successfully',
      text: 'Thank you for filing a complaint. Your complaint has been submitted successfully.Visit the website for more updates.'
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  });
}


app.get('/getPoliceByStation/:station_id/:specialization', (req, res) => {
  const { station_id, specialization } = req.params;

  const sql = "SELECT * FROM police WHERE station_id = ? AND specialization = ?";

  db.query(sql, [station_id, specialization], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching police officers" });
    }
    return res.json(data);
  });
});





// Add a route to insert police records
app.post('/police', (req, res) => {
  const { name, badge_number, position, email, password, specialization, location, phone_number } = req.body;

  // Insert the police data into the 'police' table
  const sql = "INSERT INTO police (name, badge_number, position, email, password, specialization, location, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [name, badge_number, position, email, password, specialization, location, phone_number];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error adding police record" });
    } else if (data.affectedRows > 0) {
      return res.json({ message: "Police record added successfully" });
    } else {
      return res.json({ message: "No record inserted" });
    }
  });
});

app.get('/getPoliceInfo/:policeId', (req, res) => {
  const { policeId } = req.params;
  const sql = "SELECT * FROM police WHERE police_id = ?";
  
  db.query(sql, [policeId], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching police information" });
    }
    
    if (data.length === 1) {
      const policeInfo = data[0];
      return res.json(policeInfo);
    } else {
      return res.status(404).json({ message: "Police officer not found" });
    }
  });
});

// Fetch police officers by station
app.get('/getPoliceByStation/:station_id', (req, res) => {
  const { station_id } = req.params;

  const sql = "SELECT * FROM police WHERE station_id = ?";

  db.query(sql, [station_id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching police officers" });
    }
    return res.json(data);
  });
});

// Add a route to get cases registered in a specific police station
app.get('/getCasesByStation/:station_id', (req, res) => {
  const { station_id } = req.params;

  const sql = "SELECT * FROM cases WHERE station_id = ?";
  
  db.query(sql, [station_id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching cases" });
    }
    
    return res.json(data);
  });
});




// ...

// Fetch complaints for a specific police officer based on police_id
app.get('/complaints/:policeId', (req, res) => {
  const { policeId } = req.params;
  const sql = "SELECT * FROM complaint WHERE police_id = ?";
  db.query(sql, [policeId], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching complaints" });
    }
    return res.json(data);
  });
});

// ...


app.get('/stationcomplaints/:stationId', (req, res) => {
  const { stationId } = req.params;
  const sql = "SELECT * FROM complaint WHERE station_id = ?";
  db.query(sql, [stationId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching complaints" });
    }
    return res.json(data);
  });
});

app.delete('/complaintdelete/:complaintId',(req, res) => {
  const sql = "DELETE FROM complaint where complaint_id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, results) => {
      if (err) {
          return res.json("Error Deleting");
      }
      return res.json(results);
  });
});


app.put('/complaintupdate/:id',(req,res) =>{

  const sql = "UPDATE complaint set `name` = ? , `location` = ? ,  `type_of_crime` = ? ,  `culprit` = ?,`case_status` = ? WHERE `complaint_id` = ?";
  const values = [
    req.body.name,
    req.body.location,
    req.body.type_of_crime,
    req.body.culprit,
    req.body.case_status,

  ];

  const id = parseInt(req.params.id); 

  db.query(sql, [...values,id], (err, result) => {
      if (err) {
          console.log(err);
          return res.json(err);
      } else {
          console.log('Complaint Updated successfully !');
          res.json({ message: 'Complaint Updated !', result });
      }
  });
})


app.get('/victimcomplaints/:victimId', (req, res) => {
  const { victimId } = req.params;
  const sql = "SELECT * FROM complaint WHERE victim_id = ?";
  db.query(sql, [victimId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching complaints" });
    }
    return res.json(data);
  });
});

app.get('/calculateAndShowLeaderboard', (req, res) => {
  const calculateProcedure = "CALL CalculateCasesAndLeaderboard()";

  db.query(calculateProcedure, (err,  leaderboardData) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error executing leaderboard procedure" });
    }
  
    return res.json({ message: "Leaderboard procedure executed successfully", leaderboardData });
  });
});

// Example Express.js route to get updates
app.get('/api/updates/:victimId', (req, res) => {
  const victimId = req.params.victimId;
  // Query your database or logs to get updates for the victim
  const updates = getUpdatesForVictim(victimId);
  res.json({ updates });
});



app.listen(8081, () => {
  console.log("Server is running on port 8081...");
});
