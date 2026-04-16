"use client"

import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import FleetSection from "../components/FleetSection"
import ServiceSection from "../components/ServiceSection"
import { useState } from "react"

export default function Home() {

  const [cars, setCars] = useState([
    {
      name: "Porsche 911 Carrera",
      type: "SPORTS CAR",
      spec: "450 HP • 0-60 in 3.5s",
      price: "$850 / day",
      image: "/image1.png"
    },
    {
      name: "Mercedes-Benz S-Class",
      type: "EXECUTIVE SEDAN",
      spec: "496 HP • Premium Interior",
      price: "$650 / day",
      image: "/image2.png"
    },
    {
      name: "BMW M8 Competition",
      type: "GRAND TOURER",
      spec: "617 HP • Carbon Package",
      price: "$950 / day",
      image: "/image1.png"
    }
  ])

  return (
    <>
      <Navbar />
      <Hero />
      <FleetSection cars={cars} />
      <ServiceSection />
    </>
  )
}