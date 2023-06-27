import {useState} from "react";


const initialState = {
	name: '',
	email: '',
	password: '',
}

const Register = () => {

	const [values, setValues] = useState(initialState)
	const [showAlert, setShowAlert] = useState(false)
	const [adminLoggedIn, setAdminLoggedIn] = useState(false)

	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { name, email, password } = values
		if (name !== 'admin' || email !== 'admin@mail.com' || password !== 'password') {
			console.log('error');
			return
		}
		setShowAlert(true)
		setAdminLoggedIn(true)
	}

	return (
		<div>
			<form className='form' onSubmit={handleSubmit}>
				{showAlert && <Alert/>}
				<FormRow name='name' labelText='name' type='text' value={values.name} handleChange={handleChange}/>
				<FormRow name='email' labelText='email' type='email' value={values.email} handleChange={handleChange}/>
				<FormRow name='password' labelText='password' password='email' value={values.password} handleChange={handleChange}/>
				<button type='submit' className='btn' disabled={isLoading}>register</button>
				<p>Already a member?  <a href='/login'>Login</a></p>
			</form>
		</div>
	);
};

export default Register;