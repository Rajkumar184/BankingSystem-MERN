import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const TransactionPage = () => {
	const [userData, setUserData] = useState("");
	const history = useHistory();

	const [msg, setMsg] = useState({
		amount: "",
	});

	const userTransactionPage = async () => {
		try {
			const res = await axios.get("/getdata");

			const data = await res.data.userProfile;
			console.log(data);
			setUserData(data);

			if (!data) {
				return toast.error("there is no data availble plzz login", {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 3000,
				});
			}
		} catch (err) {
			history.push("/signin");
			return toast.warning("Login to access profile page!", {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 3000,
			});
		}
	};

	useEffect(() => {
		userTransactionPage();
	}, []);

	// storing data in states
	const handleInputs = (e) => {
		const { name, value } = e.target;

		setMsg({
			...msg,
			[name]: value,
		});
	};

	// send data to backend
	const submitConatctForm = async (e) => {
		e.preventDefault();

		const { amount } = msg;

		if (!amount) {
			return toast.warning("All fields are mandatory!", {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 3000,
			});
		}
		try {
			const res = await axios.post("/transaction", msg);

			const data = await res.data;

			if (!data) {
				return toast.warning("Transaction not done Successfully", {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 3000,
				});
			} else {
				history.push("/");

				return toast.success("Transaction Succesfully!", {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 3000,
				});
			}
		} catch (error) {
			return toast.error(error.response.data.message, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 3000,
			});
		}
	};
	return (
		<div>
			<section class="ftco-section py-2">
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-md-6 text-center mb-5">
							<h2 class="heading-section">Transaction Form #01</h2>
						</div>
					</div>
					<div class="row justify-content-center shadow-lg p-4 my-5 bg-white ">
						<div class="col-lg-10 col-md-12">
							<div class="wrapper">
								<div class="row no-gutters">
									<div class="col-md-7 d-flex align-items-stretch">
										<div class="contact-wrap w-100 p-md-5 p-4">
											<h3 class="mb-4">Get in touch</h3>
											<div id="form-message-warning" class="mb-4"></div>
											<div id="form-message-success" class="mb-4">
												Your transaction was sent, thank you!
											</div>
											<form
												onSubmit={submitConatctForm}
												id="contactForm"
												name="contactForm"
												className="contactForm"
												novalidate="novalidate"
											>
												<div class="row">
													<div class="col-md-6">
														<div class="form-group">
															<input
																type="text"
																class="form-control"
																name="name"
																id="name"
																placeholder="Name"
																onChange={handleInputs}
																value={userData?.name}
															/>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<input
																type="email"
																class="form-control"
																name="email"
																id="email"
																placeholder="Email"
																onChange={handleInputs}
																value={userData?.email}
															/>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<input
																type="tel"
																minLength="10"
																maxLength="10"
																className="form-control"
																name="phone"
																placeholder="Phone"
																onChange={handleInputs}
																value={userData?.phone}
															/>
														</div>
													</div>
													<div class="col-md-8">
														<div class="form-group">
															<textarea
																name="amount"
																type="number"
																className="form-control"
																id="amount"
																placeholder="Amount"
																onChange={handleInputs}
															></textarea>
														</div>
													</div>
													<div class="col-md-12">
														<div class="form-group">
															<input
																type="submit"
																value="Confirm"
																class="btn btn-primary"
															/>
															<div class="submitting"></div>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
									<div class="col-md-5 d-flex align-items-stretch">
										<img
											src="/images/Online-payment.png"
											alt="online-payment"
											className="img-fluid"
										></img>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default TransactionPage;
