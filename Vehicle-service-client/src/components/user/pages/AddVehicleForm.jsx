import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addVehicle } from '../../../store/vehicleSlice';

const carBrands = [
  { value: '', label: 'Select Brand' },
  { value: 'volvo', label: 'Volvo' },
  { value: 'honda', label: 'Honda' },
  { value: 'mercedes', label: 'Mercedes' },
  { value: 'audi', label: 'Audi' },
  { value: 'bmw', label: 'BMW' },
  { value: 'tata', label: 'Tata' },
  { value: 'mahindra', label: 'Mahindra' },
  { value: 'toyota', label: 'Toyota' },
  { value: 'hyundai', label: 'Hyundai' },
  { value: 'kia', label: 'Kia' },
  { value: 'ford', label: 'Ford' },
  { value: 'chevrolet', label: 'Chevrolet' },
  { value: 'nissan', label: 'Nissan' },
  { value: 'jeep', label: 'Jeep' },
  { value: 'subaru', label: 'Subaru' },
  { value: 'mazda', label: 'Mazda' },
  { value: 'ferrari', label: 'Ferrari' },
  { value: 'lamborghini', label: 'Lamborghini' },
  { value: 'porsche', label: 'Porsche' },
  { value: 'jaguar', label: 'Jaguar' },
  { value: 'landrover', label: 'Land Rover' },
  { value: 'rollsroyce', label: 'Rolls Royce' },
  { value: 'bentley', label: 'Bentley' },
  { value: 'astonmartin', label: 'Aston Martin' },
  { value: 'bugatti', label: 'Bugatti' },
  { value: 'tesla', label: 'Tesla' },
  { value: 'citroen', label: 'Citroen' },
  { value: 'peugeot', label: 'Peugeot' },
  { value: 'renault', label: 'Renault' },
  { value: 'skoda', label: 'Skoda' },
  { value: 'seat', label: 'Seat' },
  { value: 'mini', label: 'Mini' },
  { value: 'suzuki', label: 'Suzuki' },
  { value: 'mitsubishi', label: 'Mitsubishi' },
  { value: 'isuzu', label: 'Isuzu' },
  { value: 'infiniti', label: 'Infiniti' },
  { value: 'acura', label: 'Acura' },
  { value: 'alfa', label: 'Alfa Romeo' },
];

const bikeBrands = [
  { value: '', label: 'Select Brand' },
  { value: 'hero', label: 'Hero' },
  { value: 'honda', label: 'Honda' },
  { value: 'bajaj', label: 'Bajaj' },
  { value: 'yamaha', label: 'Yamaha' },
  { value: 'suzuki', label: 'Suzuki' },
  { value: 'ktm', label: 'KTM' },
  { value: 'royalenfield', label: 'Royal Enfield' },
  { value: 'tvsmotors', label: 'TVS Motors' },
  { value: 'ducati', label: 'Ducati' },
  { value: 'harleydavidson', label: 'Harley Davidson' },
  { value: 'aprilia', label: 'Aprilia' },
  { value: 'benelli', label: 'Benelli' },
  { value: 'bmw', label: 'BMW' },
  { value: 'kawasaki', label: 'Kawasaki' },
  { value: 'triumph', label: 'Triumph' },
  { value: 'mahindra', label: 'Mahindra' },
  { value: 'mvagusta', label: 'MV Agusta' },
  { value: 'indian', label: 'Indian' },
  { value: 'husqvarna', label: 'Husqvarna' },
];

const carModels = {
  audi: [{ value: '', label: 'Select Model' }, { value: 'a3', label: 'A3' }, { value: 'a4', label: 'A4' }, { value: 'q5', label: 'Q5' }, { value: 'r8', label: 'R8' }],
  mercedes: [{ value: '', label: 'Select Model' }, { value: 'c-class', label: 'C-Class' }, { value: 'e-class', label: 'E-Class' }, { value: 's-class', label: 'S-Class' }],
  tesla: [{ value: '', label: 'Select Model' }, { value: 'model-s', label: 'Model S' }, { value: 'model-3', label: 'Model 3' }, { value: 'model-x', label: 'Model X' }, { value: 'model-y', label: 'Model Y' }],
};

