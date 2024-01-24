import { Alert, Button, Modal, ModalHeader, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineExclamationCircle, HiUpload } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  deleteStart,
  deleteSuccess,
  deleteFailure,
  updateFailure,
  updateStart,
  updateSuccess,
  signoutSuccess,
} from '../redux/user/userSlice';

function DashProfile() {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState('');
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const disptach = useDispatch();

  const filePickerRef = useRef();
  const { currentUser, error } = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadingProgress(null);
        setImageFileUploadError('Could not upload image. (File must be less that 2MB)');
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      },
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No Changes Made.');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please Wait  for image to upload.');
      return;
    }

    try {
      disptach(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        disptach(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        disptach(updateSuccess(data));
        setUpdateUserSuccess("User's Profile Updated Successfully.");
        setImageFileUploadingProgress(false);
      }
    } catch (error) {
      disptach(updateFailure(error));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      disptach(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        disptach(deleteFailure(data.message));
      } else {
        disptach(deleteFailure(data));
      }
    } catch (error) {
      disptach(deleteFailure(error));
    }
  };

  const handleSignout = async() => {
    try {
      const res = await fetch('/api/user/signout', {
        method: "POST",
      })
      const data = await res.json();
      if(!res.ok) {
        console.log(data.message)
      } else {
        disptach(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  }

  

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className=" relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress || 0}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  fontSize: 'semi-bold',
                  fontWeight: '900',
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUploadingProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="User_Image"
            className={`h-full w-full border-8 object-cover border-[lightgray] rounded-full ${
              imageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput type="text" id="password" placeholder="password" onChange={handleChange} />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 cursor-pointer flex justify-between mt-5">
        <span onClick={() => setShowModal(true)}>Delete Account</span>
        <span onClick={handleSignout}>SignOut</span>
      </div>

      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}

      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-500 dark:text-gray-300 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are You sure you want to delete the account?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDeleteUser}>
                  Yes, I'm sure.
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  No, Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default DashProfile;
