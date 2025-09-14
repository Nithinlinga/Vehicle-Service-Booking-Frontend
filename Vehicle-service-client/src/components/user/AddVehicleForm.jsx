import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addVehicle } from '../../store/VehicleSlice';
import toast from 'react-hot-toast';

const carBrands = [ { value: '', label: 'Select Brand' }, { value: 'volvo', label: 'Volvo' }, { value: 'honda', label: 'Honda' }, { value: 'mercedes', label: 'Mercedes' }, { value: 'audi', label: 'Audi' }, { value: 'bmw', label: 'BMW' }, { value: 'tata', label: 'Tata' }, { value: 'mahindra', label: 'Mahindra' }, { value: 'toyota', label: 'Toyota' }, { value: 'hyundai', label: 'Hyundai' }, { value: 'kia', label: 'Kia' }, { value: 'ford', label: 'Ford' }, { value: 'chevrolet', label: 'Chevrolet' }, { value: 'nissan', label: 'Nissan' }, { value: 'jeep', label: 'Jeep' }, { value: 'subaru', label: 'Subaru' }, { value: 'mazda', label: 'Mazda' }, { value: 'ferrari', label: 'Ferrari' }, { value: 'lamborghini', label: 'Lamborghini' }, { value: 'porsche', label: 'Porsche' }, { value: 'jaguar', label: 'Jaguar' }, { value: 'landrover', label: 'Land Rover' }, { value: 'rollsroyce', label: 'Rolls Royce' }, { value: 'bentley', label: 'Bentley' }, { value: 'astonmartin', label: 'Aston Martin' }, { value: 'bugatti', label: 'Bugatti' }, { value: 'tesla', label: 'Tesla' }, { value: 'citroen', label: 'Citroen' }, { value: 'peugeot', label: 'Peugeot' }, { value: 'renault', label: 'Renault' }, { value: 'skoda', label: 'Skoda' }, { value: 'seat', label: 'Seat' }, { value: 'mini', label: 'Mini' }, { value: 'suzuki', label: 'Suzuki' }, { value: 'mitsubishi', label: 'Mitsubishi' }, { value: 'isuzu', label: 'Isuzu' }, { value: 'infiniti', label: 'Infiniti' }, { value: 'acura', label: 'Acura' }, { value: 'alfa', label: 'Alfa Romeo' }, ];
 
const bikeBrands = [ { value: '', label: 'Select Brand' }, { value: 'hero', label: 'Hero' }, { value: 'honda', label: 'Honda' }, { value: 'bajaj', label: 'Bajaj' }, { value: 'yamaha', label: 'Yamaha' }, { value: 'suzuki', label: 'Suzuki' }, { value: 'ktm', label: 'KTM' }, { value: 'royalenfield', label: 'Royal Enfield' }, { value: 'tvsmotors', label: 'TVS Motors' }, { value: 'ducati', label: 'Ducati' }, { value: 'harleydavidson', label: 'Harley Davidson' }, { value: 'aprilia', label: 'Aprilia' }, { value: 'benelli', label: 'Benelli' }, { value: 'bmw', label: 'BMW' }, { value: 'kawasaki', label: 'Kawasaki' }, { value: 'triumph', label: 'Triumph' }, { value: 'mahindra', label: 'Mahindra' }, { value: 'mvagusta', label: 'MV Agusta' }, { value: 'indian', label: 'Indian' }, { value: 'husqvarna', label: 'Husqvarna' }, ];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

const AddVehicleForm = () => {
  const dispatch = useDispatch();
  const [vehicleType, setVehicleType] = useState('');
  const [form, setForm] = useState({
    brand: '',
    model: '',
    year: '',
    regNumber: '',
    engine: '',
    abs: '',
    doors: '',
    ac: '',
    transmission: '',
    fuel: '',
  });

  const handleTypeChange = (e) => {
    setVehicleType(e.target.value);
    setForm({ ...form, brand: '', model: '', make: '', year: '', regNumber: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addVehicle({ vehicleType, ...form }));
    toast.success('Vehicle Added Successfully');
    setVehicleType('');
    setForm({
      brand: '',
      model: '',
      year: '',
      regNumber: '',
      engine: '',
      abs: '',
      doors: '',
      ac: '',
      transmission: '',
      fuel: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-cyan-700 dark:text-cyan-400 text-center">Add Vehicle</h1>

      {/* Vehicle Type */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Vehicle Type</label>
        <select name="vehicleType" value={vehicleType} onChange={handleTypeChange} required className="w-full px-3 py-2 border rounded-lg">
          <option value="">Select Type</option>
          <option value="car">Car</option>
          <option value="bike">Bike</option>
        </select>
      </div>

      {vehicleType && (
        <>
          {/* Common Fields */}
          {['brand', 'model', 'make', 'regNumber', 'transmission', 'fuel', 'image'].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block mb-1 font-semibold capitalize">{field}</label>
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          ))}

          {/* Year */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Year</label>
            <select name="year" value={form.year} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg">
              <option value="">Select Year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Conditional Fields */}
          {vehicleType === 'car' ? (
            <>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Doors</label>
                <input type="text" name="doors" value={form.doors} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">AC</label>
                <select name="ac" value={form.ac} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Engine</label>
                <input type="text" name="engine" value={form.engine} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">ABS</label>
                <select name="abs" value={form.abs} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </>
          )}

          <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg">
            Add Vehicle
          </button>
        </>
      )}
    </form>
  );
};

export default AddVehicleForm;