const bikeModels = {
  honda: [{ value: '', label: 'Select Model' }, { value: 'cbr', label: 'CBR' }, { value: 'activa', label: 'Activa' }, { value: 'cb-hornet', label: 'CB Hornet' }],
  ktm: [{ value: '', label: 'Select Model' }, { value: 'duke', label: 'Duke' }, { value: 'rc', label: 'RC' }, { value: 'adventure', label: 'Adventure' }],
  royalenfield: [{ value: '', label: 'Select Model' }, { value: 'classic-350', label: 'Classic 350' }, { value: 'meteor-350', label: 'Meteor 350' }, { value: 'himalayan', label: 'Himalayan' }],
};


const transmissionOptions = [{ value: '', label: 'Select Transmission' }, { value: 'automatic', label: 'Automatic' }, { value: 'manual', label: 'Manual' }];
const fuelOptions = [{ value: '', label: 'Select Fuel' }, { value: 'petrol', label: 'Petrol' }, { value: 'diesel', label: 'Diesel' }, { value: 'electric', label: 'Electric' }];
const doorOptions = [{ value: '', label: 'Select Doors' }, { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6', label: '6' }, { value: '7', label: '7' }];

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
    setForm({ ...form, brand: '', model: '', year: '', regNumber: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'brand') {
      setForm({ ...form, brand: value, model: '' });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the form data to the Redux store
    dispatch(addVehicle({ vehicleType, ...form }));
    
    toast.success('Vehicle Added Successfully');

    // Reset the form after submission
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

  const modelsForSelectedBrand = vehicleType === 'car' ? carModels[form.brand] : bikeModels[form.brand];

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
          {/* Brand Dropdown */}
          <div className="mb-4">
            <label htmlFor="brand" className="block mb-1 font-semibold">Brand</label>
            <select id="brand" name="brand" value={form.brand} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg">
              {vehicleType === 'car' ? (
                carBrands.map((brand) => (
                  <option key={brand.value} value={brand.value}>{brand.label}</option>
                ))
              ) : (
                bikeBrands.map((brand) => (
                  <option key={brand.value} value={brand.value}>{brand.label}</option>
                ))
              )}
            </select>
          </div>

          {/* Model Dropdown */}
          {form.brand && (
            <div className="mb-4">
              <label htmlFor="model" className="block mb-1 font-semibold">Model</label>
              <select id="model" name="model" value={form.model} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg">
                <option value="">Select Model</option>
                {modelsForSelectedBrand?.map((model) => (
                  <option key={model.value} value={model.value}>{model.label}</option>
                ))}
              </select>
            </div>
          )}
          
          {/* Reg Number */}
          <div className="mb-4">
            <label htmlFor="regNumber" className="block mb-1 font-semibold">Reg Number</label>
            <input
              id="regNumber"
              type="text"
              name="regNumber"
              value={form.regNumber}
              onChange={handleChange}
              required
              placeholder="e.g., KA-01-AB-1234"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

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
                <label htmlFor="transmission" className="block mb-1 font-semibold">Transmission</label>
                <select id="transmission" name="transmission" value={form.transmission} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg">
                  {transmissionOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="fuel" className="block mb-1 font-semibold">Fuel</label>
                <select id="fuel" name="fuel" value={form.fuel} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg">
                  {fuelOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="doors" className="block mb-1 font-semibold">Doors</label>
                <select id="doors" name="doors" value={form.doors} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg">
                  {doorOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
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
                <label htmlFor="engine" className="block mb-1 font-semibold">Engine</label>
                <input
                  type="text"
                  id="engine"
                  name="engine"
                  value={form.engine}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 100cc"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="fuel" className="block mb-1 font-semibold">Fuel</label>
                <select id="fuel" name="fuel" value={form.fuel} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg">
                  {fuelOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
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
