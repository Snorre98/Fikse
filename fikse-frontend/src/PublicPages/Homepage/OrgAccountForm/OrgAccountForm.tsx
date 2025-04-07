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
		mode: "all",
		reValidateMode: "onChange",
	});

	const onSubmit: SubmitHandler<orgAccountFormType> = (data) => {
		create.mutate(data);
	};

	const onError: SubmitErrorHandler<orgAccountFormType> = (errors) =>
		console.log(errors);

	const create = useMutation({mutationFn: postBusinessAccount});

	const { dirtyFields, errors } = useFormState({
			control: orgAccountForm.control
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
				/>
			);
		}
		if (isDirty) {
			return (
				<Icon
					icon="material-symbols:check-circle-outline"
					width="1em"
					color="#2e7d32"
				/>
			);
		}
	};

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
								control={orgAccountForm.control}
								rules={{ required: true }}
								defaultValue="Norway"
								render={({ field }) => (
									<Input placeholder={"Norway"} type="text" {...field} />
								)}
							/>
							{validationIndicator("country")}
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
									/>
								)}
							/>
							{validationIndicator("org_number")}
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
									/>
								)}
							/>
							{validationIndicator("business_name")}
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
									/>
								)}
							/>
							{validationIndicator("person_fullname")}
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
									/>
								)}
							/>
							{validationIndicator("phonenumber")}
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
									/>
								)}
							/>
							{validationIndicator("email")}
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
							{validationIndicator("language")}
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
