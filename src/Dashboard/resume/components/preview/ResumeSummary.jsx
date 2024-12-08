import React from 'react'

function ResumeSummary({resumeInfo}) {
  return (
    <div>
      <p className='text-xs'>

        {resumeInfo?.summery}
      </p>
    </div>
  )
}

export default ResumeSummary
