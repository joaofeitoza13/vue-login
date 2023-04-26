import express from 'express'
import { envs, Client } from 'stytch'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

const port = process.env.PORT || 3333
const username = process.env.GH_USERNAME

const client = new Client({
  project_id: process.env.PROJECT_ID || '',
  secret: process.env.SECRET || '',
  env: envs.test,
})

app.use(cors())
app.use(express.json())

const fetchLanguages = async (user, project) => {
  const languagesJSON = await fetch(`https://api.github.com/repos/${user}/${project}/languages`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.GH_TOKEN}`
    }
  }).then(res => res.json());
  return languagesJSON;
}

app.get('/projects', async (req, res) => {
  try {
    const projectsJSON = await fetch(`https://api.github.com/users/${username}/repos`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.GH_TOKEN}`
      }
    }).then(res => res.json());
    console.log(projectsJSON)
    const projectsList = await Promise.all(projectsJSON.map(async project => {
      return {
        id: project.id,
        name: project.name,
        full_name: project.full_name,
        description: project.description,
        languages: await fetchLanguages(username, project.name),
        private: project.private,
        url: project.html_url
      };
    }));
    res.json({ ...projectsList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.post('/register', async (req, res) => {
  const { email, password } = req.body
  try {
    const resp = await client.passwords.create({
      email,
      password,
      session_duration_minutes: 60,
    })
    res.json({
      success: true,
      message: 'User created successfully',
      token: resp.session_token,
    })
  } catch (err) {
    console.log(err)
    res.json({
      success: false,
      message: err.error_message,
      err,
    })
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const resp = await client.passwords.authenticate({
      email,
      password,
      session_duration_minutes: 60,
    })
    res.json({
      success: true,
      message: 'User logged in successfully',
      token: resp.session_token,
    })
  } catch (err) {
    console.log(err)
    res.json({
      success: false,
      message: err.error_message,
      err,
    })
  }
})

app.post('/authenticate', async (req, res) => {
  const { session_token } = req.body
  try {
    await client.sessions.authenticate({ session_token })
    res.json({
      success: true,
      message: 'Token is valid.',
    })
  } catch (err) {
    console.log(err)
    res.json({
      success: false,
      message: err.error_message,
      err,
    })
  }
})

app.post('/logout', async (req, res) => {
  const { session_token } = req.body
  try {
    await client.sessions.revoke({ session_token })
    res.json({
      success: true,
      message: 'Session revoked, successfully logged out.',
    })
  } catch (err) {
    console.log(err)
    res.json({
      success: false,
      message: err.error_message,
      err,
    })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
  console.log(`http://localhost:${port}/`)
})
