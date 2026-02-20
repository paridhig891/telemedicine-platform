import { useNavigate } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
function Registration(){

const navigate=useNavigate()

const patientregistration=()=>{
navigate('/patient-registration')
}
const doctorregistration=()=>{
navigate('/doctor-registration')
}


    return(<>
     <div className="min-h-screen flex flex-col justify-center items-center bg-blue-600 text-gray-800">
      <h1 className="text-white text-4xl font-bold mb-10">Welcome to Jeevani</h1>
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Doctor Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 w-72 text-center hover:scale-105 transition-transform duration-300">
          <div className="flex justify-center mb-4">
            {/* <Stethoscope size={48} className="text-blue-600" /> */}
          </div>
          <h2 className="text-2xl font-semibold mb-2">Doctor</h2>
          <p className="text-gray-600 mb-6">
            Access your dashboard, view appointments, and manage patient data.
          </p>
          <button  onClick={doctorregistration} className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
            Login as Doctor
          </button>
        </div>

        {/* Patient Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 w-72 text-center hover:scale-105 transition-transform duration-300">
          <div className="flex justify-center mb-4">
            {/* <User size={48} className="text-blue-600" /> */}
          </div>
          <h2 className="text-2xl font-semibold mb-2">Patient</h2>
          <p className="text-gray-600 mb-6">
            Book appointments, view prescriptions, and chat with your doctor.
          </p>
          <button onClick={patientregistration} className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
            Login as Patient
          </button>
        </div>
      </div>
    </div>
    </>);
}
export default Registration