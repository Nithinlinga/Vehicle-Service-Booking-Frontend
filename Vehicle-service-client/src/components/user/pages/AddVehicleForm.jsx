import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import UserServices from '../../services/UserServices';
import { getAuthHeader } from '../../../utils/getAuthHeader';

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
  volvo: [{ value: '', label: 'Select Model' }, { value: 's60', label: 'S60' }, { value: 'xc40', label: 'XC40' }, { value: 'xc90', label: 'XC90' }],
  honda: [{ value: '', label: 'Select Model' }, { value: 'city', label: 'City' }, { value: 'amaze', label: 'Amaze' }, { value: 'crv', label: 'CR-V' }],
  bmw: [{ value: '', label: 'Select Model' }, { value: '3-series', label: '3 Series' }, { value: '5-series', label: '5 Series' }, { value: 'x1', label: 'X1' }, { value: 'x5', label: 'X5' }],
  toyota: [{ value: '', label: 'Select Model' }, { value: 'camry', label: 'Camry' }, { value: 'corolla', label: 'Corolla' }, { value: 'fortuner', label: 'Fortuner' }, { value: 'innova', label: 'Innova' }],
  hyundai: [{ value: '', label: 'Select Model' }, { value: 'creta', label: 'Creta' }, { value: 'venue', label: 'Venue' }, { value: 'i20', label: 'i20' }],
  ford: [{ value: '', label: 'Select Model' }, { value: 'figo', label: 'Figo' }, { value: 'ecosport', label: 'EcoSport' }, { value: 'endeavour', label: 'Endeavour' }],
  kia: [{ value: '', label: 'Select Model' }, { value: 'seltos', label: 'Seltos' }, { value: 'sonet', label: 'Sonet' }, { value: 'carnival', label: 'Carnival' }],
  nissan: [{ value: '', label: 'Select Model' }, { value: 'magnite', label: 'Magnite' }, { value: 'kicks', label: 'Kicks' }],
  jeep: [{ value: '', label: 'Select Model' }, { value: 'compass', label: 'Compass' }, { value: 'wrangler', label: 'Wrangler' }],
  porsche: [{ value: '', label: 'Select Model' }, { value: '911', label: '911' }, { value: 'cayenne', label: 'Cayenne' }, { value: 'taycan', label: 'Taycan' }],
};

const bikeModels = {
  honda: [{ value: '', label: 'Select Model' }, { value: 'cbr', label: 'CBR' }, { value: 'activa', label: 'Activa' }, { value: 'cb-hornet', label: 'CB Hornet' }, { value: 'dio', label: 'Dio' }],
  ktm: [{ value: '', label: 'Select Model' }, { value: 'duke', label: 'Duke' }, { value: 'rc', label: 'RC' }, { value: 'adventure', label: 'Adventure' }],
  royalenfield: [{ value: '', label: 'Select Model' }, { value: 'classic-350', label: 'Classic 350' }, { value: 'meteor-350', label: 'Meteor 350' }, { value: 'himalayan', label: 'Himalayan' }, { value: 'interceptor-650', label: 'Interceptor 650' }],
  hero: [{ value: '', label: 'Select Model' }, { value: 'splendor', label: 'Splendor' }, { value: 'passion', label: 'Passion' }, { value: 'xfactor', label: 'Xtreme 160R' }],
  bajaj: [{ value: '', label: 'Select Model' }, { value: 'pulsar', label: 'Pulsar' }, { value: 'dominar', label: 'Dominar' }, { value: 'platina', label: 'Platina' }],
  yamaha: [{ value: '', label: 'Select Model' }, { value: 'fz', label: 'FZ Series' }, { value: 'r15', label: 'R15' }, { value: 'mt15', label: 'MT-15' }],
  suzuki: [{ value: '', label: 'Select Model' }, { value: 'access', label: 'Access 125' }, { value: 'gixxer', label: 'Gixxer' }, { value: 'hayabusa', label: 'Hayabusa' }],
  tvsmotors: [{ value: '', label: 'Select Model' }, { value: 'apache', label: 'Apache RTR' }, { value: 'jupiter', label: 'Jupiter' }, { value: 'n-torq', label: 'Ntorq' }],
  ducati: [{ value: '', label: 'Select Model' }, { value: 'panigale', label: 'Panigale' }, { value: 'scrambler', label: 'Scrambler' }, { value: 'monster', label: 'Monster' }],
  kawasaki: [{ value: '', label: 'Select Model' }, { value: 'ninja', label: 'Ninja Series' }, { value: 'versys', label: 'Versys' }, { value: 'z-series', label: 'Z Series' }],
  harleydavidson: [{ value: '', label: 'Select Model' }, { value: 'fatboy', label: 'Fat Boy' }, { value: 'iron-883', label: 'Iron 883' }, { value: 'street-bob', label: 'Street Bob' }],
  bmw: [{ value: '', label: 'Select Model' }, { value: 'gs-series', label: 'GS Series' }, { value: 's1000rr', label: 'S 1000 RR' }, { value: 'g310r', label: 'G 310 R' }],
  triumph: [{ value: '', label: 'Select Model' }, { value: 'bonneville', label: 'Bonneville' }, { value: 'street-triple', label: 'Street Triple' }, { value: 'tiger', label: 'Tiger' }],
  aprilia: [{ value: '', label: 'Select Model' }, { value: 'rsv4', label: 'RSV4' }, { value: 'rs-660', label: 'RS 660' }],
  benelli: [{ value: '', label: 'Select Model' }, { value: 'tnt', label: 'TNT Series' }, { value: 'imperiale', label: 'Imperiale' }],
  husqvarna: [{ value: '', label: 'Select Model' }, { value: 'svartpilen', label: 'Svartpilen' }, { value: 'vitpilen', label: 'Vitpilen' }, { value: 'norden', label: 'Norden' }],
  indian: [{ value: '', label: 'Select Model' }, { value: 'chief', label: 'Chief' }, { value: 'scout', label: 'Scout' }],
  mvagusta: [{ value: '', label: 'Select Model' }, { value: 'brutale', label: 'Brutale' }, { value: 'f3', label: 'F3' }],
  mahindra: [{ value: '', label: 'Select Model' }, { value: 'mojo', label: 'Mojo' }],
};


