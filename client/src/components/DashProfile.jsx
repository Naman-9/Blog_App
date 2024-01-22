import { Button, TextInput } from 'flowbite-react';
import React from 'react';
import { useSelector } from 'react-redux';

function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="User_Image"
            className="h-full w-full border-8 object-cover border-[lightgray] rounded-full"
          />
        </div>
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
        <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email} />
        <TextInput type='text' id='password' placeholder='password' />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
      </form>
      <div className="text-red-500 cursor-pointer flex justify-between mt-5">
        <span>Delete Account</span>
        <span>SignOut</span>
      </div>
    </div>
  );
}

export default DashProfile;
