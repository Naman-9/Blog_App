import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl flex-col md:flex-row md:items-center mx-auto gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Epic
            </span>
            Journals
          </Link>
          <p className="text-sm mt-5">SignUp with your email and password or with Google.</p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form
            className="flex flex-col gap-4">
            <div>
              <Label value="Your Username" />
              <TextInput type="text" placeholder="Your Username" id="username" />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput type="text" placeholder="name@company.com" id="email" />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="text" placeholder="Your password" id="password" />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>SignUp</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account? </span>
            <Link to='/sign-in' className='text-blue-500'>
                SignIn
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
