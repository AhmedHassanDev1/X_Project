import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import PasswordInput from '../../inputs/PasswordInput'

function Step3() {
  const { control  } = useFormContext()

  return (
    <div className='form-step space-y-4'>
      <div className="mt-3">
        <h1 className='my-3 text-3xl font-bold dark:text-gray-200 text-black'>Enter password</h1>
        <h5 className='text-zinc-500 text-sm'>to get started, first enter your x password to confirm it`s really you.</h5>
      </div>
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <PasswordInput {...field} name="password" />
            {fieldState.error && (
              <p className="form-error" >{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
      <Controller
        name="confirm"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <PasswordInput {...field} name="confirm" />
            {fieldState.error && (
              <p className="form-error" >{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
      <button className='form-button w-full' type='submit'>Create account</button>
    </div>
  )
}

export default Step3