
const attachCookies = ({ res, token }) => {

	// one day in milliseconds
	const oneDay = 1000 * 60 * 60 *24

	res.cookie('token', token, {
		httpOnly: true,  // can only be accessed by the browser
		expires: new Date(Date.now() + oneDay), // cookie will be expired in 1 day
		sameSite: "none",  // if server and client on different ports
		secure: process.env.NODE_ENV === 'production',  // must be https if in production
		signed: true
	})
}

export default attachCookies