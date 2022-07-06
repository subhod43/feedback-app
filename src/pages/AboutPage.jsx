import React from 'react'
import { Link } from 'react-router-dom';
import Card from '../components/sharedComponents/Card'

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>About the project</h1>
        <p>This is a react project to leave feedback for a product</p>
        <p>App version: 1.0.0</p>
        <p><Link to="/">Back to Home</Link></p>
      </div>
    </Card>
  )
}

export default AboutPage