const transmissionOptions = [{ value: '', label: 'Select Transmission' }, { value: 'automatic', label: 'Automatic' }, { value: 'manual', label: 'Manual' }];
const fuelOptions = [{ value: '', label: 'Select Fuel' }, { value: 'petrol', label: 'Petrol' }, { value: 'diesel', label: 'Diesel' }, { value: 'electric', label: 'Electric' }];
const doorOptions = [{ value: '', label: 'Select Doors' }, { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6', label: '6' }, { value: '7', label: '7' }];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

const AddVehicleForm = () => {
  const { user } = useSelector((state) => state.auth);
  const [vehicleType, setVehicleType] = useState('');
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    registrationNumber: '',
    engine: '',
    abs: '',
    doors: '',
    ac: '',
    transmission: '',
    fuel: '',
    vehicleType: ''
  });

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setVehicleType(type);
    setForm((prev) => ({
      ...prev,
      vehicleType: type,
      make: '',
      model: '',
      year: '',
      registrationNumber: ''
    }));
  };

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      vehicleType
    }));
  }, [vehicleType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'make') {
      setForm({ ...form, make: value, model: '' });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      year: Number(form.year),
      vehicleType: form.vehicleType.toUpperCase() // Ensure payload is always uppercase
    };

    const headers = {
      ...getAuthHeader(),
      'X-User-Id': user.id,
      'X-Role': user.role,
      'Content-Type': 'application/json'
    };

    UserServices.addVehicle(payload, headers)
      .then(() => {
        toast.success('Vehicle Added Successfully');
        setVehicleType('');
        setForm({
          make: '',
          model: '',
          year: '',
          registrationNumber: '',
          engine: '',
          abs: '',
          doors: '',
          ac: '',
          transmission: '',
          fuel: '',
          vehicleType: ''
        });
      })
      .catch((error) => {
        console.error('Vehicle submission error:', error);
        toast.error(error?.response?.data?.message || 'Submission failed');
      });
  };

  // Updated to check for 'car' instead of 'CAR'
  const modelsForSelectedBrand = vehicleType === 'CAR' ? carModels[form.make] : bikeModels[form.make];

  return (
    <form onSubmit={handleSubmit} className="mt-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-cyan-700 dark:text-cyan-400 text-center">Add Vehicle</h1>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Vehicle Type</label>
        <select name="vehicleType" value={vehicleType} onChange={handleTypeChange} required className="w-full px-3 dark:bg-gray-900 py-2 border rounded-lg">
          <option value="">Select Type</option>
          <option value="CAR">Car</option>
          <option value="BIKE">Bike</option>
        </select>
      </div>

      {vehicleType && (
        <>
          <div className="mb-4">
            <label htmlFor="make" className="block mb-1 font-semibold">Brand</label>
            <select id="make" name="make" value={form.make} onChange={handleChange} required className="w-full dark:bg-gray-900   px-3 py-2 border rounded-lg">
              {/* Updated to check for 'car' instead of 'CAR' */}
              {vehicleType === 'CAR' ? (
                carBrands.map((make) => (
                  <option key={make.value} value={make.value}>{make.label}</option>
                ))
              ) : (
                bikeBrands.map((make) => (
                  <option key={make.value} value={make.value}>{make.label}</option>
                ))
              )}
            </select>
          </div>

          {form.make && (
            <div className="mb-4">
              <label htmlFor="model" className="block mb-1 font-semibold">Model</label>
              <select id="model" name="model" value={form.model} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900">
                {modelsForSelectedBrand?.map((model) => (
                  <option key={model.value} value={model.value}>{model.label}</option>
                ))}
              </select>
            </div>
          )}
          
          <div className="mb-4">
              <label htmlFor="registrationNumber" className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">Reg Number</label>
              <input
                id="registrationNumber"
                type="text"
                name="registrationNumber"
                value={form.registrationNumber} 
                onChange={handleChange}
                required
                placeholder="e.g., KA-01-AB-1234"
                className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-900 border-gray-300 dark:border-gray-600"
              />
            </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Year</label>
            <select name="year" value={form.year} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900">
              <option value="">Select Year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Updated to check for 'car' instead of 'CAR' */}
          {vehicleType === 'CAR' ? (
            <>
              <div className="mb-4">
                <label htmlFor="transmission" className="block mb-1 font-semibold">Transmission</label>
                <select id="transmission" name="transmission" value={form.transmission} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900">
                  {transmissionOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="fuel" className="block mb-1 font-semibold">Fuel</label>
                <select id="fuel" name="fuel" value={form.fuel} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900">
                  {fuelOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="doors" className="block mb-1 font-semibold">Doors</label>
                <select id="doors" name="doors" value={form.doors} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900">
                  {doorOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">AC</label>
                <select name="ac" value={form.ac} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900">
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
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="fuel" className="block mb-1 font-semibold">Fuel</label>
                <select id="fuel" name="fuel" value={form.fuel} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900">
                  {fuelOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-semibold">ABS</label>
                <select name="abs" value={form.abs} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900">
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
