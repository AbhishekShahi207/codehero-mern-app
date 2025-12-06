import { SignedIn,  SignedOut,  SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import React from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router'

function HomePage() {
  return (
    <div>
      home page
 <button onClick={()=>toast.success("clicked")}>click me</button>
    </div>
  )
}

export default HomePage

