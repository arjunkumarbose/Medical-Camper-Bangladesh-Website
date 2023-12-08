const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const port = process.env.PORT || 5001;

// middleware
app.use(cors());
app.use(express.json())


// jwt middleware
const verifyJWT = (req, res, next) => {

  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'unauthorized access' });
  }
  // bearer token
  const token = authorization.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {

    if (err) {
      return res.status(401).send({ error: true, message: 'unauthorized access' })
    }
    req.decoded = decoded;
    next();
  })
}


// MongoDb Config
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.merbl3v.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});




async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //await client.connect();

    const eventCollection = client.db('medical-camper').collection('events')
    const userCollection = client.db('medical-camper').collection('users')
    const paymentCollection = client.db('medical-camper').collection('payment')
    const selectEventCollection = client.db('medical-camper').collection('selectedEvents')
    const feedBackCollection = client.db('medical-camper').collection('feedback')
    const participantInfoCollection = client.db('medical-camper').collection('participantInfo')
    const healthprofessionalCollection = client.db('medical-camper').collection('healthprofessionalInfo')
    const interestCollection = client.db('medical-camper').collection('interestCollection')

    // jwt
    app.post('/jwt', (req, res) => {
      const email = req.body;
      const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '7d'
      })
      res.send({ token })
    })

    // Verify admin
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);

      if (user?.role !== 'admin') {
        return res.status(200).send({ error: 'Forbidden Access' })
      }
      next()
    }

    // Verify organizer
    const verifyOrganizer = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);

      if (user?.role !== 'organizer') {
        return res.status(200).send({ error: 'Forbidden Access' })
      }
      next()
    }

    // Verify health_professional
    const verifyHealthProfessional = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);

      if (user?.role !== 'healthprofessional') {
        return res.status(200).send({ error: 'Forbidden Access' })
      }
      next()
    }

    // get all users
    app.get('/allusers', async (req, res) => {
      const result = await userCollection.find().toArray()
      res.send(result)
    })

    // get all organizer
    app.get('/organizers', async (req, res) => {
      const query = { role: 'organizer' }
      const result = await userCollection.find(query).toArray()
      res.send(result)
    })

    // get all health_professional
    app.get('/healthprofessionals', async (req, res) => {
      const query = { role: 'healthprofessional', status: 'approved' }
      const result = await userCollection.find(query).toArray()
      res.send(result)
    })

    // post user to db
    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = { email: user.email }
      const existingUser = await userCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: 'User Already Exist' })
      }
      const result = await userCollection.insertOne(user)
      res.send(result)
    })

    // make user admin api
    app.patch('/user/admin/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: 'admin'
        },
      };
      const result = await userCollection.updateOne(query, updateDoc)
      res.send(result)
    })

    // make user organizer api
    app.patch('/user/organizer/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: 'organizer'
        },
      };
      const result = await userCollection.updateOne(query, updateDoc)
      res.send(result)
    })

    // make user participant api
    app.patch('/user/participant/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: 'participant'
        },
      };
      const result = await userCollection.updateOne(query, updateDoc)
      res.send(result)
    })

    // make user health_professional api
    app.patch('/user/healthprofessional/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: 'healthprofessional'
        },
      };
      const result = await userCollection.updateOne(query, updateDoc)
      res.send(result)
    })

    // delete user
    app.delete('/removeuser/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await userCollection.deleteOne(query)
      res.send(result)
    })

    // Check Admin
    app.get('/users/admin/:email', verifyJWT, verifyAdmin, async (req, res) => {
      const email = req.params.email;
      if (req.decoded.email !== email) {
        return res.send({ message: 'Forbidden Access' })
      }
      const query = { email: email }
      const user = await userCollection.findOne(query);
      const result = { admin: user?.role === 'admin' };
      res.send(result)
    })

    // Check organizer
    app.get('/users/organizer/:email', verifyJWT, verifyOrganizer, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        return res.send({ message: 'Forbidden Access' })
      }
      const query = { email: email }
      const user = await userCollection.findOne(query);
      const result = { organizer: user?.role === 'organizer' };
      res.send(result)
    })

    // Check health_professional
    app.get('/users/healthprofessional/:email', async (req, res) => {
      const email = req.params.email;
      // if(req.decoded.email !== email) {
      //   return res.send({message: 'Forbidden Access'})
      // }
      const query = { email: email }
      const user = await userCollection.findOne(query);
      const result = { health_professional: user?.role === 'healthprofessional' };
      res.send(result)
    })

    // Check participant
    app.get('/get-participant/:email', async (req, res) => {
      const email = req.params.email;
      // if(req.decoded.email !== email) {
      //   return res.send({message: 'Forbidden Access'})
      // }
      console.log(email, "participant");
      const query = { email: email }
      const user = await participantInfoCollection.findOne(query);
      // const result = { participant: user?.role === 'participant' };
      console.log(user, "participant");
      res.send(user)
    })


    // delete selected events
    app.delete('/user/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await selectEventCollection.deleteOne(query)
      res.send(result)
    })

    // get specific organizer events
    app.get('/events/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const result = await eventCollection.find(query).toArray()
      res.send(result)
    })

    // Delete event by ID
    app.delete('/events/:id', async (req, res) => {
      const eventId = req.params.id;
      try {
        const query = { _id: new ObjectId(eventId) };
        const result = await eventCollection.deleteOne(query);
        if (result.deletedCount === 1) {
          res.status(200).json({ message: 'Event deleted successfully' });
        } else {
          res.status(404).json({ error: 'Event not found' });
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ error: 'Failed to delete event' });
      }
    });

    // participant information for a specific event
    app.put('/storeParticipantInfo/:email', async (req, res) => {
      try {
        const userEmail = req.params.email;
        const participantInfo = req.body;

        // Assuming your participantInfoCollection has a unique constraint on the email field
        const existingParticipant = await participantInfoCollection.findOne({ email: userEmail });

        if (!existingParticipant) {
          const findUser = await userCollection.findOne({ email: userEmail });
          // If the participant doesn't exist, you might want to handle this case (e.g., return an error).
          if(!findUser)
          return res.status(404).json({ error: 'Participant not found' });

          const result = await participantInfoCollection.insertOne(
            { email: userEmail },
            { participantInfo }
          );
          res.status(200).json({ message: 'Participant information added successfully', result });
        }

        // Update the existing participant information
        const result = await participantInfoCollection.updateOne(
          { email: userEmail },
          { $set: participantInfo }
        );

        res.status(200).json({ message: 'Participant information updated successfully', result });
      } catch (error) {
        console.error('Error updating participant information:', error);
        res.status(500).json({ error: 'Failed to update participant information' });
      }
    });


    // Store/update participant information
    app.post('/storeParticipantInfo', async (req, res) => {
      try {
        const { name, email /* Add other fields */ } = req.body;
        // Check if participant already exists
        const existingParticipant = await participantInfoCollection.findOne({ email });
        if (existingParticipant) {
          // Participant exists, update their information
          const updatedParticipant = await participantInfoCollection.updateOne(
            { email },
            { $set: { name /* Add other fields */ } }
          );
          res.status(200).json({ message: 'Participant information updated successfully', updatedParticipant });
        } else {
          // Participant doesn't exist, create a new entry
          const newParticipant = await participantInfoCollection.insertOne({
            name,
            email,
            // Add other fields
          });
          res.status(201).json({ message: 'New participant information created', newParticipant });
        }
      } catch (error) {
        console.error('Error storing participant information:', error);
        res.status(500).json({ error: 'Failed to store participant information' });
      }
    });

    // Store/update healthcare professional profile information
    app.post('/healthprofessionalInfo/:email', async (req, res) => {
      try {
        const { email, name } = req.params;
        const profileInfo = req.body;
        const existingProfile = await healthprofessionalCollection.findOne({ email });

        if (existingProfile) {
          const updatedProfile = await healthprofessionalCollection.updateOne(
            { email },
            { name },
            { $set: profileInfo }
          );

          res.status(200).json({ message: 'Healthcare professional profile updated successfully', updatedProfile });
        } else {
          const newProfile = await healthprofessionalCollection.insertOne({
            email,
            ...profileInfo
          });

          res.status(201).json({ message: 'Healthcare professional profile created successfully', newProfile });
        }
      } catch (error) {
        console.error('Error storing/updating healthcare professional profile:', error);
        res.status(500).json({ error: 'Failed to store/update healthcare professional profile' });
      }
    });
 
    // Retrieve healthcare professional profile by email
    app.get('/healthprofessionalInfo/:email', async (req, res) => {
      try {
        const { email } = req.params;
        const profile = await healthprofessionalCollection.findOne({ email });

        if (profile) {
          res.status(200).json(profile);
        } else {
          res.status(404).json({ message: 'Healthcare professional profile not found' });
        }
      } catch (error) {
        console.error('Error fetching healthcare professional profile:', error);
        res.status(500).json({ error: 'Failed to fetch healthcare professional profile' });
      }
    });


    // Add interest for a specific organizer
    app.post('/add-interest/:email', async (req, res) => {
      try {
        const organizerEmail = req.params.email;
        console.log(organizerEmail, "366");
        const body = req.body;  // Assuming you're sending event data in the request body
        console.log(req.body, "368");
        // Add the organizer's email to the event data
        const eventData = {}
        eventData.userEmail = organizerEmail;
        eventData.event = body

        const result = await interestCollection.insertOne(eventData);

        res.status(201).json({ message: 'Interest added successfully', result });
      } catch (error) {
        console.error('Error adding interest:', error);
        res.status(500).json({ error: 'Failed to add interest' });
      }
    });

    // Get interest list for a specific user
    app.get('/get-interest-list/:email', async (req, res) => {
      try {
        const userEmail = req.params.email;

        // Verify that the logged-in user matches the requested user
        // if (req.decoded.email !== userEmail) {
        //   return res.status(403).json({ error: 'Forbidden Access' });
        // }

        const query = { userEmail: userEmail, 'event.isApproved': 'approved' };
        const interests = await interestCollection.find(query).toArray();

        res.status(200).json({ interests });
      } catch (error) {
        console.error('Error retrieving interest list:', error);
        res.status(500).json({ error: 'Failed to retrieve interest list' });
      }
    });

    // Get interest list for a specific user
    app.get('/get-interest-lists', async (req, res) => {
      try {
        const query = { 'event.isApproved': 'pending' }
        const interests = await interestCollection.find(query).toArray();

        res.status(200).json({ interests });
      } catch (error) {
        console.error('Error retrieving interest list:', error);
        res.status(500).json({ error: 'Failed to retrieve interest list' });
      }
    });

    app.patch('/update-interest-list/:id', async (req, res) => {
      try {
        const userId = req.params.id;

        // Assuming you have a field in your collection to identify the user (e.g., 'userId')
        const query = { _id: new ObjectId(userId) };

        // Update the approval status to 'approved'
        const updateResult = await interestCollection.updateMany(query, { $set: { 'event.isApproved': 'approved' } });

        res.status(200).json({ message: 'Interest list updated successfully', updateResult });
      } catch (error) {
        console.error('Error updating interest list:', error);
        res.status(500).json({ error: 'Failed to update interest list' });
      }
    });

    // Get interest list for a specific event
    app.get('/get-interest-event-list/:id', async (req, res) => {
      try {
        const id = req.params.id;

        const query = { 'event._id': id };
        const interests = await interestCollection.find(query).toArray();

        console.log(interests, id, "410");
        res.status(200).json({ interests });
      } catch (error) {
        console.error('Error retrieving interest list:', error);
        res.status(500).json({ error: 'Failed to retrieve interest list' });
      }
    });

    // Update events api
    app.patch('/updateevent/:id', async (req, res) => {
      const id = req.params.id;
      const body = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          eventName: body.eventName,
          price: body.price,
          availableSeats: body.availableSeats,
          eventImage: body.eventImage,
          venue: body.venue,
          date: body.date,
          details: body.details,
          services: body.services,
          audience: body.audience,
          professionals: body.professionals,
        },
      };
      const result = eventCollection.updateOne(query, updateDoc);
      res.send(result)
    })

    // insert event data to DB
    app.post('/event', async (req, res) => {
      const data = req.body;
      const result = await eventCollection.insertOne(data);
      res.send(result)
    });

    // get all approved events api
    app.get('/events', async (req, res) => {
      const query = { status: 'approved' }
      const result = await eventCollection.find(query).sort({ members: -1 }).toArray()
      res.send(result)
    })

    // get all events
    app.get('/allevents', async (req, res) => {
      const result = await eventCollection.find().toArray()
      res.send(result)
    })

    // get single events
    app.get('/singleevents/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await eventCollection.findOne(query)
      res.send(result)
    })

    // get single event details
    app.get('/event/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await eventCollection.findOne(query);
      res.send(result);
    });

    // approve events api
    app.patch('/approveevent/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: 'approved'
        },
      };
      const result = eventCollection.updateOne(query, updateDoc);
      res.send(result)
    })

    // deniedevent events api
    app.patch('/deniedevent/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: 'denied'
        },
      };
      const result = eventCollection.updateOne(query, updateDoc);
      res.send(result)
    })

    // approve healthprofessional api
    app.patch('/approve-healthprofessional/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: 'approved'
        },
      };
      const result = userCollection.updateOne(query, updateDoc);
      res.send(result)
    })

    // deniede healthprofessional api
    app.patch('/denied-healthprofessional/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: 'denied'
        },
      };
      const result = userCollection.updateOne(query, updateDoc);
      res.send(result)
    })

        // approve participant api
    app.patch('/approve-participant/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: 'approved'
        },
      };
      const result = userCollection.updateOne(query, updateDoc);
      res.send(result)
    })

    // denied participant api
    app.patch('/denied-participant/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: 'denied'
        },
      };
      const result = userCollection.updateOne(query, updateDoc);
      res.send(result)
    })

    //Store feedback
    app.post('/storefeedback', async (req, res) => {
      try {
        const { eventId, eventName, rating, feedbackText, username, picture } = req.body;

        const feedback = {
          eventId,
          eventName,
          rating,
          feedbackText,
          username,
          picture,
        };
        const result = await feedBackCollection.insertOne(feedback);

        res.status(200).json({ message: 'Feedback stored successfully', result });
      } catch (error) {
        console.error('Error storing feedback:', error);
        res.status(500).json({ error: 'Failed to store feedback' });
      }
    });

    // Get feedback
    app.get('/storefeedback', async (req, res) => {
      try {
        const feedbackData = await feedBackCollection.find().toArray();
        res.status(200).json(feedbackData);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ error: 'Failed to fetch feedback' });
      }
    });

    // Participant single event selection (if already selected then return error)
    app.post('/selectevents', async (req, res) => {
      const data = req.body;

      const query = { eventId: data.eventId, memberEmail: data.memberEmail };
      const existEvent = await selectEventCollection.findOne(query);
      if (existEvent) {
        return res.send({ error: 'Already selected' })
      }
      const result = await selectEventCollection.insertOne(data)
      res.send(result)
    });

    // get participants selected events
    app.get('/selectevent/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { memberEmail: email }
      const result = await selectEventCollection.find(query).toArray()
      res.send(result)
    })

    // payment for single event
    app.get('/payforevent/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await selectEventCollection.find(query).toArray()
      res.send(result)
    })

    // get participants paid events and history
    app.get('/paidevents/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { email: email, status: 'paid' }
      const date = { date: -1 }
      const result = await paymentCollection.find(query).sort(date).toArray()
      res.send(result)
    })

    // stripe payment api
    app.post('/create-payment-intent', verifyJWT, async (req, res) => {
      const { eventPrice } = req.body;

      const amount = parseInt(eventPrice * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
      });

      res.send({
        clientSecret: paymentIntent.client_secret
      })
    })

    // set payment api
    app.post('/setpayments/:id', async (req, res) => {
      const body = req.body;
      const id = req.params.id;
      const idQuery = { _id: new ObjectId(id) }
      const removeEvent = await selectEventCollection.deleteOne(idQuery)
      const result = await paymentCollection.insertOne(body)
      res.send({ result, removeEvent })
    })

    // delete selected events
    app.delete('/deleteselectevent/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await selectEventCollection.deleteOne(query)
      res.send(result)
    })

    // delete enrolled events
    app.delete('/deleteenrolledevent/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await paymentCollection.deleteOne(query)
      res.send(result)
    })

    //update events after Payments
    app.patch('/eventupdate/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const event = await eventCollection.findOne(query);

      if (event) {
        const updatedAvailableSeats = event.availableSeats - 1;
        const updatedMembers = event.members + 1;
        const updateDoc = {
          $set: {
            availableSeats: updatedAvailableSeats,
            members: updatedMembers
          },
        };
        const result = await eventCollection.updateOne(query, updateDoc);
        res.send(result);
      } else {
        res.status(404).send({ error: 'Event not found' });
      }
    });


    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    //console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Server is runnig')
});


app.listen(port, () => {
  console.log("server is running");
})