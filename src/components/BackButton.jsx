import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Back } from './icons/Icons'

const BackButton = () => {
    const navigate = useNavigate()
  return (
    <button
        type="button"
        onClick={() => navigate(-1)}
        className="fixed left-3 top-20 z-[210] md:left-6 w-11 h-11 rounded-full bg-black/60 backdrop-blur border border-white/10 flex items-center justify-center text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all cursor-pointer"
        aria-label="Go back"
      >
        <Back />
      </button>
  )
}

export default BackButton
