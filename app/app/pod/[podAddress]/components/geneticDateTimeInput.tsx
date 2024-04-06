"use client";
import { useEffect } from "react";

interface IGenericDateInput {
	date: number;
	setDate: React.Dispatch<React.SetStateAction<number>>;
	placeholder: string;
	setValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const GenericDateTimeInput = ({ date, setDate, setValid, placeholder }: IGenericDateInput) => {
	useEffect(() => {
		// validate start and end date
	}, [date, setDate]);

	const onChangeInput = (e: any) => {
		setDate(e.target.value);
	};
	return (
		<>
			<div className="flex-1 items-center justify-between flex w-full gap-1 border text-gray border-neutral-border p-4">
				<input
					type={`datetime-local`}
					className={`w-full flex-1 outline-none text-left text-white focus:placeholder:opacity-0 bg-neutral-black text-sm uppercase ${!date ? "text-[#C45151]" : "text-success"}`}
					value={date}
					onChange={onChangeInput}
					placeholder={placeholder}
				/>
			</div>
		</>
	);
};

export default GenericDateTimeInput;
