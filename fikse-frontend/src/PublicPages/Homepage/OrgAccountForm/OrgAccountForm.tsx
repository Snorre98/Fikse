import {
	Controller,
	type SubmitErrorHandler,
	type SubmitHandler,
	useForm,
	useWatch,
} from "react-hook-form";
import { z } from "zod";
import {
	COUNTRY,
	EMAIL,
	FULL_NAME,
	LANGUAGE,
	ORG_NAME,
	ORG_NR,
	PHONE_NR,
} from "../../../Forms/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../Components";
import styles from "./OrgAccountForm.module.scss";
import { SUPPORTED_LANGUAGES } from "../../../Forms/supported-languages";
import { formatSelectOptions, Select } from "../../../Components/Select/Select";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postBusinessAccount } from "../../../api/business-account-api/business-account";

const orgAccountFormSchema = z.object({
	country: COUNTRY,
	org_number: ORG_NR,
	business_name: ORG_NAME,
	person_fullname: FULL_NAME,
	phonenumber: PHONE_NR,
	email: EMAIL,
	language: LANGUAGE,
});

type orgAccountFormType = z.infer<typeof orgAccountFormSchema>;

export function OrgAccountForm() {
	const initialData: Partial<orgAccountFormType> = {
		country: "Norway",
		org_number: "",
		business_name: "",
		person_fullname: "",
		phonenumber: "",
		email: "",
		language: "Norwegian",
	};

	const orgAccountForm = useForm<orgAccountFormType>({
		resolver: zodResolver(orgAccountFormSchema),
		defaultValues: initialData,
		mode: "onChange",
	});


	const [formData, setFormData] = useState<orgAccountFormType>();

	const onSubmit: SubmitHandler<orgAccountFormType> = (data) => {
		setFormData(data);
		create.mutate(data);
		console.log("ran")
	}

	const onError: SubmitErrorHandler<orgAccountFormType> = (errors) =>
		console.log(errors);

	const ValidationIndicator = ({ fieldName, control }) => {
		const [isValid, setIsValid] = useState(true);
		const [isTouched, setIsTouched] = useState(false);
		
		// Watch the field value
		const value = useWatch({
		  control,
		  name: fieldName
		});
		
		// Run validation and update state when value changes OR field is touched
		useEffect(() => {
		  // Always trigger validation, even for empty values
		  orgAccountForm.trigger(fieldName).then(isFieldValid => {
			const fieldState = orgAccountForm.getFieldState(fieldName);
		
			
			setIsValid(isFieldValid);
			setIsTouched(fieldState.isTouched);
		  });
		}, [value]);
		
		// Also monitor touch events separately
		// biome-ignore lint/correctness/useExhaustiveDependencies:
		useEffect(() => {
		  const fieldState = orgAccountForm.getFieldState(fieldName);
		  if (fieldState.isTouched) {
			setIsTouched(true);
			
			// Re-trigger validation when field is touched
			orgAccountForm.trigger(fieldName).then(isFieldValid => {
			  setIsValid(isFieldValid);
			});
		  }
		}, [orgAccountForm.formState.touchedFields, fieldName]);
		
		if (!isTouched) return null;
		
		if (!isValid) {
		  return (
			<Icon
			  icon="material-symbols:error-outline"
			  width="1em"
			  color="#d32f2f"
			/>
		  );
		}
		
		// Only show the checkmark if we have a value AND it's valid
		if (value) {
		  return (
			<Icon
			  icon="material-symbols:check-circle-outline"
			  width="1em"
			  color="#2e7d32"
			/>
		  );
		}
		
		return null;
	  };

	  const create = useMutation({
		mutationFn: postBusinessAccount,
		// onSuccess: () => {
		// 	console.log("SUCCESS");
		// },
		// onError: () => {
		// 	console.log("ERROR")
		// }
	  })

	return (
		<form
			onSubmit={orgAccountForm.handleSubmit(onSubmit, onError)}
			className={styles.form}
			autoComplete="off"
		>
			<table className={styles.form_table}>
				<tbody className={styles.form_table_body}>
					<tr>
						<td>
							<Controller
								name="country"
								//disabled={true}
								control={orgAccountForm.control}
								rules={{ required: true }}
								defaultValue="Norway"
								render={({ field }) => (
									<Input placeholder={"Norway"} type="text" {...field} validationIndicator={<div className={styles.country_vat}>VAT25%</div>}
									/>
								)}
							/>
						</td>
					</tr>
					<tr>
						<td>
							<Controller
								name="org_number"
								control={orgAccountForm.control}
								rules={{ required: true }}
								render={({ field }) => (
									<Input
										placeholder={"Org.nr"}
										label={field.value ? "Organization name" : null} 
										type="text"
										{...field}
										validationIndicator={
											<ValidationIndicator
												fieldName="org_number"
												control={orgAccountForm.control}
											/>
										}
									/>
								)}
							/>
						</td>
					</tr>
					<tr>
						<td>
							<Controller
								name="business_name"
								control={orgAccountForm.control}
								rules={{ required: true }}
								render={({ field }) => (
									<Input
										placeholder={"Busniness name"}
										label={field.value ? "Busniness name" : null} 
										type="text"
										{...field}
										validationIndicator={
											<ValidationIndicator
												fieldName="business_name"
												control={orgAccountForm.control}
											/>
										}
									/>
								)}
							/>
						</td>
					</tr>

					<tr>
						<td>
							<Controller
								name="person_fullname"
								control={orgAccountForm.control}
								rules={{ required: true }}
								render={({ field }) => (
									<Input
										placeholder={"Your full name"}
										label={field.value ? "Full name" : null}
										type="text"
							 
										{...field}
										validationIndicator={
											<ValidationIndicator
												fieldName="person_fullname"
												control={orgAccountForm.control}
											/>
										}
									/>
								)}
							/>
						</td>
					</tr>
					<tr>
						<td>
							<Controller
								name="phonenumber"
								control={orgAccountForm.control}
								rules={{ required: true }}
								render={({ field }) => (
									<Input
										placeholder={"+47 Phone number"}
										label={field.value ? "Phonenumber" : null} 
										type="text"
										{...field}
										validationIndicator={
											<ValidationIndicator
												fieldName="phonenumber"
												control={orgAccountForm.control}
											/>
										}
									/>
								)}
							/>
						</td>
					</tr>
					<tr>
						<td>
							<Controller
								name="email"
								control={orgAccountForm.control}
								rules={{ required: true }}
								render={({ field }) => (
									<Input
										placeholder={"Email"}
										label={field.value ? "Email" : null} 
										type="text"
										{...field}
										validationIndicator={
											<ValidationIndicator
												fieldName="email"
												control={orgAccountForm.control}
											/>
										}
									/>
								)}
							/>
						</td>
					</tr>
					<tr>
						<td>
							<Controller
								name="language"
								control={orgAccountForm.control}
								rules={{ required: true }}
								render={({ field }) => (
									<Select
										options={formatSelectOptions(SUPPORTED_LANGUAGES)}
										{...field}
									/>
								)}
							/>
						</td>
					</tr>

					<tr>
						<td>
							<button type="submit" className={styles.submit_btn} onClick={()=>{
								alert(formData)
							}}>
								<span>Fill out the account details to continue</span>
								<Icon
									icon="material-symbols:chevron-right"
									width="1em"
									height="1em"
								/>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	);
}
