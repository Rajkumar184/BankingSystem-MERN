import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
	const [userName, setUserName] = useState();
	const [show, setShow] = useState(false);

	const userHomePage = async () => {
		try {
			const res = await axios.get("/getdata", {
				method: "GET",
			});

			const data = await res.data;
			console.log(data);
			setUserName(data.userProfile.name);
			setShow(true);

			if (!data) {
				const error = new Error(res.error);
				throw error;
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		userHomePage();
	}, []);
	return (
		<>
			<section className="vh-100 pt-4" style={{ backgroundColor: "#dfe4ea" }}>
				<div className="container-fluid h-custom ">
					<div className="row d-flex justify-content-center align-items-center h-100  my-2 mx-5">
						<div className="col-md-9 col-lg-6 col-xl-5 ">
							<img
								src="/images/home.png"
								className="img-fluid"
								alt="Sample_image"
							/>
						</div>
						<div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 ">
							<form>
								<form>
									<h1 className="text-danger ">Welcome</h1>
									<h1 className="mt-5">{userName}</h1>
									<h3 className="mt-4">
										{show ? "Happy,to see you back!" : "We Are Bankers"}
									</h3>
								</form>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default HomePage;
