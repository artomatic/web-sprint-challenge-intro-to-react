import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Character from './Character'

const urlPlanets = 'http://localhost:9009/api/planets'
const urlPeople = 'http://localhost:9009/api/people'

function App() {

  const [characters, setCharacters] = useState ()


  useEffect ( () => {

    const fetchData = () => {
      
      axios.get (urlPeople)
      .then (charRes => {
        console.log('charRes', typeof charRes, charRes, 'charRes.data', typeof charRes.data)

        axios.get (urlPlanets)
        .then (planetRes => {
          console.log('planetRes', typeof planetRes, planetRes)

          charRes.data.map (char => {
            let planet = {}
            planetRes.data.forEach ( pl => {
              if (pl.id === char.homeworld ) {
                planet = pl
              }
            })
            char.homeworld = planet
          })
          setCharacters(charRes.data)
        })
        .catch ( (err) => console.log(err.message))

      })
      .catch ((err) => console.log(err.message))
    }

    fetchData()

  }, [])


  
  // ❗ Create state to hold the data from the API
  // ❗ Create effects to fetch the data and put it in state
  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      {/* ❗ Map over the data in state, rendering a Character at each iteration */}

      {
        characters !== undefined
        ?(
            characters.map ( char => (
            <Character 
              key = {char.id}
              name = {char.name} 
              id = {char.id} 
              dob = {char.birth_year} 
              planet = {char.homeworld}
            />
          ))
        )
        : console.log ('characters still not fetched')
      }
      
    </div>
  )
}

export default App

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App
