import React, { useState } from 'react';
import { Discs } from './lib/definitions-test'; // Import the Discs type
interface ModalProps {
  onClose: () => void;
  onAdd: (newListing: Discs) => void;
}
const Modal: React.FC<ModalProps> = ({ onClose, onAdd }) => {
  const [newListing, setNewListing] = useState<Partial<Discs>>({
    discType: '' as 'putter' | 'driver' | 'mid-range', // Explicitly type discType
    name: '',
    speed: 1, // Default speed set to 1
    color: '',
    weight: 0,
    price: 0,
    image: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'discType' && (value === 'putter' || value === 'driver' || value === 'mid-range')) {
      setNewListing({ ...newListing, [name]: value as 'putter' | 'driver' | 'mid-range' });
    } else if (name === 'price') {
      setNewListing({ ...newListing, [name]: parseFloat(value) });
    } else if (name === 'color') {
      // Check if the input value contains only alphabet characters
      if (/^[a-zA-Z]+$/.test(value) || value === '') {
        setNewListing({ ...newListing, [name]: value });
      }
    } else if (name === 'image') {
      const file = e.target.files && e.target.files[0];
      if (file && file.size <= 5 * 1024 * 1024) {
        setNewListing({ ...newListing, [name]: file });
      } else {
        alert('Please select an image file less than or equal to 5 MB.');
      }
    } else {
      setNewListing({ ...newListing, [name]: value });
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if discType has no value
    if (!newListing.discType) {
      alert('Please select a disc type.');
      return; // Stop further execution
    }
    const completeListing: Discs = newListing as Discs;
    onAdd(completeListing);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 bg-gray-600 z-50">

      <div className="bg-white rounded-lg p-6 flex w-4/4 md:w-2/4 mx-auto justify-center">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-bold mb-4 mx-auto w-full justify-center flex">Add New Listing</h2>
          <div className="mb-4">
            <label htmlFor="discType" className="block mb-1">Disc Type</label>
            <select required
              id="discType"
              name="discType"
              value={newListing.discType}
              onChange={handleChange}
              className="border w-full px-3 py-2 rounded-md"
            >
              <option value="">Select Disc Type</option>
              <option value="putter">Putter</option>
              <option value="driver">Driver</option>
              <option value="mid-range">Mid-range</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">Name</label>
            <input required type="text" id="name" name="name" value={newListing.name} onChange=
              {handleChange} className="form-control flex rounded-lg w-full justify-center flex" />
          </div>
          <div className="mb-4">
            <label htmlFor="speed" className="block mb-1">Speed (1-14)</label>
            <input required type="number" id="speed" name="speed" value={newListing.speed} onChange=
              {handleChange} min={1} max={14} className="form-control flex rounded-lg w-full justify-center flex" />
          </div>
          <div className="mb-4">
            <label htmlFor="color" className="block mb-1">Color</label>
            <input required type="text" id="color" name="color" value={newListing.color} onChange=
              {handleChange} className="form-control flex rounded-lg w-full justify-center flex" />
          </div>
          <div className="mb-4">
            <label htmlFor="weight" className="block mb-1">Weight</label>
            <input required type="number" id="weight" name="weight" value={newListing.weight} onChange=
              {handleChange} className="form-control flex rounded-lg w-full justify-center flex" />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-1">Price</label>
            <input required type="number" id="price" name="price" value={newListing.price} onChange=
              {handleChange} className="form-control flex rounded-lg w-full justify-center flex" />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block mb-1">Image</label>
            <input required type="file" id="image" name="image" onChange={handleChange}
              accept="image/*" className="form-control flex w-full justify-center flex" />
          </div>
          <div className="flex justify-end">

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full justify-center flex">Add
              Listing</button>
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4
py-2 rounded-md ml-2">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Modal;