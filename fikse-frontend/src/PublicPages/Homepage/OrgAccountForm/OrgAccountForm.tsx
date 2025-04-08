import {
	Controller,
	type SubmitErrorHandler,
	type SubmitHandler,
	useForm,
	useFormState,
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { postBusinessAccount } from "../../../api/business-account-api/public-business-account-api";
import { useToast } from "../../../Context/ToastContext/ToastContext";
import { getCountryVat } from "../../../api/country-vat-api/public-coutry-vat-api";
import { getLanguages } from "../../../api/languages-api/public-languages-api";
import { useEffect } from "react";

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
		language: "Language",
	};

	const orgAccountForm = useForm<orgAccountFormType>({
		resolver: zodResolver(orgAccountFormSchema),
		defaultValues: initialData,
		mode: "all",
		reValidateMode: "onChange",
	});

	const onSubmit: SubmitHandler<orgAccountFormType> = (data) => {
		create.mutate(data);
	};

	const onError: SubmitErrorHandler<orgAccountFormType> = (errors) =>
		console.log(errors);

	const { showToast } = useToast();

	const create = useMutation({
		mutationFn: postBusinessAccount,
		onSuccess() {
			showToast(
				"Account Created",
				"Your account was successfully created!",
				"success",
			);
		},
		onError(error) {
			const msg = error.message;
			showToast("Error", msg, "error");
		},
	});

	const { dirtyFields, errors } = useFormState({
		control: orgAccountForm.control,
	});

	const validationIndicator = (fieldName: keyof orgAccountFormType) => {
		const hasError = errors[fieldName];
		const isDirty = dirtyFields[fieldName];

		if (hasError) {
			return (
				<Icon
					icon="material-symbols:error-outline"
					width="1em"
					color="#d32f2f"
					className={styles.input_icon}
				/>
			);
		}
		if (isDirty) {
			return (
				<Icon
					icon="material-symbols:check-circle-outline"
					width="1em"
					color="#2e7d32"
					className={styles.input_icon}
				/>
			);
		}
	};

	const { data: countrVat } = useQuery({
		queryKey: ["coutry-vat"],
		queryFn: getCountryVat,
	});

	const { data: languages } = useQuery({
		queryKey: ["languages"],
		queryFn: getLanguages,
	});

	useEffect(() => {
		if (languages?.data && languages.data?.length > 0) {
		  // Set the field as dirty and touched to trigger validation indicators
		  orgAccountForm.setValue('language', languages.data[0].language, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true
		  });
		}
	  }, [languages, orgAccountForm]);
	
	  useEffect(() => {
		if (countrVat?.data && countrVat.data?.length > 0) {
		  // Format the country value the same way as in the select options
		  const formattedCountry = `${countrVat.data[0].country} - VAT${countrVat.data[0].vat}%`;
		  
		  orgAccountForm.setValue('country', formattedCountry, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true
		  });
		}
	  }, [countrVat, orgAccountForm]);
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
							<div className={styles.input_wrapper}>
								{orgAccountForm.getValues("country") && (
									<label htmlFor="country" className={styles.input_label}>
										{"Country"}
									</label>
								)}

								<Controller
									name="country"
									control={orgAccountForm.control}
									rules={{ required: true }}
									defaultValue="Norway"
									render={({ field }) => (
										<Select
											options={formatSelectOptions(
												countrVat?.data?.map(
													(item) => `${item.country} - VAT${item.vat}%`,
												) || [],
											)}
											{...field}
										/>
									)}
								/>
								{validationIndicator("country")}
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div className={styles.input_wrapper}>
								{orgAccountForm.getValues("org_number") && (
									<label htmlFor="org_number" className={styles.input_label}>
										{"Org. Number"}
									</label>
								)}

								<Controller
									name="org_number"
									control={orgAccountForm.control}
									rules={{ required: true }}
									render={({ field }) => (
										<Input placeholder={"Org. Number"} type="text" {...field} />
									)}
								/>
								{validationIndicator("org_number")}
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div className={styles.input_wrapper}>
								{orgAccountForm.getValues("business_name") && (
									<label htmlFor="business_name" className={styles.input_label}>
										{"Business name"}
									</label>
								)}

								<Controller
									name="business_name"
									control={orgAccountForm.control}
									rules={{ required: true }}
									render={({ field }) => (
										<Input
											placeholder={"Busniness name"}
											type="text"
											{...field}
										/>
									)}
								/>
								{validationIndicator("business_name")}
							</div>
						</td>
					</tr>

					<tr>
						<td>
							<div className={styles.input_wrapper}>
								{orgAccountForm.getValues("person_fullname") && (
									<label
										htmlFor="person_fullname"
										className={styles.input_label}
									>
										{"Full name"}
									</label>
								)}

								<Controller
									name="person_fullname"
									control={orgAccountForm.control}
									rules={{ required: true }}
									render={({ field }) => (
										<Input
											placeholder={"Your full name"}
											type="text"
											{...field}
										/>
									)}
								/>
								{validationIndicator("person_fullname")}
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div className={styles.input_wrapper}>
								{orgAccountForm.getValues("phonenumber") && (
									<label htmlFor="phonenumber" className={styles.input_label}>
										{"Phonenumber"}
									</label>
								)}

								<Controller
									name="phonenumber"
									control={orgAccountForm.control}
									rules={{ required: true }}
									render={({ field }) => (
										<Input
											placeholder={"+47 Phone number"}
											type="text"
											{...field}
										/>
									)}
								/>
								{validationIndicator("phonenumber")}
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div className={styles.input_wrapper}>
								{orgAccountForm.getValues("email") && (
									<label htmlFor="email" className={styles.input_label}>
										{"Email"}
									</label>
								)}
								<Controller
									name="email"
									control={orgAccountForm.control}
									rules={{ required: true }}
									render={({ field }) => (
										<Input placeholder={"Email"} type="text" {...field} />
									)}
								/>
								{validationIndicator("email")}
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div className={styles.input_wrapper}>
								{orgAccountForm.getValues("language") && (
									<label htmlFor="language" className={styles.input_label}>
										{"Language"}
									</label>
								)}

								<Controller
									name="language"
									control={orgAccountForm.control}
									rules={{ required: true }}
									render={({ field }) => (
										<Select
											options={formatSelectOptions(
												languages?.data?.map((item) => item.language) || [],
											)}
											{...field}
										/>
									)}
								/>
								{validationIndicator("language")}
							</div>
						</td>
					</tr>

					<tr>
						<td>
							<button type="submit" className={styles.submit_btn}>
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
