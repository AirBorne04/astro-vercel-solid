import type {
	RedirectJsonResult,
	RejectedJsonResult,
	ResolvedJsonResult
} from "../types.js";

export const submitForm = async <
	Body extends {} = {},
	ErrorData extends {} = {}
>(
	element: HTMLFormElement,
	handleRedirect: (location: string) => void = (location) =>
		(window.location.href = location)
) => {
	type JsonResult =
		| ResolvedJsonResult<Body>
		| RejectedJsonResult<ErrorData>
		| RedirectJsonResult;
	const formData = new FormData(element);
	const response = await fetch(element.action, {
		method: element.method,
		body: formData,
		headers: {
			accept: "application/json"
		}
	});
	const result = (await response.json()) as JsonResult;
	if (result.type === "redirect") {
		handleRedirect(result.redirect_location);
	}
	return result;
};
